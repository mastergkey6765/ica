import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "My time spent in consultation with Dr. Lord more than paid for itself, many times over, in giving me breakthrough insights into my reaching core goals.",
    name: "Ryan Stoffko",
    role: "CEO, OPP Neuro SPA",
  },
  {
    quote: "I know it's only one day but such a simple recommendation has made an incredible difference already to both of us! Thank you from the bottom of my heart!",
    name: "P.J.M.",
    role: "Netherlands",
  },
  {
    quote: "I've also learned since talking to you that my hands on his cheeks and looking into his eyes really brings him right back to me. I'm looking forward to getting smarter as I progress with your course.",
    name: "Dementia coaching client",
    role: "Netherlands",
  },
  {
    quote: "Ethelle is my guide to understanding a misunderstood disease (Alzheimer's)",
    name: "Doug Hines, Phd",
    role: 'Author of "The Perfect Coach"',
  },
  {
    quote: "Dr Lord's dedication to persons living with dementia and their caregivers is tremendous. Her knowledge is priceless and provides hope for many.",
    name: "Alan Krechting",
    role: "Professional Coaching Client",
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-warm-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center flex flex-col items-center justify-center mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-4 w-full max-w-[864px] h-[156px] flex items-center justify-center">
            Hear From Those Who Transformed Their Care<br/>
            With Dementia Intelligence™
          </h2>
          <p className="text-gray-600 text-lg">
            Real stories from organizations, professionals, and family caregivers.
          </p>
        </div>

        <div className="relative flex overflow-hidden group py-4 pointer-events-auto w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {[...Array(2)].map((_, arrayIdx) => (
            <div key={arrayIdx} className="flex animate-marquee shrink-0 gap-8 px-4 pl-8" aria-hidden={arrayIdx === 1 ? 'true' : 'false'}>
              {testimonials.map((t, idx) => (
                <div
                  key={`t-${idx}`}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col relative w-[350px] md:w-[450px] shrink-0 hover:-translate-y-1 transition-transform duration-300"
                >
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-muted-sage opacity-50" />
                  <div className="flex-grow pt-4">
                    <p className="text-gray-700 leading-relaxed font-medium mb-8 relative z-10 text-lg">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-14 h-14 rounded-full bg-brand-navy/10 text-brand-navy flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-brand-navy truncate">{t.name}</h4>
                      <p className="text-brand-soft-teal text-sm font-medium truncate">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
