import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, X } from 'lucide-react';
import ethelleImg from '../assets/images/Dr. lord.png';
import jenniferImg from '../assets/images/Dr. Jennifer Stelter.jpg';
import ryanImg from '../assets/images/Ryan Stoffko.png';
import andrewImg from '../assets/images/Dr. Andrew Harrison.png';
import timPooreImg from '../assets/images/Tim Poore.jpg';
import timurImg from '../assets/images/Dr. Timur Liwinsky.jpg';
import davidImg from '../assets/images/Dr. David Yoder.png';
import georgeImg from '../assets/images/Dr. George Grant.jpg';
import padImg from '../assets/images/Pad.png';
import sarahImg from '../assets/images/sarah chao.jpg';
import williamImg from '../assets/images/William Baker.jpg';
import timPoitrasImg from '../assets/images/Tim Poitras.png';

const leadershipTeam = [
  {
    name: "Dr. Ethelle G. Lord",
    title: "ICA Founder and President, Doctorate of Management in Organizational Leadership",
    bio: "As our Founder and President, Ethelle is the public voice and face of the ICA. She is a leading global voice for productive change in the field of dementia care. She has pioneered the new breakthrough approach called Transactional Dementia Intelligence and its operational aspect, The TDI Model, which focuses on shifting dementia care from a medical model to a social/wellness model, benefiting families, staff, and facilities. As a visionary advocate, Dr. Lord brings new opportunities to benefit both families and organizations. In addition to being a sought-after speaker, Dr. Lord is an accomplished author. She is author of the landmark book, “Alzheimer’s Coaching: Taking A Systems Approach in Creating an Alzheimer’s Friendly Healthcare Workforce,” She also authored “How in the World...and Now What Do I Do?”, an Alzheimer’s primer now in several languages, worldwide. A bilingual native of Quebec, Canada, Ethelle splits her time between her East Coast (Maine) and West Coast (Palm Springs, CA) offices.",
    image: ethelleImg
  },
  {
    name: "Dr. Andrew Harrison",
    title: "VP of Inclusivity",
    bio: "Andrew Harrison, MD, PhD is a physician and scientist, who also happens to be a gay man. His role at ICA is to inform and inspire a spirit of inclusivity within our outreach to caregivers. He is also a pioneer in the use of artificial intelligence to support difficult care placements. After completing undergraduate research training in physics and genetics he pursued MD-PhD training through the NIH-supported Medical Scientist Training Program at Mayo Clinic. Most recently he has done consulting focused on AI in healthcare such as generative AI and large language models (LLMs). He was employed by the Office for Diversity at Mayo Clinic as Managing Editor of their Diversity in Education Blog for 5 years. Most of his time was spent with Native American populations and his own LGBTQIA+ community as a gay man.",
    image: andrewImg
  },
  {
    name: "Ryan Stoffko",
    title: "VP of Science & Technology",
    bio: "Ryan Stoffko, USA, is the founder of OPP Neuro SPA, Ohio USA., which provides in-home/in-office Sleep Performance Profiling (SPP), qEEG Brain Mapping and Neurofeedback services. His primary focus is directed towards Peak Performance and Healthy Aging in a manner which reinforces Accident Prevention on a tailored basis. Ryan serves as a Public Relations Manager at The Institute for Human Biology, Vancouver CA, and is also a Director at K-Enterprises, Glasgow & London UK, which is an enterprise, composed of SMEs and other problem solvers focused on solutions for all industries and sectors, while focusing on the UN Sustainability agenda.",
    image: ryanImg
  },
  {
    name: "Dr. Jennifer Stelter, Psy.D., DCS, DCSCT",
    title: "VP of Education",
    bio: "Dr. Jennifer Stelter, also known as The Oil Doctor, Psy.D., is a Clinical Psychologist, national speaker, Johns Hopkins Press author, and Senior Living and Dementia Care Consultant, who specializes in dementia care. Dr. Stelter plays a key element in ICA's dementia education and training. She has 20 years of experience in the healthcare field and over a dozen in the senior living industry. Dr. Stelter is the co-founder and CEO of the Dementia Connection Institute by NeuroEssence, LLC, the innovator and creator of the Dementia Connection Model©, and a Master Trainer for the Dementia Connection Specialist Certified Trainer (DCSCT) Certification Program. Her programs dovetail perfectly with TDI Model principals. Also, she is the author of The Busy Caregiver's Guide to Advanced Alzheimer Disease.",
    image: jenniferImg
  },
  {
    name: "Tim Poore",
    title: "VP of Recovery Optimization",
    bio: "Tim Poore, a seasoned healthcare executive, has been a transformative force in the industry since 2019 when he took the reins as CEO of ATP Healthcare. In his role, Tim leads a dedicated team that assists patients, families, and hospitals in navigating the complex landscape of healthcare placements for challenging cases. Before helming ATP Healthcare, Tim demonstrated his expertise in the healthcare sector as part of an investment group. There, he played a pivotal role in identifying and optimizing post-acute care properties for purchase, strategically increasing their census post-acquisition. Tim's extensive experience also includes several years in the dynamic fields of home health and hospice. Currently, at the forefront of innovation, Tim has co-founded a company that has developed an AI platform. This groundbreaking technology guides hospitals and post-acute care providers in optimizing patient recovery, showcasing Tim's commitment to advancing healthcare solutions.",
    image: timPooreImg
  },
  {
    name: "Dr. Timur Liwinski",
    title: "VP of Metabolic Psychiatry",
    bio: "Dr. Liwinski is a physician-scientist based in Basel, Switzerland. With a doctorate in child and adolescent psychiatry, Timur initially pursued a residency in general internal medicine. His academic journey led him to undertake a first postdoctorate at the Institute of Medical Systems Biology within a Medical Scientist Training Program in Hamburg, Germany. Later, he embarked on a second postdoctorate in systems immunology, investigating the gut microbiome's connections with diet, immunity, and the gut-brain axis at the Weizmann Institute of Science in Israel. Currently, Timur is completing his second residency in adult psychiatry, focusing on affective disorders and interventional psychiatry. As a principal investigator, he heads a research group specializing in nutritional and metabolic psychiatry. Concurrently, he serves as a lecturer at the University of Basel and the Viktor Frankl Institute of Logotherapy in Israel. Timur's multifaceted expertise spans clinical practice, research, and academia, driving advancements in metabolic and mental health.",
    image: timurImg
  },
  {
    name: "Dr. David Yoder",
    title: "VP of Holistic Wellness",
    bio: "Dr. David Yoder is a chiropractic physician specializing in getting to the heart of the matter. With dementia care, it's become obvious that many body systems are involved with the condition. David is the ideal person to bring a holistic perspective to every facet of ICA's approach to dementia caregiving. He sees persons with dementia as a whole person, influenced by epigenetics and lifestyle inputs. David also sees everyone as \"only a few steps away from achieving your best version of you.\" By identifying the main obstacles to health; inflammation, gut microbiome dysbiosis, chronic high cortisol, insomnia, low mitochondrial function, and circadian rhythms.",
    image: davidImg
  },
  {
    name: "Dr. George Grant",
    title: "VP of Integrative Medicine",
    bio: "When it comes to the convergence of wellness and scientific innovation, one name stands at the forefront: Prof. Dr. George Grant, Ph.D., affectionately known as The Celebrity Caring Doctor & Celebrity Best Selling coauthor with Les Brown, Brian Tracey, Mark Victor Hanson, Jack Canfield and many others. An icon of health care and a beacon of integrative approaches, Dr. Grant has cemented his role as an eminent authority in the fields of Biofeedback, Integrative Medicine, Nutrition, Toxicology, Stress, and Pain Management. His profound influence stretches across the global wellness landscape, where he is recognized as a steadfast ambassador. Prof. George Grant’s expertise in biofeedback, stress management, anti-aging, and natural pain relief isn’t merely respected, its sought after by those in the highest echelons of health and wellness including collaboration with John’s Hopkins, Mayo Clinic, Cleveland Clinic & Harvard at the International Pain Conference in Chicago, USA in 2015. Prof. Dr. Grant worked for Health Canada, FDA & CDC for 10 years as a Senior Scientist for 10 years and a Scientist for several Pharmaceutical & Neutraceutical Companies worldwide.",
    image: georgeImg
  },
  {
    name: "Pad",
    title: "VP of Team Optimization",
    bio: "Pad is an acclaimed author in the field of behavioral psychology, and the creator and chief facilitator of TEAM ME® - a unique, dynamic, and easy-to-learn approach to leadership and team performance improvement. He leads the crucial Team Optimization phase of the TDI Model. Certified as an NLP Trainer and Master Practitioner, with Advanced Diplomas in Psychology and Leadership, he is the Director of Come Alive Success Coaching ltd. A sought-after international speaker; Pad’s personal coaching, workshops, and ground-breaking products have been distributed to over 54 countries. He has appeared on ITV, BBC World Service, and Radio 5 Live as well as quoted in The Guardian, The Independent, and The Telegraph. Pad offices in London, England.",
    image: padImg
  },
  {
    name: "Sarah Chao",
    title: "VP of Care Environment",
    bio: "Sarah is a Certified Dementia Practitioner through NCDDP with more than 15 years of experience supporting adults living with dementia across home-based and memory care settings. With a professional background as an Occupational Therapist, she has worked closely with countless individuals and caregivers, gaining deep insight into the challenges families face and the transformative impact of clear, compassionate guidance. As the founder of Dementia Support Solutions, Sarah now focuses exclusively on dementia education and caregiver coaching. She offers warm, practical, and accessible virtual sessions designed to help families understand behavioral changes, strengthen communication, and create supportive dementia care environments grounded in dignity and connection. Her work centers on translating evidence-based dementia care practices into actionable strategies that empower caregivers in their daily lives. Sarah brings a blend of clinical expertise, real-world experience, and a strong commitment to caregiver wellbeing. She is honored to contribute her perspective to the International Caregivers Association LLC leadership team, and to support efforts that improve the lives of people living with dementia and those who care for them.",
    image: sarahImg
  },
  {
    name: "William Baker, JD",
    title: "Legal Counsel",
    bio: "As legal advisor for ICA, Will brings a vital perspective to maintaining full good faith in every aspect of our client service. Will received his law degree from the University of Denver's Sturm College of Law and spent his first 10 years practicing in Colorado, where he founded a successful firm built on his client-driven approach. In addition to his legal experience, Will holds an MBA and brings these added skills to his business practice. A native of Buffalo, NY, Will now calls New England home.",
    image: williamImg
  },
  {
    name: "Tim Poitras, CPA, CGMA",
    title: "Accounting Advisor",
    bio: "Mr. Poitras, a partner and owner of Chester M. Kearney, attained his BS degree in business administration from the University of Maine and his BS degree in accounting from Husson College. His career with the firm began in 2001 and he received his CPA certificate in 2004. Mr. Poitras is a member of the American Institute of Certified Public Accountants, the Maine Society of Certified Public Accountants, and the Association of Certified Fraud Examiners.",
    image: timPoitrasImg
  }
];

