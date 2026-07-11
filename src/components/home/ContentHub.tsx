import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PlayCircle, FileText, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const defaultResources = [
  {
    type: "Guide",
    icon: <FileText className="w-5 h-5" />,
    title: "10 Communication Strategies for Defusing Frustration",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=600&auto=format&fit=crop",
    link: "/resources"
  },
  {
    type: "Video",
    icon: <PlayCircle className="w-5 h-5" />,
    title: "How the TDI Model Relieves Caregiver Exhaustion",
    readTime: "12 min watch",
    image: "https://images.unsplash.com/photo-1551836022-b06985bceb24?q=80&w=600&auto=format&fit=crop",
    link: "/resources"
  },
  {
    type: "Article",
    icon: <FileText className="w-5 h-5" />,
    title: "Recognizing the Difference Between Behavioral and Emotional Needs",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=600&auto=format&fit=crop",
    link: "/resources"
  }
];

export default function ContentHub() {
  const navigate = useNavigate();
  const [hubItems, setHubItems] = useState(defaultResources);

  useEffect(() => {
    const q = query(
      collection(db, 'articles'),
      where('status', '==', 'published')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        let fetchedArticles = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        
        fetchedArticles.sort((a: any, b: any) => {
          const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return tB - tA;
        });
        
        const topArticles = fetchedArticles.slice(0, 3).map((data, idx) => {
          const words = data.content ? data.content.split(/\s+/).length : 0;
          const readTimeMins = Math.max(1, Math.ceil(words / 200));
          
          let imageToUse = defaultResources[2].image;
          if (idx === 0) imageToUse = defaultResources[2].image;
          else if (idx === 1) imageToUse = defaultResources[0].image;
          else if (idx === 2) imageToUse = defaultResources[1].image;

          return {
            type: "Article",
            icon: <FileText className="w-5 h-5" />,
            title: data.title,
            readTime: `${readTimeMins} min read`,
            image: imageToUse,
            link: `/article/${data.id}`
          };
        });

        const newItems = [...topArticles];
        let defaultIdx = 0;
        while (newItems.length < 3 && defaultIdx < defaultResources.length) {
          newItems.push(defaultResources[defaultIdx]);
          defaultIdx++;
        }
        
        setHubItems(newItems.slice(0, 3));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-4">
              Dementia Education Hub
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our latest articles, guides, and practical resources for caregivers and professionals.
            </p>
          </div>
          <Link 
            to="/resources"
            className="flex items-center gap-2 text-brand-deep-teal font-semibold hover:text-brand-soft-teal transition-colors flex-shrink-0 group"
          >
            <span className="whitespace-nowrap">View all resources</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hubItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="group cursor-pointer flex flex-col"
              onClick={() => navigate(item.link)}
            >
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {idx === 0 && (
                    <span className="inline-flex max-w-max items-center gap-2 bg-brand-gold text-brand-navy text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      Latest Publish
                    </span>
                  )}
                  <span className="inline-flex max-w-max items-center gap-2 bg-white/95 backdrop-blur-sm text-brand-navy text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {item.icon}
                    {item.type}
                  </span>
                </div>
              </div>
              <div className="text-sm font-medium text-brand-soft-teal mb-3">{item.readTime}</div>
              <h3 className="text-xl font-bold font-heading text-brand-navy leading-snug group-hover:text-brand-deep-teal transition-colors line-clamp-3">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
