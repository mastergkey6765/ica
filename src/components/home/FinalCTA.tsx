import { motion } from 'motion/react';
import { ArrowRight, PhoneCall, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-brand-warm-white relative overflow-hidden">
      {/* Decorative center piece */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-muted-sage/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-[90rem] w-full mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-brand-deep-teal rounded-[40px] p-8 md:p-16 shadow-2xl overflow-hidden relative"
        >
          {/* Internal gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/60 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 leading-tight">
              You Don't Have to Navigate Dementia Care <span className="text-brand-gold">Alone.</span>
            </h2>
            <p className="text-brand-muted-sage text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
              Join the fastest-growing global association dedicating to transforming care through compassionate intelligence and proven communication strategies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link 
                to="/join-ica"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold px-8 py-4 rounded-full transition-all text-lg shadow-lg hover:-translate-y-0.5"
              >
                Join ICA
                <ArrowRight size={20} />
              </Link>
              
              <a 
                href="https://meetings.hubspot.com/ethelle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white font-medium px-8 py-3.5 rounded-full transition-all text-lg"
              >
                <PhoneCall size={20} />
                Book a Consultation
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-brand-muted-sage text-sm">
              <Users size={16} />
              <span>Join over 10,000+ caregivers and professionals globally.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
