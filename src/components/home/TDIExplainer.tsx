import { motion } from 'motion/react';
import { ArrowRight, MessageCircleHeart, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    icon: <MessageCircleHeart className="w-6 h-6 text-brand-navy" />,
    title: "Communication",
    description: <>Rebuilding connection without relying purely on cognitive&nbsp;memory.</>
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-brand-navy" />,
    title: "Dignity",
    description: <>Respecting the adult experience and preserving their identity at all&nbsp;times.</>
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-brand-navy" />,
    title: "Trust",
    description: <>Establishing safe environments through consistent, calm&nbsp;interactions.</>
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-navy" />,
    title: "Reducing Burnout",
    description: <>Equipping caregivers with predictable frameworks to lower daily&nbsp;friction.</>
  }
];

export default function TDIExplainer() {
  return (
    <section className="py-24 bg-brand-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Abstract decorative shapes */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-soft-teal/20 to-brand-gold/20 rounded-3xl blur-xl opacity-50"></div>
              
              <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                  <div>
                    <h4 className="text-xl font-heading font-bold text-brand-deep-teal mb-1">Traditional Care</h4>
                    <p className="text-sm text-gray-500">Task-focused, behavioral correction</p>
                  </div>
                  <ArrowRight className="text-gray-300 w-6 h-6" />
                  <div className="text-right">
                    <h4 className="text-xl font-heading font-bold text-brand-gold mb-1">TDI™ Model</h4>
                    <p className="text-sm text-gray-500">Connection-focused, emotional validation</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {pillars.map((pillar, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-warm-white flex items-center justify-center flex-shrink-0 border border-gray-100">
                        {pillar.icon}
                      </div>
                      <div>
                        <h5 className="font-bold text-brand-navy mb-1">{pillar.title}</h5>
                        <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 space-y-6"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand-muted-sage text-brand-deep-teal text-xs font-semibold tracking-wider uppercase mb-2">
              Our Methodology
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-brand-navy leading-tight">
              Transactional Dementia Intelligence™ (TDI)
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed pb-4">
              The TDI Model is a groundbreaking system's approach to dementia care that changes the way dementia care is managed and delivered. It shifts the paradigm from merely managing behaviors to proactively shaping emotional intelligence and meaningful connections.
            </p>
            <p className="text-base text-gray-600 leading-relaxed pb-6">
              By focusing on restoring dignity and teaching practical, actionable communication techniques, we dramatically reduce caregiver stress and elevate the quality of life for those living with Alzheimer's and dementia.
            </p>
            
            <Link 
              to="/tdi-model"
              className="inline-flex items-center gap-2 text-brand-deep-teal font-semibold hover:text-brand-soft-teal transition-colors text-lg group"
            >
              Learn the TDI Model in detail
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
