import { motion } from 'motion/react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import heroBg from '../../assets/images/hero image.png';

export default function HeroSection() {
  useEffect(() => {
    // Dynamically add a preload link for the heroic background to prioritize it further.
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroBg;
    // @ts-ignore - fetchpriority is relatively new and might not be in standard DOM types yet
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-warm-white">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 bg-brand-navy">
        <img 
          src={heroBg} 
          alt="Compassionate caregiver with elderly person" 
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-transparent"></div>
        {/* Mobile secondary gradient for readability */}
        <div className="absolute inset-0 bg-brand-navy/60 md:hidden"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 lg:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block py-1.5 px-4 rounded-full bg-brand-soft-teal/20 text-brand-soft-teal border border-brand-soft-teal/30 font-medium text-sm mb-6 tracking-wide uppercase">
              International Caregivers Association LLC
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white leading-tight mb-6">
              Setting the New Best Practice in <span className="text-brand-gold">Dementia & Alzheimer's</span> Care.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl text-brand-light-gray/90 leading-relaxed mb-10 max-w-2xl font-light">
              We're revolutionizing dementia care with the Transactional Dementia Intelligence™ Model (TDIM) in all settings (homecare, day care, assisted living and skilled nursing). Introducing a new method of dementia communication that reduces stress and anxiety.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <Link 
              to="/training#popular-programs"
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <span>Explore Training Programs</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a 
              href="https://meetings.hubspot.com/ethelle"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white font-bold px-8 py-3.5 rounded-full transition-all backdrop-blur-sm"
            >
              <PhoneCall size={20} />
              <span>Book a Free 15-Min Call</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
