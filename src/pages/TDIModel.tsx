import { motion } from "motion/react";
import {
  Users,
  Heart,
  Shield,
  Briefcase,
  Smile,
  GraduationCap,
  TrendingDown,
  Pill,
  TrendingUp,
  Search,
  BookOpen,
  Award,
  Quote,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function TDIModel() {
  useEffect(() => {
    document.title =
      "Transactional Dementia Intelligence (TDI Model) | Premier Dementia Treatment Program";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "The TDI Model by ICA is a revolutionary re-imagining of dementia care, offering the premier dementia treatment program through specialized caregiver training and personalized partnerships.",
      );
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content =
        "The TDI Model by ICA is a revolutionary re-imagining of dementia care, offering the premier dementia treatment program through specialized caregiver training and personalized partnerships.";
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="w-full">
      {/* 1. H1 + Core Value Statement */}
      <section className="pt-32 pb-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-soft-teal rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-brand-deep-teal/20 border border-brand-soft-teal/30 text-brand-soft-teal px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6"
          >
            The Premium Dementia Management Program
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6"
          >
            Transactional Dementia Intelligence™ Model (TDIM)
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-light-gray max-w-4xl mx-auto font-medium"
          >
            A Revolutionary Re-imagining of Dementia Care. We transform
            organizational culture through deep dementia intelligence,
            formalized partnerships, and individualized care.
          </motion.p>
        </div>
      </section>

      {/* 2. Business Case */}
      <section className="py-20 bg-brand-warm-white bg-opacity-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy mb-4">
              The Business Case for TDIM
            </h2>
            <p className="text-lg text-gray-600">
              Great management leads to great results. The TDIM boosts the
              value of your facility by revolutionizing the organizational
              culture from the top down.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-brand-muted-sage/20 text-center"
            >
              <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-navy">
                <TrendingDown size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">
                Turnover Reduction
              </h3>
              <p className="text-gray-600">
                Built-in retention incentives, clear role definitions, dementia coach, and
                reduced staff stress lead to significantly higher job
                satisfaction and lower turnover rates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-brand-muted-sage/20 text-center"
            >
              <div className="w-16 h-16 bg-brand-soft-teal/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-deep-teal">
                <Pill size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">
                Medication Reduction
              </h3>
              <p className="text-gray-600">
                By emphasizing deep dementia intelligence™ to minimize reactive
                behaviors, care services and facilities see a marked decrease in the reliance on
                pharmaceutical interventions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-brand-muted-sage/20 text-center"
            >
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">
                Occupancy Increase
              </h3>
              <p className="text-gray-600">
                Distinguish your organization in local markets as a TDIM
                Partner. Providing a higher quality of life naturally attracts
                new families seeking premium care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. How TDI Works */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#f1f1f2] mb-6">
              How the TDI Model Works
            </h2>
            <p className="text-lg text-brand-light-gray/80">
              A proven implementation pathway for total culture transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl h-full backdrop-blur-sm">
                <div className="text-brand-gold mb-6">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">1. Assess</h3>
                <p className="text-brand-light-gray/70 text-sm">
                  We conduct a comprehensive preliminary assessment of your
                  current dementia care structures and organizational culture.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-brand-gold/30"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl h-full backdrop-blur-sm">
                <div className="text-brand-gold mb-6">
                  <BookOpen size={40} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">2. Train</h3>
                <p className="text-brand-light-gray/70 text-sm">
                  Staff across all roles receive specialized training in
                  dementia intelligence™, creating tailored connections with each
                  care receiver, and a Dementia Coach present at every location.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-brand-gold/30"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl h-full backdrop-blur-sm">
                <div className="text-brand-gold mb-6">
                  <Award size={40} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  3. Certify
                </h3>
                <p className="text-brand-light-gray/70 text-sm">
                  A key staff earns certification as a Dementia Coach to facilitate
                  coordination, bridge gaps, train, provide peer and family support.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-brand-gold/30"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-brand-deep-teal/20 border border-brand-soft-teal/30 p-8 rounded-2xl h-full backdrop-blur-sm">
                <div className="text-brand-soft-teal mb-6">
                  <Shield size={40} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  4. Sustain
                </h3>
                <p className="text-brand-light-gray/70 text-sm">
                  Maintain quality through formalized partnerships, ongoing
                  accountability, performance evaluations, and a unified care realm.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Mid-page CTA */}
      <section className="bg-brand-gold py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-navy">
            Ready to transform your organization's approach?
          </h2>
          <Link
            to="/assessment"
            className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-lg"
          >
            Request a Preliminary Assessment
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* 4. Who Benefits (4-column grid) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6">
              Who Benefits from the TDI Model System Approach?
            </h2>
            <p className="text-lg text-gray-600">
              A holistic approach that transforms outcomes for all stakeholders
              in the care ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-warm-white p-8 rounded-2xl border border-gray-100 flex flex-col h-full"
            >
              <Briefcase className="w-10 h-10 text-brand-navy mb-6" />
              <h3 className="text-xl font-bold text-brand-navy mb-3">
                Administrators
              </h3>
              <p className="text-gray-600 text-sm flex-grow mb-6">
                Gain a comprehensive new structure focused on communication and
                formalized partnerships, reducing costs associated with turnover
                and liability.
              </p>
              <div className="mt-auto bg-white p-4 rounded-xl border border-brand-navy/10">
                <p className="text-sm font-bold text-brand-deep-teal flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                  Outcome: Enhanced marketability and dramatically reduced staff
                  turnover costs.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-brand-warm-white p-8 rounded-2xl border border-gray-100 flex flex-col h-full"
            >
              <GraduationCap className="w-10 h-10 text-brand-soft-teal mb-6" />
              <h3 className="text-xl font-bold text-brand-navy mb-3">Staff</h3>
              <p className="text-gray-600 text-sm flex-grow mb-6">
                Clearly defined roles and greater teamwork through your Dementia Coach means staff feel valued, trained, empowered, and find more meaning in their work.
              </p>
              <div className="mt-auto bg-white p-4 rounded-xl border border-brand-navy/10">
                <p className="text-sm font-bold text-brand-soft-teal flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                  Outcome: Noticeably reduced stress levels and increased job
                  satisfaction.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-brand-warm-white p-8 rounded-2xl border border-gray-100 flex flex-col h-full"
            >
              <Smile className="w-10 h-10 text-brand-gold mb-6" />
              <h3 className="text-xl font-bold text-brand-navy mb-3">
                Residents
              </h3>
              <p className="text-gray-600 text-sm flex-grow mb-6">
                Receive personalized care centered on their unique realities. Dementia intelligence™ trained staff prioritize understanding their inner world over simple behavioral management.
              </p>
              <div className="mt-auto bg-white p-4 rounded-xl border border-brand-navy/10">
                <p className="text-sm font-bold text-brand-gold flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                  Outcome: Minimized confusion, higher dignity, and sustained
                  comfort.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-brand-warm-white p-8 rounded-2xl border border-gray-100 flex flex-col h-full"
            >
              <Heart className="w-10 h-10 text-rose-500 mb-6" />
              <h3 className="text-xl font-bold text-brand-navy mb-3">
                Families
              </h3>
              <p className="text-gray-600 text-sm flex-grow mb-6">
                Welcomed as true partners. Open communication and the option to volunteer for dementia intelligence™ training to become part of the care team.
              </p>
              <div className="mt-auto bg-white p-4 rounded-xl border border-brand-navy/10">
                <p className="text-sm font-bold text-rose-500 flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                  Outcome: Overwhelming relief and confidence that their loved
                  one is understood.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Lord's Theory & 6. The TDI Partnership */}
      <section className="py-24 bg-brand-light-gray/50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-heading text-brand-navy mb-6">
                Dr. Lord's Transactional Theory
              </h2>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-muted-sage/20 relative">
                <Quote className="absolute top-4 right-4 text-brand-gold/20 w-16 h-16" />
                <p className="text-gray-700 leading-relaxed text-lg relative z-10 italic">
                  "Healthcare leaders have created a culture which does not have the structures, processes, or been able to retain people with the needed mindsets to support their LTC services. The Transactional Dementia Intelligence™ Model is a system approach designed with built-in structures, processes, and retention incentives to revolutionize the entire organization."
                </p>
                <p className="text-brand-gold font-bold mt-4 relative z-10 text-right">
                  - Dr. Ethelle Lord
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-navy text-white mb-6">
                <Users size={32} />
              </div>
              <h2 className="text-3xl font-bold font-heading text-brand-navy mb-6">
                The TDI Partnership
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Becoming a TDI Partner means leaving behind fragmented, failing, traditional models in favor of a formalized, cohesive network. The TDIM creates structural partnerships between administrators, professional caregivers, Dementia Coaches, staff and family members. 
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-deep-teal/20 text-brand-deep-teal flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-gray-700">
                    <strong>Unified Communication:</strong> Breaking down silos so every stakeholder is heard and closing the gap with a dedicated dementia coach.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-deep-teal/20 text-brand-deep-teal flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-gray-700">
                    <strong>Mutual Support:</strong> Dementia Coaches provide ongoing peer guidance for staff and outreach to families.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-deep-teal/20 text-brand-deep-teal flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-gray-700">
                    <strong>Market Distinction:</strong> Immediate recognition as a facility equipped to provide premium, humanitarian-driven care.
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Bottom CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-8">
            Take the First Step Toward Transformation
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Discover how the TDI Model, a groundbreaking model of care to elevate your organization's care delivery, staff retention, and economic viability.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold px-10 py-5 rounded-full transition-all shadow-xl text-lg hover:shadow-2xl hover:-translate-y-1"
          >
            Schedule a Consultation with Dr. Lord
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
