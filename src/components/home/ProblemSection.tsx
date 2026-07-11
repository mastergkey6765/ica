import { motion } from "motion/react";
import { TrendingUp, Users, HeartPulse, Activity } from "lucide-react";

const facts = [
  {
    icon: <Users className="w-8 h-8 text-brand-soft-teal" />,
    stat: "55 Million+",
    text: "Living with dementia globally, projected to reach 139M by 2050.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-brand-soft-teal" />,
    stat: "10 Million",
    text: "New cases diagnosed every single year worldwide.",
  },
  {
    icon: <Activity className="w-8 h-8 text-brand-soft-teal" />,
    stat: "$346 Billion",
    text: "Value of unpaid dementia caregiving provided in 2023 alone.",
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-brand-soft-teal" />,
    stat: "Burnout Crisis",
    text: "Caregivers face unprecedented levels of emotional and physical exhaustion.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-light-gray opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-muted-sage opacity-30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-soft-teal font-semibold tracking-wide uppercase text-sm block mb-4">
            The Global Challenge
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-brand-navy mb-6 leading-tight">
            A Rising Global Crisis Demands New Solutions
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Traditional caregiving models are failing to meet the immense
            emotional, financial, and physiological needs of families and
            professionals today. It's time for a transformative approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
              className="bg-brand-warm-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm border border-gray-50 group-hover:scale-110 transition-transform duration-300">
                {fact.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading text-brand-deep-teal mb-3">
                {fact.stat}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {fact.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
