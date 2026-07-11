import { motion } from 'motion/react';
import { User, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TwoPathsSection() {
  return (
    <section className="py-20 bg-brand-light-gray relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy mb-4">
            How Can We Help You Today?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your learning path. We provide specialized resources whether you're looking after a loved one, or managing a large healthcare team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Individual Caregiver Path */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-white rounded-3xl p-8 lg:p-12 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-brand-soft-teal/30 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-soft-teal/5 rounded-bl-[100px] z-0 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10 mb-8">
              <div className="w-16 h-16 bg-brand-soft-teal/10 rounded-2xl flex items-center justify-center text-brand-soft-teal mb-6 group-hover:-translate-y-1 transition-transform">
                <User size={32} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold font-heading text-brand-navy mb-4">
                I'm an Individual Caregiver
              </h3>
              <p className="text-gray-600 leading-relaxed min-h-[80px]">
                Enhance your skills with our specialized TDI training. Perfect for family members, independent nurses, and personal care assistants looking to provide the best possible support.
              </p>
            </div>
            
            <div className="mt-auto relative z-10 pt-4">
              <Link 
                to="/training"
                className="inline-flex items-center gap-2 text-brand-deep-teal font-semibold group/btn"
              >
                Explore Training Programs 
                <span className="w-8 h-8 rounded-full bg-brand-muted-sage flex items-center justify-center group-hover/btn:bg-brand-deep-teal group-hover/btn:text-white transition-colors">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Care Organization Path */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group bg-brand-navy rounded-3xl p-8 lg:p-12 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-brand-gold/30 relative overflow-hidden flex flex-col h-full text-white"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-deep-teal/20 rounded-bl-[100px] z-0 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10 mb-8">
              <div className="w-16 h-16 bg-brand-deep-teal/30 rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:-translate-y-1 transition-transform">
                <Building2 size={32} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold font-heading text-white mb-4">
                I Lead a Care Organization
              </h3>
              <p className="text-brand-light-gray/80 leading-relaxed min-h-[80px]">
                Transform your facility's approach to dementia care. Our enterprise solutions equip your entire staff with consistent, practical, and effective TDI communication strategies.
              </p>
            </div>
            
            <div className="mt-auto relative z-10 pt-4">
              <Link 
                to="/enterprise"
                className="inline-flex items-center gap-2 text-brand-gold font-semibold group/btn"
              >
                Explore Enterprise Solutions
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-brand-gold group-hover/btn:text-brand-navy transition-colors">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
