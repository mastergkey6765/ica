import { motion } from 'motion/react';
import { Video, Award, BookOpen, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import founderImage from '../../assets/images/Dr. lord.png';

export default function FounderSpotlight() {
  return (
    <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-deep-teal/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white/10">
              <img 
                src={founderImage} 
                alt="Dr. Ethelle Lord" 
                className="w-full h-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-brand-navy/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end gap-4">
                <div className="bg-brand-navy/80 p-4 rounded-xl backdrop-blur-md border border-white/10">
                  <h3 className="text-2xl font-bold font-heading mb-1 text-[#eaedf1] drop-shadow-md">Dr. Ethelle Lord</h3>
                  <p className="text-brand-gold font-medium drop-shadow-md">Founder, ICA & Creator of TDI™</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white text-brand-navy p-4 rounded-xl shadow-xl max-w-[200px] hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-brand-gold w-6 h-6" />
                <span className="font-bold text-sm leading-tight">Global Authority</span>
              </div>
              <p className="text-xs text-gray-500">Over 3 decades of transformative healthcare leadership.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight text-white">
                Meet the Architect of <br/><span className="text-brand-gold">Compassionate Care.</span>
              </h2>
              <p className="text-brand-muted-sage text-lg leading-relaxed mb-4">
                Dr. Ethelle Lord brings unparalleled academic rigor and deeply personal experience to the global dementia crisis. Recognizing that the medical model alone was insufficient, she pioneered the Transactional Dementia Intelligence™ Model (TDIM).
              </p>
              <p className="text-brand-muted-sage text-lg leading-relaxed">
                Her mission is straightforward: empower family caregivers, certify dementia coaches, train healthcare professionals, and structurally optimize senior living communities to restore dignity and reduce turnover/burnout globally while increasing the ROI.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <BookOpen className="w-5 h-5 text-brand-soft-teal mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Author & Speaker</h4>
                  <p className="text-brand-muted-sage text-xs">Transformative insights on care models.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <Video className="w-5 h-5 text-brand-soft-teal mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Global Consultant</h4>
                  <p className="text-brand-muted-sage text-xs">Advising top healthcare organizations.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <a 
                href="https://meetings.hubspot.com/ethelle"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold px-6 py-3.5 rounded-full transition-all text-sm sm:text-base"
              >
                Book a Consultation
              </a>
              <Link 
                to="/dr-lord"
                className="inline-flex justify-center items-center gap-2 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white font-medium px-6 py-3 rounded-full transition-all text-sm sm:text-base"
              >
                Learn more about Dr. Lord
              </Link>
              <a 
                href="https://www.linkedin.com/in/ethellelord/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white font-medium px-6 py-3.5 rounded-full transition-all text-sm sm:text-base"
              >
                <Linkedin size={20} className="fill-current" />
                LinkedIn
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
