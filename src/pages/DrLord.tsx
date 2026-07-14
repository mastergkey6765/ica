import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Clock, X, Download, Loader2 } from 'lucide-react';
import drLordAndHusbandImage from '../assets/images/dr Lord with her husban.png';
import drLordBookImage from '../assets/images/book cover.png';
import drLordProfileImage from '../assets/images/Dr. lord.png';
import { submitToHubSpot } from '../lib/hubspot';

const DrLord = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadForm, setDownloadForm] = useState({ name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Dr. Éthelle G. Lord | Pioneer in Dementia Care | ICA";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn about Dr. Éthelle G. Lord, founder of the International Caregivers Association LLC, creator of the TDI Model, and author of Alzheimer's Coaching.");
    }
  }, []);

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitToHubSpot({
        formId: import.meta.env.VITE_HUBSPOT_BOOK_DOWNLOAD_FORM_ID,
        fields: [
          { name: 'firstname', value: downloadForm.name },
          { name: 'email', value: downloadForm.email }
        ]
      });
    } catch (error) {
      console.error('HubSpot submission error', error);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="bg-brand-light-gray min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-navy pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-deep-teal rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white leading-tight mb-6"
          >
            Dr. Éthelle G. Lord
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-brand-gold font-medium mb-4"
          >
            The Personal Journey of A Dementia Care Leader
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-lg md:text-xl text-brand-light-gray max-w-3xl mx-auto leading-relaxed"
          >
            Founder of the International Caregivers Association LLC & Creator of the TDI™ Model
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32 bg-brand-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Segment 1: Bio & Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24"
          >
            <div className="lg:col-span-5 relative">
               <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                 <img 
                   src={drLordProfileImage} 
                   alt="Dr. Éthelle G. Lord" 
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                   loading="eager"
                   decoding="async"
                 />
               </div>
               <div className="absolute top-1/2 -right-8 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl -z-10"></div>
            </div>
            
            <div className="lg:col-span-7 space-y-8">
               <div>
                 <h3 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy mb-4">Growing A Vision for A New Dementia Care Model</h3>
                 <h4 className="text-xl font-bold text-brand-deep-teal mb-6">A Lifetime of Learning</h4>
               </div>
               <p className="text-gray-700 leading-relaxed text-lg">
                 A 2010 graduate of the University of Phoenix with a Doctor of Management in Organizational Leadership (DM), Dr. Lord is the founding president of the International Caregivers Association LLC (ICA). The ICA was founded over two decades ago to train, coach, and consult with dementia providers. 
               </p>
               <p className="text-gray-700 leading-relaxed text-lg">
                 Prior to the ICA, Dr. Lord founded Remembering for You, a service devoted to supporting dementia care providers and families with educational resources and innovations.
               </p>
               <p className="text-gray-700 leading-relaxed text-lg">
                 More recently, Dr. Lord has developed the Transactional Dementia Intelligence™ Model (TDIM) which focuses on shifting dementia care from a medical model to a social/wellness model It is designed to benefit families, staff, and facilities. Her comprehensive dementia program dramatically improves existing models used worldwide. She is the creator of The Psychology of the Dementia Brain, an evidenced-based theory to improve dementia communication. She is an author, a keynote presenter, and an instructor.
               </p>
            </div>
          </motion.div>

          {/* Segment 2: Advocacy & Personal Experience */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24"
          >
            <div className="lg:col-span-7 order-2 lg:order-1 space-y-8">
               <h3 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy mb-6">Advocacy Born From Personal Experience</h3>
               <p className="text-gray-700 leading-relaxed text-lg">
                 After advocating for caregivers for over two decades, Dr. Lord saw a need to expand ICA's mission to directly impact dementia care standards. Her experience caring for her husband gave insights into system gaps. She made it her mission to change perceptions, improve training, and implement the TDI Model as a holistic, compassion-based model. Upon her husband's passing in June 2020, Dr. Lord took time to grieve and reevaluate ICA's direction.
               </p>
               <p className="text-gray-700 leading-relaxed text-lg">
                 As a visionary advocate, Dr. Lord brings new opportunities benefiting families and organizations. Her positive impact has improved care delivery from medical to wellness models. As an experienced management consultant, she provides customized and comprehensive services worldwide. She is the creator of the Transactional Dementia Intelligence™ Model, a system approach to dementia care, and The Psychology of the Dementia Brain to improve dementia communication for everyone.
               </p>
               <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-brand-deep-teal">
                 <p className="text-brand-navy font-medium italic text-xl leading-relaxed">
                   "Our mission is to shift dementia care permanently: moving away from a broken medical model to a holistic wellness and social model that deeply understands the psychology of dementia."
                 </p>
                 <p className="text-right text-brand-navy font-bold mt-4">— Dr. E. Lord</p>
               </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 relative">
               <div className="aspect-[9/16] w-full max-w-sm mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                 <img 
                   src={drLordAndHusbandImage} 
                   alt="Dr. Lord & her husband" 
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                   loading="eager"
                   decoding="async"
                 />
               </div>
               <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brand-deep-teal/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </motion.div>

          {/* Segment 3: Published Author */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-xl border border-gray-100"
          >
             <div className="md:col-span-5 lg:col-span-4">
               <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <img 
                    src={drLordBookImage} 
                    alt="Book Cover Placeholder" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
               </div>
             </div>
             
             <div className="md:col-span-7 lg:col-span-8 space-y-8">
               <h3 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy mb-6">A Published Author & Respected Speaker</h3>
               <p className="text-gray-700 leading-relaxed text-lg">
                 In addition to being a sought-after speaker, Dr. Lord is an accomplished author. In her book <strong>“Alzheimer’s Coaching: Taking A Systems Approach in Creating an Alzheimer’s Friendly Healthcare Workforce”</strong> now in its 3rd Edition, she shares insights from caring for her husband Major Larry S. Potter, USAF Retired, who had Vascular Dementia (VaD). More importantly, the book is a course in dementia coaching.
               </p>
               <p className="text-gray-700 leading-relaxed text-lg">
                 She co-authored <strong>“The Archetypes of Leadership in Healthcare: Uncovering the Human Dynamics That Shape Care, Culture and Performance”</strong> with Patrick Bray at TEAM ME®.
               </p>
               <p className="text-gray-700 leading-relaxed text-lg">
                 She also authored <strong>“How in the World...and Now What Do I Do?”</strong>, an Alzheimer’s primer available in several languages (English, French, Spanish, Arabic) outlining 12 major points for coping better with dementia. This primer is available upon request: Info@ICAcares.com
               </p>
               
               <div className="pt-6 border-t border-gray-200 flex flex-wrap gap-4">
                 <button 
                   onClick={() => setIsDownloadModalOpen(true)} 
                   className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block text-left"
                 >
                   Download Alzheimer's Coaching PDF
                 </button>
                 <a 
                   href="/Alzheimers_Coaching_2nd_Edition.pdf"
                   download
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block text-left"
                 >
                   Download Alz.’s Coaching 2nd Ed. PDF
                 </a>
               </div>
             </div>
          </motion.div>

          {/* Segment 4: Consulting Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 pt-20 border-t-2 border-gray-200"
          >
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6">Consulting Services & Coaching</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Besides serving as founder and guiding voice for the ICA, Dr. Lord likes to offer proven paths to success for both professionals and individuals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Left Column: Info */}
               <div className="lg:col-span-7 space-y-8">
                  <div className="bg-brand-navy text-white p-8 md:p-10 rounded-3xl shadow-xl">
                    <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-brand-gold">The Doctor Is In!</h3>
                    <p className="text-brand-light-gray leading-relaxed text-lg font-medium">
                      Dr. Éthelle Lord is available for direct consultation for your organization or for you personally! Her immense background in management, personal coaching, and dementia care makes her an ideal resource for fast, incisive solutions.
                    </p>
                    <p className="text-white leading-relaxed mt-6 text-lg">
                       Dr. Lord serves a global clientele around the world and can be scheduled anytime, anywhere, 24/7.
                    </p>
                  </div>

                  <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-lg">
                    <h3 className="text-2xl md:text-3xl font-bold font-heading text-brand-navy mb-4">World-Class Expertise</h3>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                       Navigating the terrain of organizational management, dementia care, and even your own career or personal life can be difficult. But you can save yourself the cost of lost opportunities!
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg mb-8 font-medium">
                       Don't try to arrive at your goals through painful trial and error. Go to the source for proven solutions based on Dr. Lord's 25+ years of experience in all of these areas:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                      {[
                        "Dementia Consulting",
                        "Management Consulting",
                        "Dementia Intelligence Consulting",
                        "Master Dementia Coaching",
                        "Family Caregiving Coaching",
                        "Dementia Intelligence Training",
                        "Transactional Analysis Training",
                        "Energy Medicine (GSHS)",
                        "Nutritional Consulting",
                        "Voice Scan Wellness Profile"
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-800 font-medium items-start">
                          <CheckCircle2 className="w-6 h-6 text-brand-deep-teal shrink-0" />
                          <span className="mt-0.5 leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>

               {/* Right Column: Pricing & Booking */}
               <div className="lg:col-span-5 relative">
                  <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl h-fit border-t-8 border-t-brand-gold sticky top-28">
                    <h3 className="text-2xl md:text-3xl font-bold font-heading text-brand-navy mb-6">Flexible Consulting Options</h3>
                    
                    <div className="bg-brand-light-gray p-6 rounded-2xl mb-8">
                      <h4 className="font-bold text-brand-navy text-lg mb-2 flex items-center gap-2">
                         <Clock className="w-5 h-5 text-brand-deep-teal" /> 
                         COMPLEMENTARY FIRST SESSION
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm">
                         Your first "discovery session" with Dr. Lord is always complementary. Claim your first 30 minutes of time free of charge today.
                      </p>
                    </div>

                    <ul className="space-y-2 mb-8">
                      <li className="flex justify-between items-center py-4 border-b border-gray-100">
                         <span className="font-bold text-gray-800">Discovery Session (30 min)</span>
                         <span className="text-brand-deep-teal font-bold bg-brand-deep-teal/10 px-3 py-1 rounded-full">Free</span>
                      </li>
                      <li className="flex justify-between items-center py-4 border-b border-gray-100">
                         <span className="font-bold text-gray-800">30-Minute Coaching</span>
                         <span className="text-brand-navy font-bold text-lg">$125</span>
                      </li>
                      <li className="flex justify-between items-center py-4 border-b border-gray-100">
                         <span className="font-bold text-gray-800">60-Minute Consultation</span>
                         <span className="text-brand-navy font-bold text-lg">$230</span>
                      </li>
                      <li className="flex justify-between items-center py-4 border-b border-gray-100">
                         <span className="font-bold text-gray-800">Extended Deep-Dive</span>
                         <span className="text-brand-navy font-bold text-lg">$325</span>
                      </li>
                      <li className="flex flex-col gap-1 py-4 border-b border-gray-100">
                         <div className="flex justify-between items-center">
                           <span className="font-bold text-gray-800">Organizational Consulting</span>
                           <span className="text-brand-navy font-medium italic text-right text-sm">Contact for Pricing</span>
                         </div>
                      </li>
                    </ul>

                    <a 
                      href="https://meetings.hubspot.com/ethelle" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-4 rounded-xl text-center transition-colors w-full flex items-center justify-center gap-2 text-lg"
                    >
                      Book Your Free Session
                    </a>
                    <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
                       Basic Ongoing Rate: $125 per half hour and $230 for a full hour. Rates may be adjusted based on type of consulting required. Full pricing guide available after discovery session.
                    </p>
                  </div>
               </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Download Modal Overlay */}
      <AnimatePresence>
        {isDownloadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDownloadModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-brand-light-gray hover:bg-gray-200 text-brand-navy transition-colors z-10"
              >
                <X size={20} />
              </button>

              {!isSubmitted ? (
                <div>
                  <h3 className="text-2xl font-bold font-heading text-brand-navy mb-2">Download Free PDF</h3>
                  <p className="text-gray-600 mb-6">Enter your details below to access "Alzheimer's Coaching" by Dr. Éthelle Lord.</p>
                  
                  <form onSubmit={handleDownloadSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-deep-teal focus:border-brand-deep-teal transition-all"
                        value={downloadForm.name}
                        onChange={(e) => setDownloadForm({ ...downloadForm, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-deep-teal focus:border-brand-deep-teal transition-all"
                        value={downloadForm.email}
                        onChange={(e) => setDownloadForm({ ...downloadForm, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>Processing... <Loader2 className="w-5 h-5 animate-spin" /></>
                      ) : (
                        <>
                          <Download size={20} />
                          Get PDF Link
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-brand-navy mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">Your download is ready. Click the link below to view or save the book.</p>
                  <a
                    href="#" // Placeholder for actual PDF
                    onClick={(e) => {
                      e.preventDefault();
                      alert("PDF download started! (Simulated)");
                      setIsDownloadModalOpen(false);
                      setIsSubmitted(false);
                      setDownloadForm({ name: '', email: '' });
                    }}
                    className="inline-flex bg-brand-deep-teal hover:bg-brand-navy text-white font-bold py-3 px-8 rounded-lg transition-colors items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    Download "Alzheimer's Coaching"
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DrLord;
