import { motion } from 'motion/react';
import { Building2, TrendingDown, Heart, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: <TrendingDown className="w-8 h-8 text-brand-gold" />,
    title: "Dramatically Reduce Turnover",
    description: "Provide your staff with tools that actually work, reducing their frustration, emotional exhaustion and ROI naturally improves."
  },
  {
    icon: <Heart className="w-8 h-8 text-brand-gold" />,
    title: "Improve Resident Outcomes",
    description: "Foster an environment of trust and dignity, leading to calmer residents and fewer behavioral incidents."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-brand-gold" />,
    title: "Optimize Your Culture",
    description: "Shift from task-oriented management to connection-oriented care, from medical to social care,  across your entire organization. Naturally stand ahead of your competition."
  }
];

export default function EnterpriseSection() {
  return (
    <section className="py-24 bg-brand-deep-teal relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V0H40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
              <Building2 size={16} className="text-brand-gold" />
              B2B Healthcare Consulting
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6 leading-tight">
              Transform Your Organization's Standard of Care
            </h2>
            <p className="text-brand-muted-sage text-lg leading-relaxed mb-8">
              For senior living communities, care homes, and healthcare organizations, the TDI Model isn't just about compassion, it's a critical business growth advantage. By introducing a certified dementia coach in your organizational chart, we help you fix staff retention, training, family conflicts/grief, and operational friction.
            </p>
            
            <a 
              href="https://meetings.hubspot.com/ethelle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold px-8 py-4 rounded-lg shadow-lg transition-all"
            >
              Schedule an Enterprise Consultation
              <ArrowRight size={20} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl flex gap-6 hover:bg-white/15 transition-colors">
                <div className="flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white mb-2">{benefit.title}</h3>
                  <p className="text-brand-muted-sage text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
