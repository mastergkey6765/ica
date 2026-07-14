import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Heart,
  LineChart,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
  Quote,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

import ethelleImg from '../assets/images/Dr. lord.png';
import jenniferImg from '../assets/images/Dr. Jennifer Stelter.jpg';
import georgeImg from '../assets/images/Dr. George Grant.jpg';
import davidImg from '../assets/images/Dr. David Yoder.png';
import andrewImg from '../assets/images/Dr. Andrew Harrison.png';
import timurImg from '../assets/images/Dr. Timur Liwinsky.jpg';

export default function ICAAcademy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ICA Academy | The Premium Standard in Dementia Care Training & Certification";
  }, []);

  return (
    <div className="w-full bg-brand-warm-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-deep-teal rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-deep-teal/30 border border-brand-soft-teal/30 text-brand-soft-teal px-4 py-2 rounded-full text-sm font-bold tracking-wide mb-6 uppercase"
          >
            <GraduationCap size={18} /> Organizational Leadership
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white mb-6 leading-tight max-w-5xl mx-auto"
          >
            ICA Training and System Approach
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-brand-light-gray mb-10 leading-relaxed font-medium max-w-3xl mx-auto"
          >
            Transactional Dementia Intelligence™ (TDI) certification that reduces caregiver burnout, transforms communication, and elevates your entire care culture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <a href="#popular-programs" className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold px-10 py-5 rounded-full transition-all flex items-center justify-center gap-3 text-xl shadow-lg shadow-brand-gold/20 hover:scale-105 duration-300">
              Enroll in ICA Academy <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Journey Roadmap Section */}
      <section className="py-20 bg-brand-warm-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-sm font-bold text-brand-deep-teal tracking-widest uppercase mb-2">The Path Forward</h2>
             <h3 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy">Your Journey to Transformation</h3>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-center relative gap-12 md:gap-0 mt-8">
               {/* Connecting Line (desktop only) */}
               <div className="hidden md:block absolute top-12 left-24 right-24 h-0.5 bg-gradient-to-r from-gray-300 via-brand-soft-teal to-gray-300 z-0"></div>
               
               {/* Step 1 */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 whileInView={{ opacity: 1, y: 0 }} 
                 viewport={{ once: true }}
                 className="flex flex-col items-center relative z-10 w-full md:w-1/3"
               >
                 <div className="w-24 h-24 rounded-full bg-white text-brand-navy border-4 border-white flex items-center justify-center mb-6 shadow-xl hover:scale-105 transition-transform">
                    <BookOpen size={40} className="text-brand-navy" />
                 </div>
                 <span className="text-brand-navy font-bold font-heading text-2xl mb-2">Enroll Online</span>
                 <p className="text-gray-600 text-base text-center max-w-[240px]">Begin your specialized TDI™ training.</p>
               </motion.div>
               
               {/* Step 2 */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 whileInView={{ opacity: 1, y: 0 }} 
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="flex flex-col items-center relative z-10 w-full md:w-1/3"
               >
                 <div className="w-24 h-24 rounded-full bg-brand-navy text-brand-gold border-4 border-brand-navy-light flex items-center justify-center mb-6 shadow-xl hover:scale-105 transition-transform">
                    <Award size={40} />
                 </div>
                 <span className="text-brand-navy font-bold font-heading text-2xl mb-2">Earn Certification</span>
                 <p className="text-gray-600 text-base text-center max-w-[240px]">Master The Psychology of the Dementia Brain.</p>
               </motion.div>
               
               {/* Step 3 */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 whileInView={{ opacity: 1, y: 0 }} 
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
                 className="flex flex-col items-center relative z-10 w-full md:w-1/3"
               >
                 <div className="w-24 h-24 rounded-full bg-brand-deep-teal text-white border-4 border-brand-soft-teal flex items-center justify-center mb-6 shadow-xl hover:scale-105 transition-transform">
                    <Heart size={40} />
                 </div>
                 <span className="text-brand-deep-teal font-bold font-heading text-2xl mb-2">Transform Lives</span>
                 <p className="text-gray-600 text-base text-center max-w-[240px]">Create s humanitarian dementia care culture.</p>
               </motion.div>
            </div>
        </div>
      </section>

      {/* Why ICA Academy? */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-brand-deep-teal tracking-widest uppercase mb-2">Why ICA Academy?</h2>
            <h3 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6">Education Designed for the Real Dementia World</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Traditional dementia care systems are failing caregivers, families, the workforce, and healthcare organizations. ICA Academy builds a new generation of dementia care leaders through practical, holistic education that works in real environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-brand-navy text-white p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-deep-teal rounded-bl-full mix-blend-screen opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
               <Heart className="text-brand-gold w-12 h-12 mb-6 relative z-10" />
               <h4 className="text-2xl font-bold font-heading mb-4 relative z-10 text-white">Elevate Care Quality</h4>
               <ul className="space-y-4 text-brand-light-gray font-medium relative z-10">
                 <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-soft-teal w-5 h-5 shrink-0 mt-0.5" /> Improve dementia communication</li>
                 <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-soft-teal w-5 h-5 shrink-0 mt-0.5" /> &lsquo;Reset&rsquo; the dementia brain</li>
                 <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-soft-teal w-5 h-5 shrink-0 mt-0.5" /> Increase family satisfaction</li>
                 <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-soft-teal w-5 h-5 shrink-0 mt-0.5" /> Deliver highly confident care</li>
               </ul>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-brand-warm-white p-8 md:p-10 rounded-3xl border border-gray-200 group hover:-translate-y-2 transition-transform duration-300"
            >
               <Users className="text-brand-deep-teal w-12 h-12 mb-6" />
               <h4 className="text-2xl font-bold font-heading text-brand-navy mb-4">Empower the Team</h4>
               <ul className="space-y-4 text-gray-700 font-medium">
                 <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-gold w-5 h-5 shrink-0 mt-0.5" /> Reduce stress & fatigue</li>
                 <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-gold w-5 h-5 shrink-0 mt-0.5" /> Lower staff turnover & burnout</li>
                 <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-gold w-5 h-5 shrink-0 mt-0.5" /> Strengthen team leadership</li>
                 <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-gold w-5 h-5 shrink-0 mt-0.5" /> Optimize organizational culture</li>
               </ul>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-brand-deep-teal p-8 md:p-10 rounded-3xl shadow-xl flex flex-col justify-between text-white group hover:-translate-y-2 transition-transform duration-300"
            >
               <div>
                 <Award className="text-brand-gold w-12 h-12 mb-6" />
                 <h4 className="text-2xl font-bold font-heading mb-4 text-white">Professional Growth</h4>
                 <p className="text-brand-light-gray mb-8 leading-relaxed">Earn respected and accredited dementia coach certifications online and stand out as a highly-trained leader in the field.</p>
               </div>
               <a href="https://icacares.com/ica-academy" target="_blank" rel="noopener noreferrer" className="bg-white text-brand-deep-teal hover:bg-brand-warm-white font-bold py-4 rounded-xl text-center transition-colors flex items-center justify-center gap-2 w-full mt-auto shadow-lg">
                 View Certifications <ArrowRight size={18} />
               </a>
            </motion.div>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-12 bg-white border border-gray-200 p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow">
             <p className="text-brand-navy font-bold text-lg md:text-xl">Whether you are an individual caregiver or a memory loss organization, ICA Academy gives you the practical and unique tools to create immediate and lasting impact.</p>
          </motion.div>
        </div>
      </section>

      {/* Popular Programs */}
      <section id="popular-programs" className="py-24 bg-brand-light-gray border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6">Our Most Popular Dementia Certification Programs</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* CFTDI */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-brand-navy/5 text-brand-navy rounded-2xl flex items-center justify-center shrink-0">
                   <BookOpen size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading text-brand-navy leading-tight">Fundamentals of Transactional Dementia Intelligence™ <span className="text-brand-deep-teal">(CFTDI)</span></h3>
                </div>
              </div>
              <h4 className="font-bold text-brand-gold text-lg mb-4">Learn The Psychology of the Dementia Brain</h4>
              <p className="text-gray-700 leading-relaxed mb-6">
                The CFTDI certification teaches caregivers and healthcare professionals a powerful and easy to learn dementia communication framework that improves connection, reduces stress, and creates better outcomes for everyone involved.
              </p>
              <div className="mb-8">
                <p className="font-bold text-brand-navy mb-3">Students learn how to:</p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> Validate and then &lsquo;reset&rsquo; the brain</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> Reduce reactive behaviors</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> Apply Lord's Theory in real-world care settings</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> Build trust and emotional connection</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> Deliver more respectful, humanitarian care</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8 mt-auto pt-6 border-t border-gray-100">
                <div>
                  <p className="font-bold text-brand-navy text-sm uppercase tracking-wide mb-3">Highlights</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 100% Online Learning</li>
                    <li>• 4-Week Program, Online</li>
                    <li>• Self-Paced Access 24/7</li>
                    <li>• Immediate Application upon Learning</li>
                    <li>• Accredited Certification</li>
                  </ul>
                </div>
                <div>
                   <p className="font-bold text-brand-navy text-sm uppercase tracking-wide mb-3">Ideal For</p>
                   <ul className="space-y-1 text-sm text-gray-600">
                     <li>• All Memory Loss Professionals</li>
                     <li>• Nursing Assistants (CNAs)</li>
                     <li>• Family Caregivers</li>
                     <li>• Healthcare Training</li>
                     <li>• Management</li>
                   </ul>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                 <Link to="/checkout/c1/full" className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-3.5 px-4 rounded-xl text-center transition-colors w-full flex flex-col items-center justify-center relative overflow-hidden group">
                   <span className="flex items-center gap-2">Enroll in Full CFTDI Program <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                   <span className="text-brand-light-gray text-sm font-medium mt-0.5">All 4 Modules &mdash; $335</span>
                 </Link>
                 <Link to="/checkout/c1/single" className="w-full text-center py-3.5 px-4 rounded-xl font-bold text-brand-navy bg-white border-2 border-brand-navy hover:bg-brand-light-gray transition-colors flex flex-col items-center justify-center">
                   <span>Start with a Single Module</span>
                   <span className="text-gray-600 text-sm font-medium mt-0.5">Try Module 1 &mdash; $95</span>
                 </Link>
              </div>
            </motion.div>

            {/* ATDIT */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-brand-navy text-white p-8 md:p-10 rounded-3xl border border-brand-navy-light shadow-2xl flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-deep-teal rounded-bl-full mix-blend-screen opacity-20"></div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-16 h-16 bg-brand-deep-teal/30 text-brand-soft-teal rounded-2xl flex items-center justify-center shrink-0">
                   <Award size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading leading-tight flex flex-col text-[#eef1f3]">
                    Advanced Transactional Dementia Intelligence™ <span className="text-brand-gold text-lg">Train-the-Trainer (ATDIT)</span>
                  </h3>
                </div>
              </div>
              <h4 className="font-bold text-brand-soft-teal text-lg mb-4 relative z-10">Become a Certified Dementia Trainer & Leader in the Field</h4>
              <p className="text-brand-light-gray leading-relaxed mb-6 relative z-10">
                Designed for professionals who want to lead dementia training programs, improve organizational culture, and mentor healthcare teams and families. This master's-level program prepares professionals to implement TDI principles across practice settings. The program includes a complimentary scholarship into the Fundamentals of the TDI, and much more.
              </p>
              <div className="mb-8 relative z-10">
                <p className="font-bold text-brand-gold mb-3">You Will Learn How To:</p>
                <ul className="space-y-2 text-brand-light-gray/90 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold mt-0.5 shrink-0" /> Reduce staff turnover and burnout</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold mt-0.5 shrink-0" /> Improve dementia communication</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold mt-0.5 shrink-0" /> Build authentic caregiver relationships</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold mt-0.5 shrink-0" /> Train and mentor healthcare teams & families</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold mt-0.5 shrink-0" /> Create transformational care cultures</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8 mt-auto pt-6 border-t border-white/10 relative z-10">
                <div>
                  <p className="font-bold text-brand-gold text-sm uppercase tracking-wide mb-3">Highlights</p>
                  <ul className="space-y-1 text-sm text-brand-light-gray">
                    <li>• 3 Intensive Modules</li>
                    <li>• Online Flexible Access 24/7</li>
                    <li>• ICA Fellowship Included</li>
                    <li>• Leadership Focus</li>
                    <li>• Ongoing Development Support</li>
                  </ul>
                </div>
                <div>
                   <p className="font-bold text-brand-gold text-sm uppercase tracking-wide mb-3">Ideal For</p>
                   <ul className="space-y-1 text-sm text-brand-light-gray">
                     <li>• Administrators</li>
                     <li>• Directors of Nursing</li>
                     <li>• Dementia Trainers</li>
                     <li>• LTC Consultants</li>
                     <li>• Dementia Coaches</li>
                   </ul>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-4 relative z-10">
                 <Link to="/checkout/c2/full" className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold py-3.5 px-4 rounded-xl text-center transition-colors w-full flex flex-col items-center justify-center shadow-lg shadow-brand-gold/20 group">
                   <span className="flex items-center gap-2">Enroll in ATDIT Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                   <span className="text-brand-navy/80 text-sm font-medium mt-0.5">Become a Licensed TDI Trainer &mdash; $3,400</span>
                 </Link>
                 <a href="https://icacares.com/ica-consulting" target="_blank" rel="noopener noreferrer" className="w-full text-center py-3.5 px-4 rounded-xl font-bold text-brand-gold bg-brand-navy border-2 border-brand-gold hover:bg-brand-navy-light transition-colors flex flex-col items-center justify-center">
                   <span>Not Sure? Book a Complimentary Call First</span>
                   <span className="text-brand-gold/80 text-sm font-medium mt-0.5">Talk to Dr. Lord - 30 Minutes</span>
                 </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faculty Experts Section */}
      <section className="py-24 bg-brand-navy text-white relative border-b border-brand-navy-light">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-brand-gold font-bold uppercase tracking-wider mb-2">Encounter the Future of Dementia Care</h2>
              <h3 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">Learn From Global Experts & Innovators</h3>
              <p className="text-brand-light-gray text-lg mb-8">
                ICA Faculty members represent diverse disciplines and cutting-edge approaches shaping the future of dementia care worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                 {['Dementia communication', 'Behavioral psychology', 'Integrative medicine', 'Holistic wellness', 'Metabolic psychiatry', 'Leadership optimization', 'Inclusive dementia care', 'AI predictive models'].map(discipline => (
                   <span key={discipline} className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/20">{discipline}</span>
                 ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { name: "Dr. Éthelle Lord", role: "Creator of TDI™", title: "Dementia Care Pioneer", image: ethelleImg },
                 { name: "Dr. Jennifer Stelter", role: "Dementia Connection Model", title: "Clinical Psychologist", image: jenniferImg },
                 { name: "Dr. George Grant", role: "Integrative Medicine", title: "Global Wellness Expert", image: georgeImg },
                 { name: "Dr. David Yoder", role: "Holistic Wellness", title: "Chiropractic Physician", image: davidImg },
                 { name: "Dr. Andrew Harrison", role: "Inclusive Dementia Care", title: "Healthcare Innovator", image: andrewImg },
                 { name: "Dr. Timur Liwinsky", role: "Metabolic Psychiatric Care", title: "Medical Researcher", image: timurImg }
               ].map((expert, idx) => (
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                    <img 
                      src={expert.image} 
                      alt={expert.name}
                      className="w-16 h-16 rounded-full object-cover mb-4 group-hover:scale-110 transition-transform shadow-lg border border-white/20"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="text-xl font-bold font-heading text-white">{expert.name}</h4>
                    <p className="text-brand-gold font-medium mb-2">{expert.role}</p>
                    <p className="text-brand-light-gray text-sm">{expert.title}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Who Should Enroll & Benefits */}
      <section className="py-20 bg-brand-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
             {/* What You Get Card */}
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-brand-navy p-8 md:p-10 rounded-3xl text-white shadow-xl">
                <div className="w-14 h-14 bg-brand-deep-teal rounded-full flex items-center justify-center mb-6">
                   <Award className="text-brand-gold w-7 h-7" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-heading mb-6 text-white">What You Get with ICA Accredited Certification</h3>
                <ul className="space-y-4">
                  {[
                    "Globally recognized credential for your resume or LinkedIn",
                    "Printable diploma and digital certification badge",
                    "CEUs hours for professional re-credentialing",
                    "Free ICA Fellowship membership ($145/year value)",
                    "One foundational textbook included at no extra cost",
                    "24/7 online access and lifetime course materials",
                    "Ongoing post-graduation support from ICA"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-brand-light-gray font-medium items-start">
                      <Star className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
             </motion.div>

             {/* Who Should Enroll Card */}
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl">
                <div className="w-14 h-14 bg-brand-warm-white rounded-full flex items-center justify-center mb-6 border border-gray-200">
                   <Users className="text-brand-deep-teal w-7 h-7" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-heading mb-6 text-brand-navy">Who Should Enroll</h3>
                <ul className="space-y-4">
                  {[
                    "Family caregivers supporting a loved one with memory loss",
                    "CNAs, doctors, nurses, social workers, PT, OT, SLP, activities directors",
                    "Home health aides and hospice care professionals",
                    "Memory loss facility administrators",
                    "Healthcare educators seeking Train-the-Trainer certification",
                    "Emotional and spiritual anchors for aging populations",
                    "Anyone committed to compassionate, humanitarian care"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-700 font-medium items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-deep-teal shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Systems Approach & Certifications */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                 <div className="bg-brand-deep-teal text-white p-10 rounded-3xl shadow-xl">
                    <ShieldCheck className="w-16 h-16 text-brand-gold mb-6" />
                    <h3 className="text-3xl font-bold font-heading text-[#f1f1f2] mb-4 leading-tight">ICA Offers a System Approach to Dementia Care</h3>
                    <p className="text-lg text-brand-gold font-bold mb-6">Build a New Culture for Your Organization</p>
                    <p className="text-brand-light-gray leading-relaxed mb-6">
                      Most dementia care organizations attempt to fix isolated problems, but the results often remain the same: burnout, turnover, stress, anxiety, anger, and disconnected care.
                    </p>
                    <p className="text-brand-light-gray leading-relaxed mb-8">
                       ICA Academy helps organizations rebuild dementia care culture from the ground up using a complete system-based approach. The Transactional Dementia Intelligence™ Model. We help you improve performance, reduce churn, increase family trust as well as your ROI.
                    </p>
                    <Link to="/enterprise" className="bg-white text-brand-deep-teal font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 hover:bg-gray-100 transition-colors">
                      Request Preliminary Assessment <ArrowRight size={18} />
                    </Link>
                 </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                 <h2 className="text-sm font-bold text-brand-deep-teal tracking-widest uppercase mb-2">Elevate Your Career</h2>
                 <h3 className="text-3xl font-bold font-heading text-brand-navy mb-6">Certification That Stands Out</h3>
                 <p className="text-lg text-gray-700 leading-relaxed mb-8">
                   ICA certifications are designed to help healthcare professionals grow their expertise, expand career opportunities, and become leaders in compassionate dementia care. Our curriculum combines real-world application with the science of the dementia brain and cognitive impairment, recognizing what remains in the dementia brain.
                 </p>
                 <div className="bg-brand-warm-white p-8 rounded-2xl border border-gray-200">
                    <h4 className="font-bold text-brand-navy mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-brand-gold" /> Elevating Industry Standards</h4>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                       "Graduates of ICA Academy represent the leading edge of dementia care. They aren't just trained to handle basic needs - they are trained to understand The Psychology of the Dementia Brain to best understand the behavior, building deep, meaningful connections." ~ Dr. E. Lord
                    </p>
                 </div>
              </motion.div>
           </div>
           
           <div className="max-w-4xl mx-auto text-center">
              <Quote className="w-16 h-16 text-brand-soft-teal mx-auto mb-6 opacity-30" />
              <p className="text-2xl text-brand-navy font-bold italic leading-relaxed mb-6 font-serif">
                “A dementia specialist is always the person living with dementia on a daily basis. A dementia coach is one that takes time to study, train, and apply that knowledge. Learning The Psychology of the Dementia Brain, along with dementia as a journey and dementia coaching.”
              </p>
              <div className="w-12 h-1 bg-brand-gold mx-auto mb-4"></div>
              <p className="font-bold text-gray-700 text-lg uppercase tracking-wide">Dr. Éthelle Lord</p>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-brand-warm-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
             <h2 className="text-sm font-bold text-brand-deep-teal tracking-widest uppercase mb-2">Have Questions?</h2>
             <h3 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
             {[
                {
                   q: "Which course should I start with?",
                   a: "If you are a family caregiver, nurse, CNA, or care professional looking to improve your own skills, start with CFTDI ($335). If you are an organizational leader or educator ready to become a licensed dementia intelligence™ trainer, ATDIT is for you. Not sure? Book a free 30-minute call with Dr. Lord."
                },
                {
                   q: "Can I take just one module of CFTDI?",
                   a: "Yes. Individual CFTDI modules are available for $95 each, letting you explore the curriculum before committing to the full program. However, there is a savings by enrolling for all four modules at once and taking about four weeks to complete the viewing, reading, research, and exam."
                },
                {
                   q: "Do these courses offer CEUs?",
                   a: <>ICA certification programs are designed to meet CEU hours requirements for healthcare professionals. Contact <Link to="/contact" className="text-brand-deep-teal hover:underline">ICA</Link> for current accreditation details applicable to your professional license.</>
                },
                {
                   q: "What does ICA Fellowship include?",
                   a: "Every graduate receives an ICA Fellowship (special at $145/year value): access to exclusive dementia care research, discounts on ICA programs, complimentary chats with Dr. Lord, and access to the ICA Dementia Talent Network."
                },
                {
                   q: "Are certifications recognized internationally?",
                   a: "Yes. ICA-certified professionals are actively practicing across six continents in care organizations, academic institutions, and healthcare facilities worldwide."
                }
             ].map((faq, index) => (
                <details key={index} className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm open:shadow-md transition-all">
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-lg text-brand-navy list-none [&::-webkit-details-marker]:hidden focus:outline-none">
                     <span>{faq.q}</span>
                     <span className="transition duration-300 group-open:rotate-45 shrink-0 bg-brand-light-gray p-2 rounded-full text-brand-deep-teal">
                       <Plus className="w-5 h-5" />
                     </span>
                  </summary>
                  <div className="text-gray-700 mt-4 leading-relaxed pr-8 animate-in fade-in slide-in-from-top-2 duration-300">
                     {faq.a}
                  </div>
                </details>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-brand-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">Start Learning With ICA Academy</h2>
           <p className="text-xl md:text-2xl text-brand-gold mb-12 font-medium">Join the Movement Transforming Dementia Care Worldwide</p>
           <p className="text-lg text-brand-light-gray mb-12 max-w-3xl mx-auto leading-relaxed">
             Whether you want to advance your career, strengthen your organization, or improve the lives of those living with dementia, ICA Academy provides the education, certification, and leadership training to help you succeed.
           </p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 text-sm md:text-base font-bold text-brand-light-gray">
              <div className="bg-white/5 py-3 px-2 rounded-lg border border-white/10">Fundamentals of TDI™</div>
              <div className="bg-white/5 py-3 px-2 rounded-lg border border-white/10">Train-the-Trainer TDI™</div>
              <div className="bg-white/5 py-3 px-2 rounded-lg border border-white/10">Organizational Consulting</div>
              <div className="bg-white/5 py-3 px-2 rounded-lg border border-white/10">Leadership Development with TDI™ System</div>
           </div>

           <a href="https://icacares.com/ica-academy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold px-10 py-5 rounded-full transition-colors text-lg shadow-xl shadow-brand-gold/20">
             Enroll Today & Become Part of the Future
             <ArrowRight size={20} />
           </a>
        </div>
      </section>
    </div>
  );
}
