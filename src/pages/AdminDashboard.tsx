import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Plus, Trash2, Edit2, Loader2, BookOpen, FileText, MessageSquare, Calendar, Layout, Users, Settings } from 'lucide-react';
import ArticleEditor from '../components/admin/ArticleEditor';
import PageEditor from '../components/admin/PageEditor';
import AuthorManager from '../components/admin/AuthorManager';
import SiteConfigEditor from '../components/admin/SiteConfigEditor';
import { useAuth } from '../lib/AuthContext';

import CourseEditor, { CourseData } from '../components/admin/CourseEditor';

interface Course extends CourseData {
  id: string;
  createdAt?: any;
  updatedAt?: any;
}

interface Article {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'scheduled';
  scheduledFor?: number | null;
}

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'articles' | 'queries' | 'pages' | 'authors' | 'settings'>(isAdmin ? 'courses' : 'articles');
  const [courses, setCourses] = useState<Course[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCourseEditorOpen, setIsCourseEditorOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [isPageEditorOpen, setIsPageEditorOpen] = useState(false);

  useEffect(() => {
    // If not admin, force articles tab
    if (!isAdmin) {
      setActiveTab('articles');
    }
  }, [isAdmin]);

  useEffect(() => {
    let coursesLoaded = false;
    let articlesLoaded = false;
    let queriesLoaded = false;
    let pagesLoaded = false;

    const checkLoading = () => {
      // If not admin, only wait for articles
      if (!isAdmin) {
        if (articlesLoaded) setLoading(false);
        return;
      }
      if (coursesLoaded && articlesLoaded && queriesLoaded && pagesLoaded) setLoading(false);
    };

    let unsubCourses: () => void = () => {};
    let unsubQueries: () => void = () => {};
    let unsubPages: () => void = () => {};

    if (isAdmin) {
      unsubCourses = onSnapshot(
        collection(db, 'courses'),
        (snapshot) => {
          setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
          coursesLoaded = true; checkLoading();
        },
        (error) => { handleFirestoreError(error, OperationType.LIST, 'courses'); coursesLoaded = true; checkLoading(); }
      );

      unsubQueries = onSnapshot(
        query(collection(db, 'queries'), orderBy('createdAt', 'desc')),
        (snapshot) => {
          setQueries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          queriesLoaded = true; checkLoading();
        },
        (error) => { 
          console.error("Error loading queries:", error);
          queriesLoaded = true; checkLoading(); 
        }
      );

      unsubPages = onSnapshot(
        collection(db, 'pages'),
        (snapshot) => {
          setPages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          pagesLoaded = true; checkLoading();
        },
        (error) => { handleFirestoreError(error, OperationType.LIST, 'pages'); pagesLoaded = true; checkLoading(); }
      );
    }

    const unsubArticles = onSnapshot(
      collection(db, 'articles'),
      (snapshot) => {
        setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article)));
        articlesLoaded = true; checkLoading();
      },
      (error) => { handleFirestoreError(error, OperationType.LIST, 'articles'); articlesLoaded = true; checkLoading(); }
    );

    return () => { unsubCourses(); unsubArticles(); unsubQueries(); unsubPages(); };
  }, [isAdmin]);

  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const handleDeleteItem = async (id: string, collectionName: string) => {
    setIsDeletingId(id);
  };

  const confirmDelete = async (id: string, collectionName: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    } finally {
      setIsDeletingId(null);
    }
  };

  const openArticleEditor = (article?: Article) => {
    if (article) setEditingArticle(article);
    else setEditingArticle(null);
    setIsEditorOpen(true);
  };

  const openCourseEditor = (course?: Course) => {
    if (course) setEditingCourse(course);
    else setEditingCourse(null);
    setIsCourseEditorOpen(true);
  };

  const openPageEditor = (page?: any) => {
    if (page) setEditingPage(page);
    else setEditingPage(null);
    setIsPageEditorOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy mb-4 pt-10">
          {isAdmin ? 'Admin Dashboard' : 'Author Dashboard'}
        </h1>
        <p className="text-xl text-brand-muted-sage max-w-3xl mx-auto mb-8">
          {isAdmin ? 'Manage your courses, content, and users.' : 'Publish and manage your articles.'}
        </p>

        {isAdmin && (
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'courses' ? 'bg-brand-deep-teal text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <BookOpen size={20} /> Courses
            </button>
            <button 
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'articles' ? 'bg-brand-deep-teal text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <FileText size={20} /> Articles
            </button>
            <button 
              onClick={() => setActiveTab('pages')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'pages' ? 'bg-brand-deep-teal text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <Layout size={20} /> Pages
            </button>
            <button 
              onClick={() => setActiveTab('queries')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'queries' ? 'bg-brand-deep-teal text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <MessageSquare size={20} /> Inquiries
            </button>
            <button 
              onClick={() => setActiveTab('authors')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'authors' ? 'bg-brand-deep-teal text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <Users size={20} /> Authors
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'settings' ? 'bg-brand-deep-teal text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <Settings size={20} /> Site Config
            </button>
          </div>
        )}
      </div>

      {isCourseEditorOpen ? (
        <CourseEditor 
          initialData={editingCourse || undefined}
          onClose={() => setIsCourseEditorOpen(false)}
        />
      ) : isPageEditorOpen ? (
        <PageEditor 
          initialData={editingPage || undefined} 
          onClose={() => setIsPageEditorOpen(false)} 
        />
      ) : isEditorOpen ? (
        <ArticleEditor 
          initialData={editingArticle || undefined} 
          onClose={() => setIsEditorOpen(false)} 
        />
      ) : activeTab === 'authors' ? (
         <div className="max-w-2xl mx-auto">
            <AuthorManager />
         </div>
      ) : activeTab === 'settings' ? (
        <div className="max-w-4xl mx-auto">
          <SiteConfigEditor />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeTab === 'courses' ? (
            <div className="lg:col-span-1 h-fit">
              <button
                onClick={() => openCourseEditor()}
                className="w-full bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm mb-4"
              >
                <Plus size={24} />
                <span className="text-lg">Create New Course</span>
              </button>
              {courses.length === 0 && !loading && (
                <button
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const DEFAULT_COURSES = [
                        { category: "For Families", title: "Fundamentals of TDI™ (CFTDI)", description: "The essential communication framework for family caregivers to immediately reduce daily friction and bring peace to the home.", outcomes: ["Communication tactics", "De-escalation strategies", "Burnout prevention"], duration: "Self-paced", certified: false, image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop" },
                        { category: "For Professionals", title: "Advanced TDI™ Train-the-Trainer", description: "Our premier certification program for healthcare professionals, dementia coaches, and facility staff leaders.", outcomes: ["TDI methodology mastery", "Staff training capability", "Official ATDIT Certification"], duration: "12 Weeks", certified: true, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop" },
                        { category: "Membership", title: "ICA Fellows Membership (Monthly/Yearly)", description: "Core benefits: All ICA Fellows Get Preferred Access and Major Savings!", outcomes: ["FREE: Content & Research Access", "FREE: Quarterly Updates/Consultation", "FREE: ICA Dementia Talent/Jobs Bank"], duration: "Monthly / Yearly", certified: true, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" }
                      ];
                      for (const course of DEFAULT_COURSES) {
                        await addDoc(collection(db, 'courses'), { ...course, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
                      }
                    } catch (error) {
                      console.error("Error seeding courses", error);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <BookOpen size={20} />
                  <span>Load Default Courses</span>
                </button>
              )}
            </div>
          ) : activeTab === 'articles' ? (
            <div className="lg:col-span-1 h-fit">
              <button
                onClick={() => openArticleEditor()}
                className="w-full bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm"
              >
                <Plus size={24} />
                <span className="text-lg">Create New Article</span>
              </button>
            </div>
          ) : activeTab === 'pages' ? (
            <div className="lg:col-span-1 h-fit">
              <button
                onClick={() => openPageEditor()}
                className="w-full bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm mb-4"
              >
                <Plus size={24} />
                <span className="text-lg">Create Custom Page</span>
              </button>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-sage-200">
                <h3 className="font-bold text-brand-navy mb-2">Custom Pages</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Create pages that will be accessible at <code>/p/your-slug</code>.
                </p>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-1 h-fit">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-sage-200">
                <h3 className="font-bold text-brand-navy mb-2">Program Inquiries</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  These messages are submitted by users via the "Have Questions?" forms on the program details pages. Follow up with potential attendees using the provided email addresses.
                </p>
              </div>
            </div>
          )}

          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold font-heading text-brand-navy border-b pb-4 capitalize">
              Existing {activeTab}
            </h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={32} className="animate-spin text-brand-deep-teal" />
              </div>
            ) : activeTab === 'courses' && courses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">No courses available yet.</p>
              </div>
            ) : activeTab === 'articles' && articles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">No articles available yet.</p>
              </div>
            ) : activeTab === 'pages' && pages.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">No custom pages created yet.</p>
              </div>
            ) : activeTab === 'queries' && queries.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">No inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(activeTab === 'courses' ? courses : activeTab === 'articles' ? articles : activeTab === 'pages' ? pages : queries).map((item: any) => (
                  <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-brand-sage-200 flex flex-col sm:flex-row gap-6 justify-between items-start transition-all hover:shadow-md hover:border-brand-deep-teal/30">
                    <div className="flex-1 w-full min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-brand-navy truncate">
                          {activeTab === 'queries' ? (item.name + (item.courseTitle ? ` - ${item.courseTitle}` : '')) : item.title}
                        </h3>
                        {activeTab === 'articles' && (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            item.status === 'published' ? 'bg-green-100 text-green-800' :
                            item.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Draft'}
                          </span>
                        )}
                        {activeTab === 'queries' && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-brand-sage/50 text-brand-deep-teal">
                            {item.email}
                          </span>
                        )}
                        {activeTab === 'pages' && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-gray-100 text-gray-600">
                            /p/{item.slug}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {activeTab === 'courses' ? item.description : (activeTab === 'articles' || activeTab === 'pages') ? item.content?.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...' : item.query}
                      </p>
                      
                      {activeTab === 'articles' && item.scheduledFor && (
                        <p className="text-sm text-brand-muted-sage mt-3 flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                          Scheduled for: {new Date(item.scheduledFor).toLocaleString()}
                        </p>
                      )}
                      
                      {activeTab === 'queries' && item.createdAt && (
                        <p className="text-xs text-brand-muted-sage mt-3 flex items-center gap-1.5">
                          <Calendar size={14} />
                          {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : new Date(item.createdAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0 self-end sm:self-center mt-4 sm:mt-0">
                      {activeTab === 'articles' ? (
                        <button
                          onClick={() => openArticleEditor(item)}
                          className="p-2 text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors border border-transparent hover:border-brand-blue/30"
                          title="Edit Article"
                        >
                          <Edit2 size={20} />
                        </button>
                      ) : activeTab === 'pages' ? (
                        <button
                          onClick={() => openPageEditor(item)}
                          className="p-2 text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors border border-transparent hover:border-brand-blue/30"
                          title="Edit Page"
                        >
                          <Edit2 size={20} />
                        </button>
                      ) : activeTab === 'courses' ? (
                        <button
                          onClick={() => openCourseEditor(item)}
                          className="p-2 text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors border border-transparent hover:border-brand-blue/30"
                          title="Edit Course"
                        >
                          <Edit2 size={20} />
                        </button>
                      ) : null}
                      {isDeletingId === item.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => confirmDelete(item.id, activeTab)}
                            className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setIsDeletingId(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDeleteItem(item.id, activeTab)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                          title={`Delete ${activeTab === 'courses' ? 'Course' : activeTab === 'articles' ? 'Article' : activeTab === 'pages' ? 'Page' : 'Inquiry'}`}
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
