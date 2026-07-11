import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, X, Globe } from 'lucide-react';

import andrewImg from '../assets/images/Dr. Andrew Harrison.png';
import richardImg from '../assets/images/Richard Efthim.jpg';
import russImg from '../assets/images/Russ Barker,.jpg';
import daniImg from '../assets/images/Dani Rockey.webp';
import danielImg from '../assets/images/Daniel Stifanos.jpg';
import lauraImg from '../assets/images/Laura Bolton.png';
import lillianImg from '../assets/images/Lillian Courtney.jpg';
import monicaImg from '../assets/images/Monica Stewart.jpg';
import aaronImg from '../assets/images/Aaron Murphy.jpg';
import nataliaImg from '../assets/images/Natalia Bragg.jpg';
import leahImg from '../assets/images/Leah Bisiani.jpeg';
import manosImg from '../assets/images/Manos Georgarakos.jpg';
import nakeishaImg from '../assets/images/Nakeisha Rodgers.jpg';
import philipImg from '../assets/images/Dr. Philip Blair.jpg';
import georgeImg from '../assets/images/Dr. George Ackerman.png';

const advisoryBoard = [
  {
    name: "Leah Bisiani",
    title: "Australia",
    bio: "Based in Melbourne, Australia, Leah is a bestselling author on aging issues. She is also a highly skilled RN1 / MHlthSc / DipBus / Dementia and Aged Care consultant, with more than 35 years of experience in aged and dementia care. Leah has successfully demonstrated how to reconsider the medical paradigm and create environments in which persons living with dementia continue to thrive. Leah won the 2010/11 Lend Lease ‘Australian’, and ‘Global’ Awards for “Excellence in Innovation” for her person-centered models of care, designed for people living with dementia. Leah’s life’s work and vision transform cultures and philosophies of care, providing a powerful voice confronting current practice, forging approaches that remove all forms of segregation, and consequently upholding the human rights of all people living with dementia.",
    image: leahImg
  },
  {
    name: "Dr. Nakeisha Rodgers",
    title: "USA",
    bio: "Dr. Nakeisha Rodgers is a dual board Internist and Geriatrician, best-selling author, and national speaker from the beautiful island of the Bahamas. She has more than 15 years of experience in aged /dementia care. She has over a decade of experience caring for hundreds of complex geriatric patients with multiple medical needs. Dr. Nakeisha earned her associate degree in Biochemistry from the University of the Bahamas. She then completed her Bachelor’s in Biology at Acadia University in Nova Scotia, Canada. She matriculated at the University of West Indies medical school graduating with an MBBS (Bachelor of Medicine and Surgery). She later completed her Internal Medicine Residency at the Yale New Haven Health Bridgeport Program. She was awarded a Fellowship degree in Geriatrics from the prestigious Harvard Medical School.",
    image: nakeishaImg
  },
  {
    name: "Natalia Bragg",
    title: "USA",
    bio: "Natalia Bragg is a widely-recognized herbalist and the owner of Knot II Bragg Farm in Wade, Maine. Bragg has been practicing herbalism since 1966 and has taught her craft at Knot II Bragg Farm since 1995. Bragg is a sixth-generation herbalist with six generations of herbal and natural healing lore. She has become an environmentalist, a fish farmer, and a historian of sorts. Natalia has also been featured on many television programs focusing on herbalism. In addition, she has been a local and national speaker at conferences. One of her favorite activities is to teach others about herbs and natural products. She aspires to teach young farmers from Aroostook County in Maine about the abundant natural resources of the area. Her belief is that these local resources could lead to economic security for many farmers. In addition to the many natural products she manufactures, she also offers health conferences to those in search of optimal health. Natalia single-handedly operates her large organically farm. Her advice is to “use your smarts, intuition, and every resource available to you” and you will be healthy.",
    image: nataliaImg
  },
  {
    name: "Dr. Philip Blair, MD",
    title: "USA",
    bio: "Colonel Philip Blair, MD, (USArmy retired) is a Family Physician and consultant in cannabis medicine in the Northwest. He graduated from West Point 1972 and University of Miami School of Medicine 1978, trained in Family Medicine and served as combat physician in 1991 Gulf War. Since 2014, Dr. Blair has been studying, treating, writing, and lecturing about the human body’s natural endocannabinoid system (ECS). ECS dysfunction appears closely associated with the full range of chronic illness. His goal is to restore health and performance by enhancing the ECS through lifestyle, medications, and non-psychoactive herbs.In 2021, he co-authored the Medicinal Cannabis and CBD in Mental Healthcare, and, in 2022 created BCPLus, an oral non-cannabis ECS activator from beta-caryophyllene, a powerful regulator of immunity, controller of neurotransmitters and metabolism. He is currently the CEO of Blair Medical Group, SPC, providing endocannabinoid-enhancing products internationally. He has consulted with individuals across the world to help them relieve health problems and enhance their performance. He is a lecturer and has 50+ YouTube videos available online.",
    image: philipImg
  },
  {
    name: "Aaron Murphy",
    title: "USA",
    bio: "Aaron is a passionate design professional, consultant, and advocate for Aging-In-Place in your own community. He has been presenting at a national and international level for over 15 years. He is a licensed architect, a “Certified Aging In Place Specialist” through NAHB, and an engaging and entertaining public speaker. Aaron is a known industry expert & author in the Aging-in-Place field, and a business coach teaching other executives how to own the AIP & UD niche of a home modification business. He teaches GCs, remodelers, OTs and associated fields, what it takes to become your own local go-to expert in your community. Aaron has been a Seattle radio host on subject, is a known entertainer and educator on stage across multiple home and building industries, and has been preaching “Empowering Housing” for 15+ years from Chicago to Tokyo.",
    image: aaronImg
  },
  {
    name: "Monica Stewart",
    title: "USA",
    bio: "Monica Stewart is the Director of Operations for Amped in Louisville, KY. She has a BS in Economics and her Master's in Business Administration. She has an extensive background in banking, human resources, insurance, sales, healthcare, and the nonprofit sector. She seeks to provide career development and encourage the educational journeys of adult learners and their families. She is the CEO of Transitions Caregiver Solutions (TCS) which provides resources to caregivers from aging parents to children with mental or physical challenges. Her passion is to promote health equity to all families in her community which is why she started her business. She has been a caregiver for her mother, stepfather, and husband over the past 12 years and saw the need to connect families to much-needed resources. It has been very rewarding for her to see the positive feedback from families both in her work and business.",
    image: monicaImg
  },
  {
    name: "Lillian Courtney",
    title: "Ireland",
    bio: "Lillian Courtney is an accomplished Executive corporate coach, creative confidence consultant, and master workshop facilitator with a strong background in the multinational, educational, and health sectors. She has a passion for building confidence and reducing stress among founders, executives, and teams through effective coaching tools and different methodologies. Throughout her career, Lillian has been instrumental in enhancing teams' levels of creativity, and confidence in driving profits for companies. By drawing from her diverse experience across various industries, Lillian's expertise and accreditation have earned her a reputation as a trusted advisor and mentor. Having trained with top global Forbes leaders, she brings a powerful up to date toolkit for the new world to deal with any given situation ahead.Her involvement in Toastmaster International as President for Blarney Toastmasters, Ireland, adds to her global leadership.",
    image: lillianImg
  },
  {
    name: "Laura Bolton, MSc",
    title: "England",
    bio: "Laura Bolton, MSc is Edinburgh-based in the UK and a registered Music Therapist with a background in psychology. She has over 15 years' experience in supporting people who are living with dementia. Ms. Bolton comes with over 30 years of work experience in health and social care in the UK, accumulating valuable experience in tailoring effective therapeutic interventions for individuals and groups. Ms. Bolton has contributed to published research in her field of music therapy. Her research publications are more specifically related to the digital delivery of therapeutic services which was enormously valuable during the Covid-19 pandemic. These papers are available to read in BMJ Case reports and the Journal of Dementia Care, or upon request from the author at laura.bolton@nazarethcare.com.",
    image: lauraImg
  },
  {
    name: "Dr. Andrew Harrison",
    title: "USA",
    bio: "Andrew Harrison, MD, PhD is a physician and scientist, who also happens to be a gay man. His role at ICA is to inform and inspire a spirit of inclusivity within our outreach to caregivers. He is also a pioneer in the use of artificial intelligence to support difficult care placements. After completing undergraduate research training in physics and genetics he pursued MD-PhD training through the NIH-supported Medical Scientist Training Program at Mayo Clinic. Most recently he has done consulting focused on AI in healthcare such as generative AI and large language models (LLMs). He was employed by the Office for Diversity at Mayo Clinic as Managing Editor of their Diversity in Education Blog for 5 years. Most of his time was spent with Native American populations and his own LGBTQIA+ community as a gay man.",
    image: andrewImg
  },
  {
    name: "Daniel Stifanos",
    title: "USA",
    bio: "Daniel is a passionate nursing student at San Antonio College in Texas. He is driven by a commitment to honoring and nurturing the elderly through direct care. Beyond clinical interactions, he aspires to champion regulatory reforms that encourage community-based care models and ensure patients receive support close to their loved ones. Daniel's eagerness to learn extends beyond the classroom, as seen through his Basic Life Support and Nurse Aide certifications. His volunteer work with Habitat for Humanity and as a Tafolla Middle School mentor reflects his service commitment. Daniel's recognition on the San Antonio College President's List underscores his academic excellence. Outside of studies, Daniel serves as secretary of the SACMEN Club, promoting male engagement in education. He also works as an academic assistant, utilizing his extensive customer service experience. An accomplished artist, Daniel has showcased his photography in the prestigious FotoseptiembreUSA exhibition. He is trilingual in Amharic, Tigrinya, and English, which enhances his ability to navigate diverse social settings.",
    image: danielImg
  },
  {
    name: "Dr. George Ackerman",
    title: "USA",
    bio: "Dr. George Ackerman has a Ph.D. in Criminal Justice, a J.D. and MBA and is a member of the bar association. He entered the law enforcement field in 2006 as a police officer rsv. and has assisted the USCG Aux. His current research focuses on the underserved population of family members of homicide victims and fights for victims' rights. He is also the founder of www.togetherforsharon.com in memory of his mother Sharon, for Parkinson’s Disease Awareness. George lost his mother, Sharon Riff Ackerman on 1/1/2020 due to Parkinson’s Disease. Today https://www.togetherforsharon.com/ reaches thousands of individuals across the country for PD Awareness. George currently interviews individuals throughout the Parkinson’s community including various foundations, caregivers, and Parkinson’s warriors to help share their stories and causes. He is an author, a presenter, and a strong advocate to find a cure for Parkinson’s.",
    image: georgeImg
  },
  {
    name: "Dani Rockey",
    title: "USA",
    bio: "Founder of Seacoast Senior Advisors in the State of Maine, Dani is a holistic coachand advisor to families by practice by assisting and guiding them when faced with a diagnosis of dementia. To that end she specializes in downsizing. This may mean a need to relocate the family home, wellness for the family caregiver, assisted living or skilled nursing, palliative/hospice care for a loved one living with dementia. With over 20 years of experience in a variety of field and roles such as executive leadership as a long-term care administrator, life coaching and real estate - she is well positions to advise individuals and families. Dani brings expertise to the ICA in care planning and how to support families with compassion and clarity at their time of need. Her long-term vision is to build Seacoast Senior Advisors into a trusted resource for holistic coaching, consulting, and advocacy, enriching lives through innovative, compassionate services. Known for her visionary mindset, detail-oriented approach, and authentic compassion, Danithrives on helping others embrace change, discover resilience, and reinvent themselves with purpose.",
    image: daniImg
  },
  {
    name: "Russ Barker",
    title: "USA",
    bio: "Russ Barker, MHA, DHSc(c), is the founder of Seagull Health in the Kansas City Metropolitan Area. His doctoral research focuses on seizures and seizure-related changes in dementia that are often missed, misunderstood, or documented in ways that do not support decision-making. Families and care teams may notice brief episodes of confusion, staring, unusual movements, or sudden shifts that do not fit a person’s usual patterns. At the same time, family members most often lack a clear structure for recognizing what matters and describing what they observed in a way clinicians can use.  Russ’ doctoral dissertation, entitled Seizure Risk Assessment in Dementia: A Systematic Review of Current Evidence and Recommendations for Future Clinical Research in Senior Living Facilities, examines how seizure risk is studied in dementia and how future research can better reflect real-world care environments. That work led to the Dementia Seizure Spectrum™ (DSS) and SeizureSafe™, a practical system that helps families and care teams recognize concerning patterns, respond safely, and document seizure-related changes with more clarity and consistency. In this say, medical visits and follow-up decisions are better informed for families.",
    image: russImg
  },
  {
    name: "Richard Efthim",
    title: "USA",
    bio: "Richard Efthim is a practitioner in Rapid Memory Healing™, a practical, body-based methodology designed to help individuals release the emotional charge associated with stressful life memories. His work centers on facilitating rapid, safe nervous system regulation, guiding individuals from emotional reactivity toward greater clarity, resilience, and calm. Richard works with clients and groups worldwide through both in-person and virtual sessions, with particular relevance for care partners and professionals supporting persons living with dementia. Richard comes to the ICA with 35 years of experience as an educator at the Smithsonian's National Museum of Natural History in Washington, DC, USA . His methodology emphasizes accessible, repeatable processes that reliably produce meaningful insight and lasting transformation. To hear Richard discuss his work, listen to his most recent podcast: https://bit.ly/4sNlxN8",
    image: richardImg
  },
  {
    name: "Manos Georgarakos",
    title: "Greece",
    bio: "Manos Georgarakos is a Civil & Structural Engineer, MEng, MSc. He has over 20 years of experience in the design, supervision and construction of senior living communities, focusing on the special requirements of these buildings such as accessibility and design for dementia. He has undertaken the design studies and obtained the building permits for more than 25 Nursing Homes and has coordinated the construction, refurbishment and extension of such communities. He has excellent knowledge of the legislation governing the licensing, construction and operation of senior living communities such as Nursing Homes, Rehabilitation Centers, Assisted living, Memory Care etc. He is the founder & CEO of Map of Care https://themapofcare.com. Map of Care is a web platform where US senior living communities and care seekers come together without the middleman. Families in need of such services have the opportunity to search for long-term care near them and check real-time availability based on their own financial criteria. This is available in the USA now. Community owners/administrators can promote their services with no intermediaries and no referral fees.",
    image: manosImg
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

export default function AdvisoryBoard() {
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-soft-teal rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-deep-teal/30 border border-brand-soft-teal/30 text-brand-soft-teal px-4 py-2 rounded-full text-sm font-bold tracking-wide mb-4 uppercase"
          >
            <Globe size={18} /> Expert Guidance
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6"
          >
            Global Advisory Board
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-brand-light-gray max-w-4xl mx-auto mb-4 leading-relaxed"
          >
            Meet the Industry Thought Leaders Who Provide Proven Insight. As the spearhead for a global coalition to transform dementia care worldwide, ICA welcomes and actively engages some of the best minds across the fields that impact this mission. We are honored to introduce our esteemed ICA Advisory Board, a work in progress as we continually meet outstanding hearts and minds shaping dementia care.
          </motion.p>
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="py-16 bg-brand-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-brand-navy leading-relaxed">
          <p className="mb-4">
            This exemplary group provides invaluable guidance as we expand the revolutionary Transactional Dementia Intelligence™ Model (TDIM) globally. Our advisors offer diverse expertise and perspectives from various cultures, professional backgrounds, and personal experiences to enhance our model. 
          </p>
          <p>
            These distinguished voices help ensure our work reflects the broad needs of dementia patients and clients, families, and care providers worldwide. Here is our Advisory Board as it stands today.
          </p>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className="py-24 bg-brand-warm-white bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisoryBoard.map((member, index) => (
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
