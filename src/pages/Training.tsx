import { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Users, 
  Brain, 
  LineChart, 
  ShieldCheck, 
  Award,
  Globe2,
  Heart,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Quote,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Training() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "TDI Model: Transactional Dementia Intelligence for Care Organizations | ICA";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "The TDI Model by Dr. Ethelle Lord transforms dementia care organizations, reducing turnover, improving resident outcomes, and building a culture of Transactional Dementia Intelligence. Learn how.");
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = "The TDI Model by Dr. Ethelle Lord transforms dementia care organizations, reducing turnover, improving resident outcomes, and building a culture of Transactional Dementia Intelligence. Learn how.";
      document.head.appendChild(newMeta);
    }
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
            className="inline-flex items-center gap-2 bg-brand-deep-teal/30 border border-brand-soft-teal/30 text-brand-soft-teal px-4 py-2 rounded-full text-sm font-bold tracking-wide mb-6"
          >
            <ShieldCheck size={18} /> The TDI Model
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white mb-8 leading-tight max-w-5xl mx-auto"
          >
            A Complete Dementia Care System That <span className="text-brand-gold">Transforms Organizations</span> and Restores Dignity
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-light-gray mb-12 leading-relaxed font-medium max-w-4xl mx-auto"
          >
            Turnover, burnout, and behavioral challenges aren't inevitable. They are symptoms of a communication gap. The TDI Model bridges that gap, creating a supportive environment where both caregivers and those living with dementia can thrive.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#assessment" className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-brand-gold/20">
              Request Preliminary Assessment <ArrowRight size={20} />
            </a>
            <a href="#pillars" className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-colors flex items-center justify-center backdrop-blur-sm border border-white/20">
              Explore the Model
            </a>
          </motion.div>
        </div>

        {/* Stats Strip overlaying the bottom of hero */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
           <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20 relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-4 md:pt-0">
                <div className="text-4xl md:text-5xl font-bold font-heading text-brand-gold mb-2 flex items-center justify-center gap-2">
                  55M+
                </div>
                <p className="text-brand-light-gray font-medium">people living with<br/>dementia worldwide</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="pt-8 md:pt-0">
                <div className="text-4xl md:text-5xl font-bold font-heading text-brand-gold mb-2 flex items-center justify-center gap-2">
                  <LineChart size={32} className="text-brand-soft-teal" /> 40%
                </div>
                <p className="text-brand-light-gray font-medium">average staff turnover reduction<br/>in TDI Partner facilities</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="pt-8 md:pt-0">
                <div className="text-4xl md:text-5xl font-bold font-heading text-brand-gold mb-2 flex items-center justify-center gap-2">
                  <Globe2 size={32} className="text-brand-soft-teal" /> 6
                </div>
                <p className="text-brand-light-gray font-medium">continents where ICA's TDI<br/>Model is implemented</p>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Understanding & Theory */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-sm font-bold text-brand-deep-teal tracking-widest uppercase mb-2">What Is the TDI Model?</h2>
              <h3 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6 leading-tight">Understanding Transactional Dementia Intelligence</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Traditional dementia care focuses on managing behaviors, reducing agitation, preventing wandering, adjusting medications. The TDI Model takes a fundamentally different approach: <strong>it focuses on understanding the person.</strong>
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Transactional Dementia Intelligence (TDI) is a body of knowledge that reframes dementia not as a purely limiting medical condition, but as a unique lens through which a person experiences reality. When caregivers understand this lens, how memory loss reshapes time, identity, and perception, they can communicate in ways that reduce fear, build trust, and create genuine moments of connection, even in advanced stages of cognitive decline.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
               <div className="bg-brand-warm-white p-10 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
                  <Quote className="absolute top-6 right-6 w-24 h-24 text-brand-deep-teal opacity-[0.05]" />
                  <h4 className="text-xl font-bold text-brand-navy mb-6 font-heading border-b border-gray-200 pb-4">Lord's Theory - The Foundation</h4>
                  <p className="text-xl text-gray-700 italic leading-relaxed mb-8 relative z-10">
                    "Healthcare leaders have created a culture which does not have the structures, processes, or been able to retain people with the needed mindsets to support their LTC services. The Transactional Dementia Intelligence business model of dementia care has built-in structures, processes, and retention incentives to revolutionize the entire organization."
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                     <div className="w-14 h-14 bg-brand-navy rounded-full flex items-center justify-center text-brand-gold font-bold text-xl">EL</div>
                     <div>
                       <p className="font-bold text-brand-navy">Dr. Ethelle Lord</p>
                       <p className="text-sm text-gray-600 font-medium">Founder, International Caregivers Association LLC (ICA)</p>
                     </div>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pillars" className="py-24 bg-brand-light-gray border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6">How the TDI Model Works:<br/>A Systems-Level Approach</h2>
            <p className="text-lg text-gray-700">
              The TDI Model is not a standalone training program. It is a complete organizational system that restructures how your facility or care team approaches dementia at every level. It works through three interconnected pillars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="w-16 h-16 bg-brand-navy rounded-2xl flex items-center justify-center text-brand-gold mb-6 shadow-sm">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold font-heading text-brand-navy mb-4">Pillar 1: TDI Partnerships</h3>
              <p className="font-bold text-brand-deep-teal mb-4 text-sm uppercase tracking-wide">Formalizing the Care Team</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Establishes formalized partnerships between three stakeholder groups that are too often siloed:
              </p>
              <ul className="space-y-3 mt-auto text-sm text-gray-600 font-medium">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> People living with dementia & their families</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> Professional care staff</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> Certified Dementia Coaches</li>
              </ul>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-brand-navy text-white p-8 rounded-3xl border border-brand-navy-light shadow-xl hover:shadow-2xl transition-shadow flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-deep-teal rounded-bl-full mix-blend-screen opacity-20"></div>
              <div className="w-16 h-16 bg-brand-deep-teal rounded-2xl flex items-center justify-center text-white mb-6 shadow-sm relative z-10">
                <Award size={32} />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 relative z-10">Pillar 2: TDI Training</h3>
              <p className="font-bold text-brand-gold mb-4 text-sm uppercase tracking-wide relative z-10">Building Deep Intelligence</p>
              <p className="text-brand-light-gray leading-relaxed mb-6 relative z-10">
                A full curriculum of training and certification programs, enabling staff to provide individualized, person-centered care with confidence.
              </p>
              <ul className="space-y-3 mt-auto text-sm text-brand-light-gray/90 font-medium relative z-10">
                <li className="flex gap-2"><ChevronRight size={16} className="text-brand-gold mt-0.5 shrink-0" /> <b>CFTDI</b> ($335) - Fundamentals</li>
                <li className="flex gap-2"><ChevronRight size={16} className="text-brand-gold mt-0.5 shrink-0" /> <b>ATDIT</b> ($3,400) - Train-the-Trainer</li>
                <li className="flex gap-2"><ChevronRight size={16} className="text-brand-gold mt-0.5 shrink-0" /> Dementia Connection Specialist (DCSCT)</li>
                <li className="flex gap-2"><ChevronRight size={16} className="text-brand-gold mt-0.5 shrink-0" /> Certified Dementia Coach Training</li>
              </ul>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="w-16 h-16 bg-brand-warm-white rounded-2xl flex items-center justify-center text-brand-deep-teal mb-6 shadow-sm">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold font-heading text-brand-navy mb-4">Pillar 3: TDI Culture</h3>
              <p className="font-bold text-brand-deep-teal mb-4 text-sm uppercase tracking-wide">Sustaining Quality</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Implementation without sustainability produces temporary results. The TDI Model includes built-in structures over the long term.
              </p>
              <ul className="space-y-3 mt-auto text-sm text-gray-600 font-medium">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> Built-in accountability structures</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> Performance tracking</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-soft-teal mt-0.5 shrink-0" /> Staff recognition systems</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Case (ROI) */}
      <section className="py-24 bg-brand-deep-teal text-white relative">
        <div className="absolute inset-0 bg-brand-navy/50 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">The Business Case for the TDI Model</h2>
            <p className="text-lg text-brand-light-gray leading-relaxed">
              Addressing the root causes of the most expensive problems in long-term dementia care: staff turnover, medication dependency, behavioral incidents, and family dissatisfaction. Return on Investment is measurable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-brand-navy/80 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:border-brand-soft-teal/50 transition-colors">
               <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                 <div className="w-14 h-14 bg-brand-soft-teal/20 rounded-xl flex items-center justify-center text-brand-soft-teal">
                   <Building2 size={32} />
                 </div>
                 <h3 className="text-2xl font-bold font-heading">Operational Outcomes</h3>
               </div>
               <ul className="space-y-5">
                 {[
                   "Significant reduction in staff turnover",
                   "Increased job satisfaction and team cohesion",
                   "Lower recruitment and onboarding costs",
                   "Reduced medication and liability expenses",
                   "Improved occupancy rates and market differentiation",
                   "Stronger organizational reputation with families"
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <CheckCircle2 size={24} className="text-brand-soft-teal shrink-0 mt-0.5" />
                     <span className="text-brand-light-gray font-medium text-lg leading-snug">{item}</span>
                   </li>
                 ))}
               </ul>
             </div>

             <div className="bg-brand-navy/80 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:border-brand-gold/50 transition-colors">
               <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                 <div className="w-14 h-14 bg-brand-gold/20 rounded-xl flex items-center justify-center text-brand-gold">
                   <Heart size={32} />
                 </div>
                 <h3 className="text-2xl font-bold font-heading">Care Quality Outcomes</h3>
               </div>
               <ul className="space-y-5">
                 {[
                   "Higher resident quality of life scores",
                   "Fewer behavioral incidents and physical restraint use",
                   "Reduced reliance on psychotropic medications",
                   "Improved family satisfaction and trust",
                   "Person-centered, individualized care plans",
                   "Dignified, compassionate end-of-life care"
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <CheckCircle2 size={24} className="text-brand-gold shrink-0 mt-0.5" />
                     <span className="text-brand-light-gray font-medium text-lg leading-snug">{item}</span>
                   </li>
                 ))}
               </ul>
             </div>
          </div>
          
          <div className="mt-16 text-center max-w-4xl mx-auto bg-brand-navy/60 p-8 rounded-2xl border border-white/10">
             <Quote className="w-12 h-12 text-brand-soft-teal mx-auto mb-4 opacity-50" />
             <p className="text-brand-light-gray/90 italic text-lg leading-relaxed font-serif">
               "From an economic standpoint, the TDI Model is uniquely positioned to earn stakeholder buy-in from the top down. When executive leadership sees ROI alongside mission alignment, adoption becomes institutional rather than departmental."
             </p>
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-24 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
             <h2 className="text-sm font-bold text-brand-deep-teal tracking-widest uppercase mb-2">Who It Serves</h2>
             <h3 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6">A Framework Built for Every Stakeholder</h3>
             <p className="text-lg text-gray-700">The TDI Model's power lies in its capacity to deliver meaningful value to every person involved in the dementia care journey, simultaneously and systemically.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "For Administrators & Organizational Leaders",
                icon: <Building2 className="text-brand-navy" />,
                points: [
                  "Comprehensive new structure built on communication and performance standards",
                  "Equip staff with TDI training that reduces reactive behaviors and costly incidents",
                  "Reduce expenditures associated with turnover, medication management, and liability",
                  "Differentiate your facility in the local market by marketing your TDI Partner status",
                  "Build a dementia-intelligent culture that attracts and retains top-quality staff"
                ]
              },
              {
                title: "For Dementia Care Staff & Professionals",
                icon: <Users className="text-brand-deep-teal" />,
                points: [
                  "Build deep expertise in dementia communication and behavior understanding",
                  "Gain clarity on your role within the care team through defined structures",
                  "Find greater meaning and reduced stress by focusing on positive connections",
                  "Grow professionally in an organization that invests in your development",
                  "Benefit from a workplace culture that prioritizes peer support and wellbeing"
                ]
              },
              {
                title: "For People Living with Dementia",
                icon: <Brain className="text-brand-gold" />,
                points: [
                  "Receive personalized care centered on unique experiences, not just a diagnosis",
                  "Be supported by caregivers trained to understand the psychology of the dementia brain",
                  "Experience a higher quality of life, greater dignity, and meaningful daily interactions",
                  "Be surrounded by knowledgeable partners who view you as a whole person",
                  "Live in an environment designed to facilitate positive moments"
                ]
              },
              {
                title: "For Family Caregivers & Loved Ones",
                icon: <Heart className="text-rose-500" />,
                points: [
                  "Be welcomed as a valued partner through TDI's formalized family engagement",
                  "Access specialized TDI training to become more informed and confident",
                  "Benefit from open, transparent communication with the professional care team",
                  "Gain confidence that your loved one is truly understood, not just managed",
                  "Experience the relief of having a unified care system that honors family bonds"
                ]
              }
            ].map((st, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-10 rounded-3xl hover:shadow-xl transition-shadow h-full flex flex-col">
                 <div className="flex items-center gap-5 mb-8">
                   <div className="w-16 h-16 bg-brand-warm-white rounded-2xl flex items-center justify-center shadow-sm">
                     {st.icon}
                   </div>
                   <h4 className="text-2xl font-bold font-heading text-brand-navy leading-tight">{st.title}</h4>
                 </div>
                 <ul className="space-y-4">
                   {st.points.map((pt, i) => (
                     <li key={i} className="flex items-start gap-3">
                       <ChevronRight size={20} className="text-brand-gold shrink-0 mt-0.5" />
                       <span className="text-gray-700 font-medium leading-relaxed">{pt}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner (Steps) */}
      <section id="assessment" className="py-24 bg-brand-light-gray relative border-t border-gray-200">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-navy hidden lg:block rounded-l-3xl shadow-xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 pr-0 lg:pr-12">
              <h2 className="text-sm font-bold text-brand-deep-teal tracking-widest uppercase mb-2">Become a TDI Model Partner</h2>
              <h3 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6">Implement the Best Practice of Dementia Care</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                ICA's Preliminary Assessment is the first step for organizations interested in implementing the TDI Model. In this comprehensive 360-degree evaluation, ICA consultants examine your current dementia care program across every dimension: staff training and certification levels, communication protocols, family engagement practices, care planning quality, and organizational culture.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Following the assessment, ICA develops a customized TDI implementation roadmap that addresses your organization's specific gaps and builds on your existing strengths. Implementation is supported by:
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Staff training and TDI certification at all levels",
                  "Dementia Coach certification for designated team leaders",
                  "TDI Partnership framework for families, staff, and care receivers",
                  "Ongoing consultation with Dr. Ethelle Lord and ICA experts",
                  "Access to ICA's global network of TDI Partners and resources",
                  "Marketing support to position your facility as a TDI Partner"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                     <span className="w-8 h-8 rounded-full bg-brand-deep-teal/10 text-brand-deep-teal flex items-center justify-center font-bold font-heading shrink-0">{i+1}</span>
                     <span className="font-bold text-brand-navy">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-5 bg-brand-navy text-white p-10 rounded-3xl shadow-2xl border border-brand-navy-light text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-brand-gold"></div>
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <LineChart className="text-brand-gold w-8 h-8" />
               </div>
               <h3 className="text-3xl font-bold font-heading mb-4">Ready to Transform Your Program?</h3>
               <p className="text-brand-light-gray mb-8 leading-relaxed">
                 Request a complimentary Preliminary Assessment. Our experts will evaluate your current dementia care program and show you exactly how the TDI Model can reduce turnover, improve outcomes, and position your organization as the leader in dementia care in your community.
               </p>
               <a href="https://icacares.com/ica-consulting" target="_blank" rel="noopener noreferrer" className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 text-lg shadow-lg mx-auto w-full">
                 Request Free Assessment <ArrowRight />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-12 text-center">Frequently Asked Questions<br/><span className="text-2xl text-brand-deep-teal">About the TDI Model</span></h2>
          <div className="space-y-6">
            {[
              {
                q: "What makes the TDI Model different from other dementia care models?",
                a: "Most dementia care models focus on behavior management, reducing or suppressing symptoms. The TDI Model focuses on understanding, it trains caregivers to understand the psychology of the dementia brain (Lord's Theory) and communicate in ways that are meaningful to the person experiencing it. This person-first approach reduces reactive behaviors organically, without reliance on medication or restraint."
              },
              {
                q: "Is the TDI Model accredited or recognized by any professional bodies?",
                a: "ICA certification programs are internationally recognized. The CFTDI and ATDIT programs have been implemented by care organizations across six continents. ICA is actively pursuing formal continuing education credit (CEU) accreditation through relevant professional bodies. Contact ICA for the most current accreditation information."
              },
              {
                q: "How long does it take to implement the TDI Model in a care facility?",
                a: "Implementation timelines vary depending on facility size, current staff training levels, and organizational readiness. Most facilities begin seeing measurable results within 90 days of beginning TDI certification training. Full organizational implementation (including staff certification, partnership structure, and cultural embedding) typically takes 6-12 months."
              },
              {
                q: "What does a TDI Partner facility look like from a family's perspective?",
                a: "Families with loved ones in TDI Partner facilities report greater confidence, better communication with staff, and reduced anxiety about their loved one's care. They are formally included in the care process, given access to TDI education, and kept informed through structured communication protocols. Most importantly, they see the difference in their loved one: less agitation, more positive interactions, greater dignity."
              },
              {
                q: "Can individual caregivers benefit from TDI, or is it only for organizations?",
                a: "Both. The CFTDI certification program ($335) is specifically designed for individual caregivers - family caregivers, home health aides, hospice workers, and anyone who provides care to a person living with dementia. The ATDIT Train-the-Trainer program ($3,400) enables professionals to bring TDI into their organizations. ICA also offers consulting sessions directly with Dr. Lord for families navigating a loved one's dementia diagnosis."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-brand-warm-white border border-gray-100 p-8 rounded-2xl transition-colors">
                <h4 className="text-xl font-bold font-heading text-brand-navy mb-4 flex gap-3">
                  <span className="text-brand-deep-teal font-black">Q:</span> {faq.q}
                </h4>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-brand-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold rounded-full mix-blend-multiply filter blur-[150px] opacity-20 hover:opacity-30 transition-opacity duration-1000"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-6xl font-bold font-heading mb-6">Start Your TDI Journey Today</h2>
          <p className="text-xl md:text-2xl text-brand-light-gray mb-16 leading-relaxed max-w-4xl mx-auto font-medium">
            Whether you are a family caregiver seeking better ways to connect with your loved one, a healthcare professional ready to deepen your dementia expertise, or an organizational leader determined to build the best memory care program in your community - the TDI Model meets you where you are and takes you where you need to go.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl flex flex-col hover:border-brand-gold/50 transition-colors">
               <Award className="w-12 h-12 text-brand-gold mb-6" />
               <h4 className="text-2xl font-bold mb-4 font-heading">Earn Your Certification</h4>
               <p className="text-brand-light-gray mb-8 font-medium">CFTDI - $335<br/>ATDIT - $3,400</p>
               <a href="https://icacares.com/ica-academy" target="_blank" rel="noopener noreferrer" className="mt-auto bg-brand-gold hover:bg-brand-gold-hover text-brand-navy text-center font-bold px-6 py-4 rounded-xl w-full transition-colors flex items-center justify-center gap-2">Enroll at Academy <ArrowRight size={18} /></a>
             </div>
             
             <div className="bg-brand-deep-teal/80 backdrop-blur-md border border-brand-soft-teal/30 p-8 rounded-3xl flex flex-col hover:border-brand-soft-teal transition-colors">
               <Globe2 className="w-12 h-12 text-white mb-6" />
               <h4 className="text-2xl font-bold mb-4 font-heading">Book a Free Call</h4>
               <p className="text-brand-light-gray mb-8 font-medium">30-min discovery session directly with Dr. Ethelle Lord</p>
               <a href="https://icacares.com/ica-consulting" target="_blank" rel="noopener noreferrer" className="mt-auto bg-white hover:bg-brand-warm-white text-brand-deep-teal text-center font-bold px-6 py-4 rounded-xl w-full transition-colors flex items-center justify-center gap-2">Schedule Call <ArrowRight size={18} /></a>
             </div>

             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl flex flex-col hover:border-white/40 transition-colors">
               <Building2 className="w-12 h-12 text-brand-soft-teal mb-6" />
               <h4 className="text-2xl font-bold mb-4 font-heading">Request Assessment</h4>
               <p className="text-brand-light-gray mb-8 font-medium">360° Org Evaluation for healthcare facilities & organizations</p>
               <a href="https://icacares.com/ica-consulting" target="_blank" rel="noopener noreferrer" className="mt-auto bg-brand-soft-teal hover:bg-[#3FA8A8] text-white text-center font-bold px-6 py-4 rounded-xl w-full transition-colors flex items-center justify-center gap-2">Evaluate Program <ArrowRight size={18} /></a>
             </div>
          </div>
          
          <div className="mt-24 pt-10 border-t border-white/10">
            <p className="font-bold tracking-widest uppercase text-brand-gold text-lg mb-2">International Caregivers Association LLC</p>
            <p className="text-brand-light-gray italic text-lg opacity-80">Setting the New Best Practice in Dementia Care</p>
            <a href="https://icacares.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-brand-soft-teal hover:text-white transition-colors">icacares.com</a>
          </div>
        </div>
      </section>
      
    </div>
  );
}
