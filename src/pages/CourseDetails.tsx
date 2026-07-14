import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { Loader2, Clock, ShieldCheck, ArrowRight, PlayCircle, Star, MessageSquare, Target, CheckCircle2 } from 'lucide-react';
import { CourseData } from '../components/admin/CourseEditor';

import courseAuthImage from '../assets/images/Fundamentals of TDI™ (CFTDI).png';
import courseAuthImage2 from '../assets/images/Advanced TDI™ Train-the-Trainer.png';
import courseAuthImage3 from '../assets/images/ICA Fellows Membership.png';

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [contactQuery, setContactQuery] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const isATDIT = course?.title.includes('Advanced TDI') || course?.title.includes('Train-the-Trainer');
  const isCFTDI = course?.title.includes('CFTDI') || course?.title.includes('Fundamentals');


  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        if (!id) return;
        setLoading(true);

        const courseDoc = await getDoc(doc(db, 'courses', id));
        if (courseDoc.exists()) {
          const data = courseDoc.data();
          if (data.category === 'Membership' || data.title.includes('ICA Fellows Membership')) {
            navigate('/join-ica');
            return;
          }
          setCourse({ id: courseDoc.id, ...data } as CourseData);
        } else {
          console.error("Course not found");
        }

        if (currentUser) {
          const q = query(
            collection(db, 'enrollments'), 
            where('userId', '==', currentUser.uid), 
            where('courseId', '==', id)
          );
          const snap = await getDocs(q);
          if (!snap.empty) {
            setIsEnrolled(true);
          }
        }
      } catch (err) {
        console.error("Error fetching course data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id, currentUser]);

  const handleEnroll = async (plan: 'full' | 'single' = 'full') => {
    if (!currentUser) {
      navigate('/auth?returnUrl=' + encodeURIComponent(`/checkout/${id}/${plan}`));
      return;
    }
    
    if (isEnrolled) {
      navigate(`/course/${id}/learn`);
      return;
    }

    navigate(`/checkout/${id}/${plan}`);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactQuery.trim()) return;

    setContactStatus('submitting');
    try {
      await addDoc(collection(db, 'queries'), {
        courseId: id,
        courseTitle: course?.title,
        name: contactName,
        email: contactEmail,
        query: contactQuery,
        createdAt: serverTimestamp()
      });
      setContactStatus('success');
      setContactQuery('');
    } catch (err) {
      console.error("Error submitting query", err);
      setContactStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-brand-deep-teal" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Program Not Found</h2>
        <Link to="/" className="text-brand-deep-teal hover:underline font-medium">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-warm-white bg-opacity-30 min-h-screen pb-24">
      {/* Hero Section */}
      <div className="bg-brand-navy text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-deep-teal/20 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-brand-gold text-brand-navy text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
                {course.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight text-[#eff2f4]">
                {isATDIT 
                  ? 'Advanced Transactional Dementia Intelligence™ Train-the-Trainer (ATDIT) Program' 
                  : isCFTDI
                  ? 'Certificate in the Fundamentals of Transactional Dementia Intelligence™ (CFTDI)'
                  : course.title}
              </h1>
              <p className="text-brand-sage-100 text-lg mb-8 leading-relaxed max-w-xl">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-gold" />
                  <span>{course.duration || 'Self Paced'}</span>
                </div>
                {course.certified && (
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-brand-gold" />
                    <span>Official Certification</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-brand-gold" />
                  <span>4.9 / 5 Average Rating</span>
                </div>
              </div>

              <button
                onClick={() => handleEnroll('full')}
                disabled={isEnrolling}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
              >
                {isEnrolling ? <Loader2 size={24} className="animate-spin" /> : <PlayCircle size={24} />}
                {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
              </button>
            </div>
            
            <div className="hidden lg:block relative text-center">
              <div className="absolute inset-0 bg-brand-deep-teal/40 rounded-3xl blur-2xl transform scale-105"></div>
              <img 
                src={
                  course.title.includes('Advanced TDI') 
                    ? courseAuthImage2 
                    : course.title.includes('Fundamentals of TDI') 
                      ? courseAuthImage 
                      : course.title.includes('ICA Fellows Membership') 
                        ? courseAuthImage3 
                        : course.image || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop'
                } 
                alt={course.title}
                className="relative rounded-3xl shadow-2xl border-4 border-white/10 w-full max-w-md mx-auto aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            {/* Outcomes Section */}
            <section className="bg-brand-warm-white/80 p-8 md:p-12 rounded-3xl shadow-md border-t-8 border-t-brand-deep-teal border-x border-b border-brand-sage-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <ShieldCheck className="w-48 h-48 text-brand-deep-teal" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy mb-10 relative z-10 flex items-center gap-4">
                <div className="bg-brand-deep-teal text-white p-3 rounded-2xl shadow-lg shadow-brand-deep-teal/20">
                   <ShieldCheck className="w-8 h-8" />
                </div>
                {isATDIT || isCFTDI
                  ? 'Students will learn how to:' 
                  : "What You'll Learn"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {(isATDIT
                  ? [
                      'Reduce staff turnover and burnout',
                      'Improve dementia communication systems',
                      'Build stronger caregiver relationships',
                      'Train and mentor healthcare teams',
                      'Create transformational care cultures'
                    ]
                  : isCFTDI 
                  ? [
                      'Communicate more effectively',
                      'Reduce reactive behaviors',
                      "Apply Lord's Theory in real-world care settings",
                      'Build trust and emotional connection',
                      'Deliver more respectful, human-centered care'
                    ]
                  : course.outcomes)?.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-100 transition-shadow">
                    <div className="bg-brand-gold/20 p-2.5 rounded-xl shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                    </div>
                    <p className="text-brand-navy font-semibold text-lg leading-relaxed mt-0.5">{outcome}</p>
                  </div>
                ))}
              </div>
            </section>

            {(isATDIT || isCFTDI) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <section className="bg-gradient-to-br from-brand-deep-teal to-[#164e52] p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Star className="w-48 h-48 text-brand-gold" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-6 uppercase tracking-wide flex items-center gap-3 relative z-10">
                    <div className="bg-brand-gold/20 p-2 rounded-xl">
                      <Star className="w-6 h-6 text-brand-gold" />
                    </div>
                    Highlights
                  </h3>
                  <ul className="space-y-4 relative z-10">
                    {(isATDIT 
                      ? ['3 Intensive Modules', 'Online Flexible Access', 'ICA Fellowship Included', 'Leadership Focus', 'Ongoing Dev Support']
                      : ['100% Online Learning', '4-Week Program', 'Self-Paced Access', 'Immediate Application', 'Certificate & Digital Badge']
                    ).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-white/90 font-medium text-lg">
                        <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
                
                <section className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-2 border-brand-gold relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
                    <Target className="w-48 h-48 text-brand-navy" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-brand-navy mb-6 uppercase tracking-wide flex items-center gap-3 relative z-10">
                    <div className="bg-brand-gold/20 p-2 rounded-xl">
                      <Target className="w-6 h-6 text-brand-gold" />
                    </div>
                    Ideal For
                  </h3>
                  <ul className="space-y-4 relative z-10">
                    {(isATDIT 
                      ? ['Administrators', 'Directors of Nursing', 'Dementia Trainers', 'Consultants', 'Organizational Coaches']
                      : ['Caregivers & Nurses', 'CNAs', 'Memory Care Staff', 'Family Caregivers', 'Healthcare Professionals']
                    ).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-brand-navy font-semibold text-lg">
                        <div className="bg-brand-gold rounded-full p-1 shrink-0 mt-0.5">
                           <CheckCircle2 className="w-4 h-4 text-brand-navy" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )}

            {/* Enrollment CTA Section */}
            <section className="bg-brand-navy p-8 md:p-12 rounded-3xl shadow-sm border border-brand-navy-light text-center flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4 relative z-10">Start Your Journey Today</h2>
              <p className="text-brand-light-gray text-lg max-w-2xl mx-auto mb-8 relative z-10">
                Join our comprehensive program and transform your approach to dementia care. Gain the skills, confidence, and certification you need to make a real difference.
              </p>
              
              <button 
                 onClick={() => handleEnroll('full')}
                 disabled={isEnrolling || isEnrolled}
                 className={`relative z-10 inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl hover:-translate-y-1 ${
                   isEnrolled 
                     ? 'bg-brand-sage text-brand-navy' 
                     : 'bg-brand-gold hover:bg-white text-brand-navy'
                 }`}
               >
                 {isEnrolling ? <Loader2 size={24} className="animate-spin" /> : <PlayCircle size={24} />}
                 {isEnrolled ? 'Continue to Course Dashboard' : 'Enroll in Program Now'}
               </button>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-8">
            {(isATDIT || isCFTDI) && (
              <div className="bg-gradient-to-br from-brand-deep-teal to-[#164e52] rounded-3xl shadow-xl p-8 sticky top-32 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <Star className="w-48 h-48 text-brand-gold" />
                </div>
                <div className="text-center mb-6 relative z-10">
                  <p className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-2">Program Investment</p>
                  
                  {isATDIT ? (
                    <div className="flex flex-col gap-3">
                      <p className="text-4xl font-bold text-white mb-2">$3,400</p>
                      <button 
                        onClick={() => handleEnroll('full')}
                        className="block w-full p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10 hover:border-brand-gold group cursor-pointer"
                      >
                        <p className="text-lg text-brand-gold font-medium mb-2">Full ATDIT Program</p>
                        <span className="inline-block text-sm font-bold text-brand-navy bg-brand-gold px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow">ENROLL FULL COURSE</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => handleEnroll('full')}
                        className="block w-full p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10 hover:border-brand-gold group cursor-pointer"
                      >
                        <p className="text-4xl font-bold text-white group-hover:text-brand-gold transition-colors">$335</p>
                        <p className="text-lg text-brand-gold font-medium mt-1 mb-2">All 4 Modules</p>
                        <span className="inline-block text-sm font-bold text-brand-navy bg-brand-gold px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow">ENROLL FULL COURSE</span>
                      </button>
                      <div className="pt-2 flex flex-col items-center">
                        <p className="text-xs font-medium text-brand-sage-100 uppercase tracking-wider mb-2 text-center w-full relative">
                          <span className="bg-gradient-to-br from-brand-deep-teal to-[#164e52] px-2 relative z-10 text-[#f7f9fc]">OR START SMALL</span>
                          <span className="absolute left-0 top-1/2 w-full h-px bg-white/20 -z-0"></span>
                        </p>
                        <button 
                          onClick={() => handleEnroll('single')}
                          className="w-full block p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 group text-center cursor-pointer"
                        >
                          <p className="text-2xl font-bold text-white group-hover:text-brand-sage-100 transition-colors">$95 <span className="text-sm font-normal text-brand-light-gray ml-1">Try Module 1</span></p>
                          <span className="inline-block mt-2 text-xs font-semibold text-white border border-white/30 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-brand-navy transition-colors">Enroll Module 1</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <a 
                  href="https://meetings.hubspot.com/ethelle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex flex-col items-center justify-center gap-1 bg-brand-gold hover:bg-white text-brand-navy font-bold px-6 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-1 text-center relative z-10"
                >
                  <span className="text-[17px]">Not Sure? Book a Free Call First</span>
                  <span className="text-sm font-semibold opacity-90 mt-1 flex items-center gap-1"><Clock size={14} /> 30 Minutes, Free</span>
                </a>
              </div>
            )}

            {/* Contact Form Section */}
            <div className={`bg-brand-warm-white/90 rounded-3xl shadow-md border-t-8 border-t-brand-navy border-x border-b border-brand-sage-200 p-8 relative overflow-hidden ${!(isATDIT || isCFTDI) ? 'sticky top-32' : ''}`}>
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                 <MessageSquare className="w-32 h-32 text-brand-navy" />
              </div>
              <div className="flex items-center gap-4 mb-6 border-b border-brand-sage-200 pb-5 relative z-10">
               <div className="bg-brand-navy text-brand-gold p-2.5 rounded-xl shadow-md">
                 <MessageSquare className="w-6 h-6" />
               </div>
               <h3 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">Have Questions?</h3>
              </div>
              <p className="text-gray-700 text-sm mb-6 relative z-10 font-medium">
                Need more details about {course.title}? Fill out the form below and our admissions team will get back to you shortly.
              </p>
              
              {contactStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center relative z-10">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-green-200">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-green-800 mb-1 text-lg">Message Sent!</h4>
                  <p className="text-sm text-green-700 font-medium">We will contact you via email soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 relative z-10">
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 border border-brand-sage-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-white/80 backdrop-blur-sm shadow-inner"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-brand-sage-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-white/80 backdrop-blur-sm shadow-inner"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-1.5">Your Query</label>
                    <textarea
                      required
                      value={contactQuery}
                      onChange={(e) => setContactQuery(e.target.value)}
                      className="w-full px-4 py-3 border border-brand-sage-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-teal min-h-[120px] resize-none bg-white/80 backdrop-blur-sm shadow-inner"
                      placeholder="I would like to know if this program covers..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={contactStatus === 'submitting'}
                    className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70 mt-2"
                  >
                    {contactStatus === 'submitting' ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <MessageSquare size={18} />
                      </>
                    )}
                  </button>
                  {contactStatus === 'error' && (
                    <p className="text-red-500 text-sm text-center font-medium mt-3 bg-red-50 p-2 rounded-lg">There was an error sending your message. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
