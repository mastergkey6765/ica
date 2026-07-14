import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader2, ArrowLeft, Clock, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';
import DOMPurify from 'dompurify';
import { motion } from 'motion/react';

export default function ArticleViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id) return;
        const articleDoc = await getDoc(doc(db, 'articles', id));
        if (articleDoc.exists()) {
          setArticle({ id: articleDoc.id, ...articleDoc.data() });
        }
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article?.title || '')}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article?.title || '')}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const calculateReadTime = (content: string) => {
    if (!content) return 1;
    const text = content.replace(/<[^>]*>?/gm, '');
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const createMarkup = (html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="animate-spin text-brand-deep-teal" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-brand-deep-teal hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-warm-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/50 to-brand-navy"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-brand-light-gray hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-4 text-brand-gold text-sm font-semibold tracking-wider uppercase mb-6"
          >
            <span>Article</span>
            <span className="w-1 h-1 rounded-full bg-brand-gold"></span>
            <span className="flex items-center gap-1.5 text-brand-light-gray">
              <Clock size={16} />
              {calculateReadTime(article.content)} min read
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-8"
          >
            {article.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150" 
                  alt="Dr. Ethelle Lord" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Dr. Ethelle Lord</div>
                <div className="text-brand-light-gray text-sm">
                  {article.createdAt ? new Date(article.createdAt.toDate()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently published'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-brand-light-gray mr-2">Share:</span>
              <button onClick={shareToTwitter} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
                <Twitter size={18} />
              </button>
              <button onClick={shareToLinkedIn} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
                <Linkedin size={18} />
              </button>
              <button onClick={shareToFacebook} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
                <Facebook size={18} />
              </button>
              <button onClick={copyLink} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white relative group">
                <LinkIcon size={18} />
                {linkCopied && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-deep-teal text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 md:p-16 border border-brand-sage-200/60"
        >
          <div 
            className="prose prose-lg md:prose-xl max-w-none prose-headings:font-heading prose-headings:text-brand-navy prose-p:text-gray-700 prose-a:text-brand-deep-teal hover:prose-a:text-brand-blue prose-img:rounded-2xl prose-img:shadow-md prose-blockquote:border-l-brand-gold prose-blockquote:bg-brand-warm-white prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic"
            dangerouslySetInnerHTML={createMarkup(article.content)}
          />
        </motion.div>

        {/* Bottom Call to Action */}
        <div className="mt-16 bg-brand-deep-teal rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold font-heading mb-4">Need personalized guidance?</h3>
            <p className="text-brand-light-gray text-lg mb-8 max-w-2xl mx-auto">
              Get direct support for your caregiving challenges through our specialized consulting programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/ica-consultants" className="bg-brand-gold hover:bg-white text-brand-navy font-bold py-4 px-8 rounded-full transition-colors inline-flex items-center justify-center gap-2">
                Explore Consulting
              </a>
              <a href="https://icacares.com/ica-consulting" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-8 rounded-full transition-colors inline-flex items-center justify-center gap-2">
                Book a free 30 Min call
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
