import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

const stats = [
  { 
    id: '1', 
    value: 5, 
    suffix: '', 
    label: 'Continents We Touch',
    description: 'ICA brings a global vision that is embraced by caregiving partners around the world'
  },
  { 
    id: '2', 
    value: 21, 
    suffix: '+', 
    label: 'Years Experience',
    description: 'ICA was founded based on more than 21 years of in-depth caregiver experience by Dr. Ethelle Lord.'
  },
  { 
    id: '3', 
    value: 1, 
    suffix: '', 
    label: 'Fastest Growing',
    description: 'ICA is the fastest-growing association by introducing "Dementia Intelligence™" communication training that improves dementia care at all levels.'
  },
];

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    let start = 0;
    const end = value;
    const duration = 2000;
    const incrementTime = 30; // ms
    const totalSteps = duration / incrementTime;
    const stepValue = end / totalSteps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, inView]);

  return <span className="tabular-nums">{count}{suffix}</span>;
}

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-brand-navy py-12 border-b border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10"
        >
          {stats.map((stat: any, idx: number) => (
            <motion.div 
              key={stat.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="flex flex-col items-center justify-start pt-8 md:pt-0 px-4 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold font-heading text-brand-gold mb-3">
                <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
              </div>
              <div className="text-white text-lg font-bold mb-3 tracking-wide">
                {stat.label}
              </div>
              <div className="text-brand-muted-sage text-sm leading-relaxed max-w-xs mx-auto">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
