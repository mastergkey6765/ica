import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import DOMPurify from 'dompurify';

export default function CustomPageViewer() {
  const { slug } = useParams();
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, 'pages'), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setPageData({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching page:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 size={40} className="animate-spin text-brand-deep-teal" />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-brand-navy mb-4">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for does not exist or has been removed.
        </p>
        <Link 
          to="/"
          className="flex items-center gap-2 bg-brand-deep-teal text-white px-6 py-3 rounded-full font-bold hover:bg-brand-deep-teal/90 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    );
  }

  // Basic styling for the rich text outputs similar to article
  const createMarkup = (html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return (
    <div className="bg-brand-warm-white min-h-screen">
      {/* Dynamic Header */}
      <section className="bg-brand-navy text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-heading mb-6"
          >
            {pageData.title}
          </motion.h1>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-brand-sage-200">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-brand-navy prose-p:text-gray-600 prose-a:text-brand-deep-teal hover:prose-a:text-brand-blue prose-img:rounded-xl"
            dangerouslySetInnerHTML={createMarkup(pageData.content)}
          />
        </div>
      </section>
    </div>
  );
}
