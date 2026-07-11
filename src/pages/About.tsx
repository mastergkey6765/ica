import { motion } from 'motion/react';
import { Target, Eye, Globe2, BookOpen, Users, Building, Heart, ArrowRight, Lightbulb, Users2, Activity, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ourStoryImg from '../assets/images/regenerated_image_1779795176336.jpg';

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-deep-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-soft-teal/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 leading-tight">
              About the International<br/>Caregivers Association
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl text-brand-light-gray max-w-3xl mx-auto leading-relaxed">
              Transforming Dementia Care Through the TDI Model
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="py-24 bg-brand-warm-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-brand-gold rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy">
                  Our Story
                </h2>
              </div>

              <h3 className="text-2xl font-serif text-brand-deep-teal mb-6">
                From Personal Crisis to Global Movement
              </h3>
              
              <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
                <p>The International Caregivers Association LLC (ICA) was founded in 2009 by Dr. Ethelle Lord after two decades of firsthand caregiving experience transformed her understanding of what people living with dementia truly need. When her husband, Major Larry S. Potter, USAF (Ret.), was diagnosed with Vascular Dementia, Dr. Lord discovered critical systemic failures in how the healthcare system approaches dementia care, failures that left families isolated, caregivers burned out, and people with dementia stripped of dignity.</p>
                <p>What began as one caregiver's determination to do better became a global organization serving healthcare professionals, care facilities, and family caregivers across six continents. Following her husband's passing in June 2020, Dr. Lord channeled her grief into purpose: she developed the <strong>Transactional Dementia Intelligence (TDI) Model</strong>, a revolutionary care framework grounded in Lord's Theory, the psychology of the dementia brain.</p>
                <p>The TDI Model represents the culmination of Dr. Lord's professional credentials (Doctorate of Management from the University of Phoenix, 2010) and her lived experience navigating every stage of dementia care alongside her husband. Her expertise in organizational leadership shapes ICA's systemic, team-based approach to solving one of healthcare's most complex challenges.</p>
                <p>Today, ICA stands as the only organization delivering a proprietary, research-backed communication framework that serves both individual caregivers and enterprise care organizations, bridging the gap between medical intervention and human connection.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-brand-navy rounded-3xl overflow-hidden shadow-2xl relative group">
                <img 
                  src={ourStoryImg} 
                  alt="Senior couple holding hands, representing care and compassion" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-center flex flex-col items-center">
                   <Heart size={48} className="text-brand-gold mb-4 opacity-80" />
                   <p className="text-white text-xl md:text-2xl font-serif italic max-w-sm leading-relaxed drop-shadow-md">
                     "Transforming how we communicate with people living with dementia."
                   </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-deep-teal/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-brand-gold/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-24 bg-brand-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy mb-4">Driving Global Change</h2>
            <p className="text-lg text-gray-600">The core values driving our community and educational programs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-10 shadow-sm border border-brand-muted-sage/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-soft-teal/5 rounded-bl-[100px] transition-transform"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-soft-teal/10 rounded-2xl flex items-center justify-center text-brand-deep-teal mb-6">
                  <Eye size={32} />
                </div>
                <h3 className="text-2xl font-bold font-heading text-brand-navy mb-4">Our Vision</h3>
                <h4 className="text-lg font-semibold text-brand-deep-teal mb-4">Dignified Dementia Care, Everywhere</h4>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    ICA envisions a future where dementia care transcends nationality, language, religion, sexual orientation, socioeconomic status, and care setting. Whether someone living with Alzheimer's or dementia receives care at home from a family member or in a memory care facility from trained professionals, they deserve the same standard of compassionate, evidence-based support.
                  </p>
                  <p>
                    We exist to equip every caregiver (paid or unpaid, professional or family member) with the knowledge, tools, and community they need to deliver care that honors the humanity of people living with dementia. The ICA community is built on shared learning, clinical innovation, and the belief that dementia care should never compromise dignity.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-brand-navy rounded-2xl p-10 shadow-lg text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-deep-teal/10 rounded-bl-[100px] transition-transform"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mb-4">Our Mission</h3>
                <h4 className="text-lg font-semibold text-brand-gold mb-4">Elevate the Standard of Dementia Care Globally</h4>
                
                <p className="mb-4 text-brand-muted-sage font-medium">The mission of the International Caregivers Association LLC is to:</p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-brand-gold/20 p-1 rounded-md text-brand-gold shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <span className="text-brand-light-gray/90 leading-relaxed"><strong>Standardize dementia care quality globally</strong> through TDI Model training and certification programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-brand-gold/20 p-1 rounded-md text-brand-gold shrink-0">
                      <Users2 size={16} />
                    </div>
                    <span className="text-brand-light-gray/90 leading-relaxed"><strong>Bridge communication gaps</strong> between people living with dementia, family caregivers, professional care staff, and healthcare teams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-brand-gold/20 p-1 rounded-md text-brand-gold shrink-0">
                      <Activity size={16} />
                    </div>
                    <span className="text-brand-light-gray/90 leading-relaxed"><strong>Reduce caregiver burnout</strong> by teaching sustainable, effective communication strategies rooted in Lord's Theory</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-brand-gold/20 p-1 rounded-md text-brand-gold shrink-0">
                      <Globe2 size={16} />
                    </div>
                    <span className="text-brand-light-gray/90 leading-relaxed"><strong>Advocate</strong> for the 55+ million people living with dementia worldwide and the millions more who care for them</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-brand-gold/20 p-1 rounded-md text-brand-gold shrink-0">
                      <Building size={16} />
                    </div>
                    <span className="text-brand-light-gray/90 leading-relaxed"><strong>Transform organizational culture</strong> in memory care facilities, hospitals, home health agencies, and adult day programs</span>
                  </li>
                </ul>
                <p className="text-brand-light-gray/80 text-sm leading-relaxed">
                  ICA replaces outdated medical models of dementia care with a holistic framework centered on compassion, partnership, and transactional intelligence. We believe that understanding the psychology of the dementia brain is the key to unlocking better outcomes for everyone involved in the care journey.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="py-24 bg-white border-t border-brand-muted-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy mb-4">How to Engage with ICA</h2>
            <p className="text-lg text-gray-600">Choose your path to join the movement and elevate care standards.</p>
          </div>

          <div className="space-y-16">
            
            {/* For Individuals */}
            <div>
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
                <Users className="text-brand-deep-teal" size={32} />
                <h3 className="text-2xl font-bold font-heading text-gray-900">For Individual Caregivers and Healthcare Professionals</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-brand-warm-white p-6 rounded-2xl border border-gray-100 hover:border-brand-soft-teal hover:shadow-md transition-all">
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Become an ICA Fellow</h4>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">Join our global community of dementia care professionals and family caregivers. ICA membership includes access to exclusive research, quarterly expert briefings, discounts, and connection to our Talent Network.</p>
                  <Link to="/community#join" className="inline-flex items-center gap-2 text-brand-deep-teal font-semibold text-sm group">
                    Become a Fellow <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="bg-brand-warm-white p-6 rounded-2xl border border-gray-100 hover:border-brand-soft-teal hover:shadow-md transition-all">
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Earn Your Certification</h4>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">Enroll in the Certificate in Fundamentals of Transactional Dementia Intelligence™ (CFTDI) or pursue Advanced Transactional Dementia Intelligence™ (ATDIT) Train-the-Trainer certification to  to become a licensed TDI instructor.</p>
                  <Link to="/training#fundamentals" className="inline-flex items-center gap-2 text-brand-deep-teal font-semibold text-sm group mt-auto">
                    Explore certifications <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="bg-brand-warm-white p-6 rounded-2xl border border-gray-100 hover:border-brand-soft-teal hover:shadow-md transition-all">
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Become a Dementia Coach</h4>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">As a dementia coach (DC), you receive four certifications including hands-on coaching practicum to guide, teach, coach others in the Dementia Intelligence™.</p>
                  <Link to="/training#advanced" className="inline-flex items-center gap-2 text-brand-deep-teal font-semibold text-sm group">
                    Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="bg-brand-warm-white p-6 rounded-2xl border border-gray-100 hover:border-brand-soft-teal hover:shadow-md transition-all">
                  <h4 className="text-lg font-bold text-brand-navy mb-3">System Approach to TDI™ Model</h4>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">Elevate dementia care services to the 21st Century with the Transactional Dementia Care™ Model. This stops turnover, improves services, and increases ROI.</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-brand-deep-teal font-semibold text-sm group">
                    Support our mission <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* For Organizations */}
            <div>
              <div className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                <Building className="text-brand-deep-teal" size={32} />
                <h3 className="text-2xl font-bold font-heading text-gray-900">For Care Organizations and Healthcare Facilities</h3>
              </div>
              
              <div className="mb-8 p-6 bg-brand-light-gray rounded-2xl">
                <h4 className="text-lg font-bold text-brand-navy mb-3">Request a Preliminary Assessment</h4>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">ICA offers a comprehensive 360-degree evaluation of your current dementia care program. Our consultants identify gaps in staff training, communication protocols, family engagement, and care outcomes, then design a customized TDI implementation roadmap.</p>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">We believe reshaping dementia care requires a systems-level approach. ICA partners with memory care facilities, hospitals, assisted living communities, adult day programs, and home health agencies to ensure every stakeholder, from frontline staff to executive leadership, is aligned, trained, and empowered to deliver TDI-based care.</p>
                <a href="https://finalwebica.vercel.app/assessment" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-deep-teal font-semibold text-sm group">
                  Request an assessment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="my-8">
                <h4 className="text-lg font-bold text-brand-navy mb-6">What a TDI Partnership Delivers:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Target size={24} className="text-brand-gold shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">Reduced staff turnover (facilities report up to 40% improvement)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart size={24} className="text-brand-gold shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">Improved resident and family satisfaction scores</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Activity size={24} className="text-brand-gold shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">Decreased behavioral incidents and medication use</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe2 size={24} className="text-brand-gold shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">Market differentiation and occupancy growth</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users size={24} className="text-brand-gold shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">A culture of dementia intelligence that attracts and retains top talent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ICA */}
      <section className="py-24 bg-brand-navy relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <Lightbulb size={48} className="text-brand-gold mx-auto mb-8" />
          
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-12 text-white drop-shadow-md">
            Why ICA? Because Traditional Dementia Care Models Are Failing.
          </h2>

          <div className="mb-12 text-left max-w-3xl mx-auto space-y-6 text-brand-light-gray">
            <p className="text-lg">
              Traditional dementia care models focus on management: managing behaviors, managing medications, managing risk. The TDI Model focuses on connection: understanding the brain changes behind dementia behaviors, communicating in ways that reduce fear and confusion, and preserving the personhood of people living with dementia.
            </p>
            <p className="font-semibold text-white">ICA exists because:</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 shrink-0 bg-brand-gold rounded-full mt-2"></div>
                <span><strong>55 million</strong> people worldwide live with dementia, and that number is growing</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 shrink-0 bg-brand-gold rounded-full mt-2"></div>
                <span>Unpaid family caregivers provide an estimated <strong>$346 billion</strong> in care annually in the U.S. alone, often without training, support, or relief</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 shrink-0 bg-brand-gold rounded-full mt-2"></div>
                <span>Healthcare workers experience extreme burnout in dementia care roles due to inadequate training and unsustainable workloads</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 shrink-0 bg-brand-gold rounded-full mt-2"></div>
                <span>People living with dementia are too often medicated, restrained, or isolated rather than understood and supported</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-brand-deep-teal/20 via-brand-soft-teal/20 to-brand-deep-teal/20 p-8 rounded-2xl border border-brand-soft-teal/30 mb-12">
            <p className="text-xl md:text-2xl font-serif mb-2 text-white">
              We advocate for a new paradigm, one where dementia care is not just about keeping people safe, but about keeping people human.
            </p>
          </div>
          
          <h3 className="text-2xl font-bold font-heading mb-6">Join the Movement</h3>
          <p className="text-brand-light-gray max-w-2xl mx-auto mb-10 text-left">
            Whether you are a family caregiver navigating a loved one's diagnosis, a nurse seeking better ways to connect with patients, an administrator looking to transform your facility's culture, or a philanthropist committed to advancing dementia care innovation, ICA welcomes you. Your acts of compassion, your commitment to learning, and your willingness to challenge the status quo are vital to creating the dignified, inclusive world we envision.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/community#join"
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold px-6 py-3 rounded-full transition-all text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              Become an ICA Fellow
            </Link>
            <Link 
              to="/training"
              className="bg-white hover:bg-gray-100 text-brand-navy font-bold px-6 py-3 rounded-full transition-all text-sm flex items-center justify-center gap-2 shadow-lg border border-transparent"
            >
              Explore Certification Programs
            </Link>
            <a 
              href="https://meetings.hubspot.com/ethelle"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-brand-navy font-bold px-6 py-3 rounded-full transition-all text-sm flex items-center justify-center gap-2 shadow-lg border border-transparent"
            >
              Book Consultation with Dr. Lord
            </a>
            <a 
              href="https://finalwebica.vercel.app/assessment"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent hover:bg-white/10 text-white font-bold px-6 py-3 rounded-full transition-all text-sm flex items-center justify-center gap-2 border border-white/30"
            >
              Request an Organizational Assessment
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-brand-muted-sage text-sm">
            <strong>International Caregivers Association LLC</strong><br />
            Setting the new best practice in dementia care, worldwide.
          </div>
        </div>
      </section>

    </div>
  );
}
