import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

import courseAuthImage from '../../assets/images/Fundamentals of TDI™ (CFTDI).png';
import courseAuthImage2 from '../../assets/images/Advanced TDI™ Train-the-Trainer.png';
import courseAuthImage3 from '../../assets/images/ICA Fellows Membership.png';

interface CourseData {
  id: string;
  category: string;
  title: string;
  description: string;
  outcomes: string[];
  duration: string;
  certified: boolean;
  image: string;
}

const DEFAULT_COURSES: CourseData[] = [
  {
    id: 'c1',
    category: "For Families",
    title: "Fundamentals of TDI™ (CFTDI)",
    description: "The essential communication framework for family caregivers to immediately reduce daily friction and bring peace to the home.",
    outcomes: ["Communication tactics", "De-escalation strategies", "Burnout prevention"],
    duration: "Self-paced",
    certified: false,
    image: courseAuthImage
  },
  {
    id: 'c2',
    category: "For Professionals",
    title: "Advanced TDI™ Train-the-Trainer",
    description: "Our premier certification program for healthcare professionals, dementia coaches, and facility staff leaders.",
    outcomes: ["TDI methodology mastery", "Staff training capability", "Official ATDIT Certification"],
    duration: "12 Weeks",
    certified: true,
    image: courseAuthImage2
  },
  {
    id: 'c3',
    category: "Membership",
    title: "ICA Fellows Membership (Monthly/Yearly)",
    description: "Core benefits: All ICA Fellows Get Preferred Access and Major Savings!",
    outcomes: ["FREE: Content & Research Access", "FREE: Quarterly Updates/Consultation", "FREE: ICA Dementia Talent/Jobs Bank"],
    duration: "Monthly / Yearly",
    certified: true,
    image: courseAuthImage3
  }
];

export default function CoursesSection() {
  const [courses, setCourses] = useState<CourseData[]>(DEFAULT_COURSES);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'courses'),
      (snapshot) => {
        if (!snapshot.empty) {
          const coursesData: CourseData[] = [];
          let imageIndex = 0;
          const images = [courseAuthImage, courseAuthImage2, courseAuthImage3];
          snapshot.forEach((doc) => {
            const data = doc.data();
            coursesData.push({
              id: doc.id,
              category: data.category || "Course",
              title: data.title,
              description: data.description,
              outcomes: data.outcomes || ["Learn more inside"],
              duration: data.duration || "Self Paced",
              certified: data.certified || false,
              image: images[imageIndex % 3] || data.image,
            });
            imageIndex++;
          });
          
          // Ensure Membership course always shows even if deleted from DB
          const hasMembership = coursesData.some(c => c.category === 'Membership' || c.title.includes('Membership'));
          if (!hasMembership) {
            const membershipCourse = DEFAULT_COURSES.find(c => c.category === 'Membership');
            if (membershipCourse) {
               coursesData.push(membershipCourse);
            }
          }
          
          setCourses(coursesData);
        } else {
          setCourses(DEFAULT_COURSES);
        }
      },
      (error) => {
        console.error("Error fetching courses", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 bg-brand-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-navy mb-6">
            ICA Training & Certification
          </h2>
          <p className="text-lg text-gray-600">
            Elevate your standard of care. Whether you're a family member at home or a healthcare executive, we have specialized programs to teach you the TDI Model.
          </p>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {courses.map((course, idx) => (
             <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group flex-1 min-w-[300px] max-w-md"
            >
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold font-heading text-brand-navy mb-3 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                  {course.description}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-soft-teal" />
                    <span className="text-sm font-medium text-gray-700">{course.duration}</span>
                  </div>
                  {course.certified && (
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-gold" />
                      <span className="text-sm font-medium text-gray-700">Official Certification</span>
                    </div>
                  )}
                  <ul className="space-y-2 pt-2 border-t border-gray-100">
                    {course.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <ArrowRight className="w-4 h-4 text-brand-soft-teal mt-0.5 flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                {course.category === 'Membership' ? (
                  <Link 
                    to="/join-ica"
                    className="w-full text-center py-3 px-4 rounded-lg font-semibold text-brand-deep-teal bg-brand-muted-sage hover:bg-brand-soft-teal hover:text-white transition-colors"
                  >
                    Join ICA
                  </Link>
                ) : (
                  <Link 
                    to={`/course/${course.id}`}
                    className="w-full text-center py-3 px-4 rounded-lg font-semibold text-brand-deep-teal bg-brand-muted-sage hover:bg-brand-soft-teal hover:text-white transition-colors"
                  >
                    View Program Details
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
