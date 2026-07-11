import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface SearchResult {
  id: string;
  type: 'course' | 'article' | 'resource';
  title: string;
  description: string;
  url: string;
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // Query courses from Firestore
        const coursesRef = collection(db, 'courses');
        const articlesRef = collection(db, 'articles');
        const [coursesSnapshot, articlesSnapshot] = await Promise.all([
          getDocs(coursesRef),
          getDocs(articlesRef)
        ]);
        
        let allResults: SearchResult[] = [];
        const lowerQuery = searchQuery.toLowerCase();

        // 1. Add matching courses
        coursesSnapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.title?.toLowerCase().includes(lowerQuery) || 
            data.description?.toLowerCase().includes(lowerQuery) ||
            data.category?.toLowerCase().includes(lowerQuery)
          ) {
            allResults.push({
              id: doc.id,
              type: 'course',
              title: data.title || 'Untitled Course',
              description: data.description || '',
              url: `/course/${doc.id}`
            });
          }
        });

        // 2. Add matching articles
        articlesSnapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.title?.toLowerCase().includes(lowerQuery) || 
            data.content?.toLowerCase().includes(lowerQuery)
          ) {
            allResults.push({
              id: doc.id,
              type: 'article',
              title: data.title || 'Untitled Article',
              description: data.content ? data.content.substring(0, 100) + '...' : '',
              url: `/article/${doc.id}`
            });
          }
        });

        setResults(allResults);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  if (!isOpen) return null;

  const navigateToResult = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-gray-100 px-4 py-3">
          <Search className="text-gray-400 mr-3" size={24} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-0 focus:ring-0 text-lg sm:text-xl text-gray-900 placeholder:text-gray-400 py-3 outline-none"
            placeholder="Search courses, articles, resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center">
              <div className="w-6 h-6 border-2 border-brand-deep-teal border-t-transparent rounded-full animate-spin mb-4" />
              Searching...
            </div>
          ) : searchQuery.length > 0 && results.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg font-medium text-gray-900 mb-2">No results found</p>
              <p>We couldn't find anything matching "{searchQuery}".</p>
            </div>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-gray-100 pb-2">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => navigateToResult(result.url)}
                    className="w-full text-left px-6 py-4 hover:bg-brand-sage-100/50 transition-colors flex items-start gap-4 group"
                  >
                    <div className="mt-1 flex-shrink-0">
                      {result.type === 'course' ? (
                        <div className="w-10 h-10 rounded-full bg-brand-deep-teal/10 flex items-center justify-center text-brand-deep-teal">
                          <BookOpen size={20} />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                          <FileText size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {result.type}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 truncate group-hover:text-brand-deep-teal transition-colors">
                          {result.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center text-gray-300 group-hover:text-brand-deep-teal transition-colors">
                      <ArrowRight size={20} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500 bg-gray-50">
              <p>Try searching for "TDI", "Caregiver", or "Course"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
