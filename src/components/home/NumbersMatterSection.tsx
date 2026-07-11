import { motion } from 'motion/react';
import { 
  Globe2, 
  DollarSign, 
  Brain, 
  Activity, 
  TrendingUp, 
  HelpCircle, 
  BarChart3, 
  Clock, 
  Map,
  ExternalLink
} from 'lucide-react';

const statsData = [
  {
    title: "Global Prevalence",
    description: "Over 60 million people worldwide are living with dementia.",
    icon: Globe2
  },
  {
    title: "Cost of Care",
    description: "Globally, dementia care costs exceed $1.3 trillion USD annually.",
    icon: DollarSign
  },
  {
    title: "Most Common Form",
    description: "Alzheimer's disease is the most common type of dementia followed by Vascular Dementia (VaD).",
    icon: Brain
  },
  {
    title: "Leading Cause of Death",
    description: "Dementia is the seventh leading cause of death worldwide.",
    icon: Activity
  },
  {
    title: "New Cases",
    description: "Nearly 10 million new cases of dementia are diagnosed each year.",
    icon: TrendingUp
  },
  {
    title: "Undiagnosed",
    description: "Up to three-quarters of people with dementia worldwide have not received a diagnosis.",
    icon: HelpCircle
  },
  {
    title: "Projected Increase",
    description: "The number of people with dementia is expected to reach 78 million by 2030 and 139 million by 2050.",
    icon: BarChart3
  },
  {
    title: "Age-Related Increase",
    description: "The percentage of people with Alzheimer's dementia increases with age: 5% of those aged 65-74; 13% of those aged 75-84; and 33% of those aged 85 and older.",
    icon: Clock
  },
  {
    title: "Geographic Distribution",
    description: "While dementia affects all regions, the greatest increases in prevalence occur in low and middle-income countries, particularly in China, India, and their South Asian neighbors.",
    icon: Map
  }
];

export default function NumbersMatterSection() {
  return (
    <section className="py-24 bg-brand-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-brand-navy mb-6"
          >
            Why Numbers Matter
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Understanding the scope of dementia is crucial to recognizing the urgent need for better caregiving strategies and support worldwide.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-brand-muted-sage/30 flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-brand-soft-teal/10 rounded-xl flex items-center justify-center text-brand-deep-teal mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold font-heading text-brand-navy mb-3">
                  {stat.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 inline-flex items-center justify-center gap-2">
            Source: 
            <a 
              href="https://www.brightfocus.org/alzheimers/facts-figures/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-deep-teal hover:text-brand-soft-teal font-medium hover:underline inline-flex items-center gap-1 transition-colors"
            >
              BrightFocus Foundation <ExternalLink size={14} />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