function TeamMemberCard({ member, index, onOpen }: { member: any; index: number; onOpen: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-brand-muted-sage/20 text-center hover:shadow-md transition-all flex flex-col"
    >
      <div className="w-48 h-48 rounded-2xl overflow-hidden mx-auto mb-6 border-4 border-brand-soft-teal flex items-center justify-center bg-brand-light-gray shadow-sm">
        {member.image ? (
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <Users size={64} className="text-brand-muted-sage" />
        )}
      </div>
      <h3 className="text-xl font-bold font-heading text-brand-navy mb-1">{member.name}</h3>
      <p className="text-brand-deep-teal font-medium mb-4">{member.title}</p>
      
      <div className="text-gray-600 text-sm leading-relaxed text-left flex-grow flex flex-col">
        <p className="line-clamp-4">
          {member.bio}
        </p>
        <button 
          onClick={onOpen}
          className="mt-4 text-brand-navy font-semibold text-sm hover:text-brand-deep-teal transition-colors self-start"
        >
          Learn More
        </button>
      </div>
    </motion.div>
  );
}

export default function Leadership() {
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-deep-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-soft-teal/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-deep-teal/30 border border-brand-soft-teal/30 text-brand-soft-teal px-4 py-2 rounded-full text-sm font-bold tracking-wide mb-4 uppercase"
          >
            Organizational Leadership
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 leading-tight"
          >
            Guiding the Future of Dementia Care
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-brand-light-gray max-w-3xl mx-auto leading-relaxed"
          >
            Meet the dedicated professionals leading the International Caregivers Association LLC and driving global change.
          </motion.p>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-24 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} onOpen={() => setSelectedMember(member)} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-brand-light-gray hover:bg-gray-200 text-brand-navy transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-2/5 p-8 bg-brand-warm-white flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-lg mb-6 flex items-center justify-center bg-brand-light-gray relative shrink-0">
                  {selectedMember.image ? (
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <Users size={80} className="text-brand-muted-sage" />
                  )}
                </div>
                <h3 className="text-2xl font-bold font-heading text-brand-navy text-center mb-2">{selectedMember.name}</h3>
                <p className="text-brand-deep-teal font-medium text-center">{selectedMember.title}</p>
              </div>
              <div className="w-full md:w-3/5 p-8 md:p-10 flex items-center">
                <div className="text-gray-700 text-base leading-relaxed space-y-4">
                  {selectedMember.bio.split('\n').map((paragraph: string, i: number) => (
                     <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}