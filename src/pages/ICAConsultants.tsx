import { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Globe2, 
  AlertTriangle, 
  ShieldCheck, 
  Briefcase, 
  Network, 
  GraduationCap, 
  HeartHandshake, 
  Settings,
  Users,
  Building,
  Target,
  ArrowRight,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ICAConsultants() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ICA Consultants | Training and Certification";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'The International Caregivers Association LLC has pioneered a fundamental shift from traditional medical and rehabilitation models to a comprehensive social and wellbeing model of care.');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = "The International Caregivers Association LLC has pioneered a fundamental shift from traditional medical and rehabilitation models to a comprehensive social and wellbeing model of care.";
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="w-full bg-brand-warm-white bg-opacity-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-soft-teal rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-brand-deep-teal/20 border border-brand-soft-teal/30 text-brand-soft-teal px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6"
          >
            Organizational Leadership
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 max-w-4xl mx-auto leading-tight"
          >
            ICA Training and System Approach
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-light-gray max-w-3xl mx-auto font-medium"
          >
            A fundamental shift from traditional medical and rehabilitation models to a comprehensive social and wellbeing model of care.
          </motion.p>
        </div>
      </section>

      {/* Crisis & Challenges */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-warm-white p-10 rounded-3xl border border-gray-100"
            >
              <div className="w-14 h-14 bg-brand-navy/5 rounded-2xl flex items-center justify-center text-brand-navy mb-6">
                <Globe2 size={28} />
              </div>
              <h2 className="text-2xl font-bold font-heading text-brand-navy mb-4">The Global Dementia Crisis</h2>
              <p className="text-gray-700 leading-relaxed">
                We face an unprecedented global crisis that remains largely invisible to most people. Dementia cases worldwide are projected to triple by 2050, making it one of the leading causes of death globally with no current cure available. This represents a demographic tsunami that societies across the world are unprepared to handle and financially afford.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-brand-warm-white p-10 rounded-3xl border border-gray-100"
            >
              <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
                <AlertTriangle size={28} />
              </div>
              <h2 className="text-2xl font-bold font-heading text-brand-navy mb-4">Current System Challenges</h2>
              <p className="text-gray-700 leading-relaxed">
                The gap between alarming projections and actual readiness creates multiple pressure points: families struggling with caregiver burnout, fragmented care delivery systems, and mounting financial stress that often reaches crisis levels. Organizations across all sectors lack the frameworks and support structures needed to address workforce readiness and dementia's growing challenge effectively.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The ICA Evolution */}
      <section className="py-24 bg-brand-light-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6">The ICA Evolution: From Medical to Social Model</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The International Caregivers Association LLC has pioneered a fundamental shift from traditional medical and rehabilitation models to a comprehensive social and wellbeing model of care. At the heart of this transformation is the Transactional Dementia Intelligence (TDI) business model, a systems approach that addresses dementia care holistically.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Central to this model is a certified dementia coach and Lord's Theory: The Psychology of the Dementia Brain, which forms the foundation of our accredited certification programs and provides evidence-based frameworks for understanding and responding to dementia-related challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Portfolio */}
      <section className="py-24 bg-brand-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white">Comprehensive Solution Portfolio</h2>
            <p className="text-lg text-brand-light-gray/80">The ICA offers a complete ecosystem of solutions addressing prevention, intervention, and long-term care needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl h-full backdrop-blur-sm hover:bg-white/10 transition-colors">
                <ShieldCheck className="text-brand-soft-teal w-12 h-12 mb-6" />
                <h3 className="text-xl font-bold mb-4 text-white">Prevention & Early Intervention</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-0.5">٭</span>
                    <span className="text-brand-light-gray/80">Preventative measures for individuals and younger generations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-0.5">٭</span>
                    <span className="text-brand-light-gray/80">Early detection and diagnosis guidance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-0.5">٭</span>
                    <span className="text-brand-light-gray/80">Proactive wellness strategies</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl h-full backdrop-blur-sm hover:bg-white/10 transition-colors">
                <GraduationCap className="text-brand-gold w-12 h-12 mb-6" />
                <h3 className="text-xl font-bold mb-4 text-white">Professional Development & Training</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-0.5">٭</span>
                    <span className="text-brand-light-gray/80">Caregiver burnout prevention training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-0.5">٭</span>
                    <span className="text-brand-light-gray/80">Dementia Coach certification programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-0.5">٭</span>
                    <span className="text-brand-light-gray/80">Policy and workplace guidance frameworks</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl h-full backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Settings className="text-brand-deep-teal w-12 h-12 mb-6" />
                <h3 className="text-xl font-bold mb-4 text-white">System Building & Implementation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-0.5">٭</span>
                    <span className="text-brand-light-gray/80">Coalition-building approaches across sectors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-0.5">٭</span>
                    <span className="text-brand-light-gray/80">Practical playbooks and implementation tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-0.5">٭</span>
                    <span className="text-brand-light-gray/80">Cultural, regional, and global care consortia</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engagement Channels Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-brand-navy mb-4">The ICA provides actionable solutions through multiple engagement channels</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Speaking Engagements", desc: "Evidence-based presentations that drive organizational change", icon: <Users size={24} /> },
              { title: "Policy Development", desc: "Comprehensive caregiver-support policy frameworks", icon: <Briefcase size={24} /> },
              { title: "Professional Training", desc: "Dementia Coach certification for organizational leaders", icon: <GraduationCap size={24} /> },
              { title: "Care Networks", desc: "Regional and global consortia connecting stakeholders", icon: <Network size={24} /> },
              { title: "Family Solutions", desc: "Enhanced homecare, home health, and adult day services", icon: <HeartHandshake size={24} /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-brand-warm-white p-6 rounded-2xl text-center border border-gray-100 hover:shadow-lg transition-shadow bg-opacity-70 flex flex-col items-center h-full"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-deep-teal shadow-sm mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision for 2030 */}
      <section className="py-24 bg-brand-light-gray relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6">Vision for 2030: From Crisis to Resilience</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                By 2030, the ICA envisions a fundamental transformation in how global societies approach dementia care. The Transactional Dementia Intelligence system will be integrated across home, community, and institutional care settings. This includes:
              </p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-brand-deep-teal mb-4 flex items-center gap-3">
                    <Building className="text-brand-gold" />
                    Professional Transformation
                  </h3>
                  <ul className="space-y-2 text-gray-700 font-medium">
                    <li className="flex items-start gap-2">
                       <ArrowRight size={16} className="text-brand-deep-teal mt-1 shrink-0" />
                       Dementia Coach established as a recognized profession at management levels
                    </li>
                    <li className="flex items-start gap-2">
                       <ArrowRight size={16} className="text-brand-deep-teal mt-1 shrink-0" />
                       Certified nursing assistants elevated from jobs to careers with professional status
                    </li>
                    <li className="flex items-start gap-2">
                       <ArrowRight size={16} className="text-brand-deep-teal mt-1 shrink-0" />
                       Collaborative ecosystems supported by the ICA's mission and vision
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-brand-deep-teal mb-4 flex items-center gap-3">
                    <Network className="text-brand-gold" />
                    System Integration
                  </h3>
                  <ul className="space-y-2 text-gray-700 font-medium">
                    <li className="flex items-start gap-2">
                       <ArrowRight size={16} className="text-brand-deep-teal mt-1 shrink-0" />
                       Seamless coordination between home, community, and facility-based services
                    </li>
                    <li className="flex items-start gap-2">
                       <ArrowRight size={16} className="text-brand-deep-teal mt-1 shrink-0" />
                       Prevention-focused rather than crisis-reactive care models
                    </li>
                    <li className="flex items-start gap-2">
                       <ArrowRight size={16} className="text-brand-deep-teal mt-1 shrink-0" />
                       Sustainable financial frameworks that reduce costs while improving outcomes
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
               <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col gap-6 relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[100px] -z-0"></div>
                 <h3 className="text-2xl font-bold font-heading text-brand-navy z-10">The Paradigm Shift</h3>
                 <p className="text-gray-700 leading-relaxed z-10">
                   We are moving decisively away from crisis management that results in burnout, higher costs, and poor quality of care and life for everyone involved. Instead, we're building resilience-based systems that support all stakeholders, including families, caregivers, organizations, and communities, in creating sustainable, dignified, and effective responses to dementia care needs.
                 </p>
                 <p className="text-gray-700 leading-relaxed font-bold z-10">
                   The time for incremental change has passed. The Transactional Dementia Intelligence business model offers a roadmap for the comprehensive transformation our aging society urgently requires.
                 </p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Quote */}
      <section className="py-24 bg-brand-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Quote className="w-16 h-16 text-brand-gold mx-auto mb-8 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-heading font-medium leading-relaxed mb-8 italic text-white">
            "You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete."
          </h2>
          <p className="text-brand-gold font-bold text-xl">- R. Buckminster Fuller</p>
          <div className="mt-16 flex flex-col items-center justify-center gap-4">
             <div className="flex items-center justify-center space-x-2 text-2xl font-heading font-bold">
               <span className="text-brand-gold text-3xl font-black">T</span>
               <span className="text-brand-soft-teal text-3xl font-black">D</span>
               <span className="text-white text-3xl font-black">I</span>
             </div>
             <span className="text-xs uppercase tracking-[0.2em] text-brand-light-gray opacity-70">Transactional Dementia Intelligence</span>
          </div>
        </div>
      </section>
    </div>
  );
}
