import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { BookOpen, Award, PlayCircle, Loader2, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateCertificate } from '../lib/generateCertificate';

import courseAuthImage from '../assets/images/Fundamentals of TDI™ (CFTDI).png';
import courseAuthImage2 from '../assets/images/Advanced TDI™ Train-the-Trainer.png';
import courseAuthImage3 from '../assets/images/ICA Fellows Membership.png';

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchDashboardData = async () => {
      try {
        // Fetch all courses so we can show proper titles and recommendations
        const coursesSnap = await getDocs(collection(db, 'courses'));
        const coursesData = coursesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(coursesData);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchDashboardData();

    // Listen to enrollments
    const enrollmentsQuery = query(collection(db, 'enrollments'), where('userId', '==', currentUser.uid));
    const unsubscribeEnrollments = onSnapshot(enrollmentsQuery, (snapshot) => {
      const rawEnrollments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      // Deduplicate by courseId
      const uniqueEnrollments = Array.from(new Map(rawEnrollments.map(item => [item.courseId, item])).values());
      setEnrollments(uniqueEnrollments);
      setLoading(false);
    });

    // Listen to certificates
    const certificatesQuery = query(collection(db, 'userCertificates'), where('userId', '==', currentUser.uid));
    const unsubscribeCertificates = onSnapshot(certificatesQuery, (snapshot) => {
      setCertificates(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeEnrollments();
      unsubscribeCertificates();
    };
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="py-32 text-center text-gray-500">
        Please sign in to view your learning dashboard.
      </div>
    );
  }

  // Get enrolled course IDs
  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const recommendedCourses = courses.filter(c => !enrolledCourseIds.includes(c.id) && c.category !== 'Membership' && !c.title?.includes('Membership'));

  const courseEnrollments = enrollments.filter(e => {
    const c = courses.find(course => course.id === e.courseId);
    return c && c.category !== 'Membership' && !c.title?.includes('Membership');
  });

  const membershipEnrollments = enrollments.filter(e => {
    const c = courses.find(course => course.id === e.courseId);
    return c && (c.category === 'Membership' || c.title?.includes('Membership'));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy mb-4 pt-10">
          My Learning Dashboard
        </h1>
        <p className="text-xl text-brand-muted-sage max-w-3xl mx-auto">
          Track your progress, continue learning, and view your certifications.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={40} className="animate-spin text-brand-deep-teal" />
        </div>
      ) : (
        <div className="space-y-12">
          {/* Memberships Section */}
          {membershipEnrollments.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                <Award className="text-brand-gold" /> Active Memberships
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {membershipEnrollments.map((enrollment) => {
                  const courseInfo = courses.find(c => c.id === enrollment.courseId) || {};
                  return (
                    <div key={enrollment.id} className="bg-gradient-to-br from-brand-navy to-[#1e344d] rounded-2xl shadow-sm border border-brand-gold/30 flex flex-col group hover:shadow-lg transition-shadow text-white p-6 relative">
                       <Award size={40} className="text-brand-gold mb-4" />
                       <h3 className="text-xl font-bold mb-2 break-words text-brand-gold">{courseInfo.title || 'Fellows Membership'}</h3>
                       <p className="text-brand-sage-200 text-sm mt-1">Status: <span className="text-green-400 font-bold uppercase">Active</span></p>
                       <p className="text-brand-sage-200 text-sm mb-4 mt-2 h-full">
                         Enjoy exclusive access to content, talent network, and advanced resources.
                       </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Enrollments Section */}
          <section className="pt-4">
            <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-2">
              <BookOpen className="text-brand-deep-teal" /> Current Course Enrollments
            </h2>
            {courseEnrollments.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500 mb-4">You have not enrolled in any courses yet.</p>
                <Link to="/" className="text-brand-deep-teal font-semibold hover:underline">
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseEnrollments.map((enrollment) => {
                  const courseInfo = courses.find(c => c.id === enrollment.courseId) || {};
                  return (
                    <div key={enrollment.id} className="bg-white rounded-2xl shadow-sm border border-brand-sage-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                      {courseInfo && (
                        <div className="h-32 overflow-hidden relative">
                           <div className="absolute inset-0 bg-brand-navy/30 mix-blend-multiply z-10"></div>
                           <img 
                             src={
                               (courseInfo.title || '').includes('Advanced TDI') 
                                 ? courseAuthImage2 
                                 : (courseInfo.title || '').includes('Fundamentals of TDI') 
                                   ? courseAuthImage 
                                   : (courseInfo.title || '').includes('ICA Fellows Membership') 
                                     ? courseAuthImage3 
                                     : courseInfo.image || "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop"
                             } 
                             alt={courseInfo.title} 
                             className="w-full h-full object-cover" 
                           />
                        </div>
                      )}
                      <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                            enrollment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-brand-sage-100 text-brand-deep-teal'
                          }`}>
                            {enrollment.status}
                          </span>
                          <span className="text-sm font-semibold text-gray-500">{Math.round(enrollment.progress || 0)}% Completed</span>
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy mb-2 line-clamp-2">
                           {courseInfo.title || `Course Enrollment #${enrollment.courseId.slice(0, 5)}`}
                        </h3>
                        {courseInfo.duration && (
                          <p className="text-sm text-gray-500 mb-4">{courseInfo.duration}</p>
                        )}
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div className="bg-brand-deep-teal h-2 rounded-full transition-all duration-500" style={{ width: `${enrollment.progress || 0}%` }}></div>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 border-t border-gray-100">
                        <Link 
                          to={`/course/${enrollment.courseId}/learn`}
                          className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <PlayCircle size={18} />
                          {enrollment.status === 'completed' ? 'Review Content' : 'Continue Course'}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Recommended Courses Section */}
          {recommendedCourses.length > 0 && (
             <section>
                <div className="flex justify-between items-end mb-6 border-t border-gray-100 pt-10">
                  <h2 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
                    <Compass className="text-brand-deep-teal" /> Recommended for You
                  </h2>
                  <Link to="/" className="text-brand-deep-teal font-semibold hover:underline flex items-center gap-1 text-sm hidden sm:flex">
                    Browse All <ArrowRight size={16} />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedCourses.slice(0, 4).map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                      <div className="h-32 overflow-hidden">
                        <img 
                          src={
                            (course.title || '').includes('Advanced TDI') 
                              ? courseAuthImage2 
                              : (course.title || '').includes('Fundamentals of TDI') 
                                ? courseAuthImage 
                                : (course.title || '').includes('ICA Fellows Membership') 
                                  ? courseAuthImage3 
                                  : course.image || "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop"
                          } 
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-deep-teal mb-2">
                          {course.category || course.tags?.[0] || 'Course'}
                        </span>
                        <h3 className="text-lg font-bold text-brand-navy leading-tight mb-2 flex-grow line-clamp-2">
                          {course.title}
                        </h3>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-500">{course.duration || 'Self-paced'}</span>
                          <Link 
                            to={`/course/${course.id}`}
                            className="bg-brand-sage-100 text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </section>
          )}

          {/* Certifications Section */}
          <section className="border-t border-gray-100 pt-10">
            <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-2">
              <Award className="text-brand-gold" /> My Certifications
            </h2>
            {certificates.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500">You haven't earned any certifications yet. Complete a course and pass the exam to get certified!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="relative bg-gradient-to-br from-brand-navy to-[#1e344d] text-white p-6 rounded-2xl shadow-md border border-brand-gold/30 flex flex-col">
                    <Award size={40} className="text-brand-gold mb-4" />
                    <h3 className="text-xl font-bold mb-2 break-words">{cert.courseTitle}</h3>
                    <p className="text-brand-sage-200 text-sm mb-4">
                      Score: {cert.score}%
                    </p>
                    <div className="text-xs text-gray-400 font-mono mt-auto pt-4 mb-4">ID: {cert.id}</div>
                    <button 
                      onClick={() => {
                        generateCertificate(
                          currentUser.displayName || currentUser.email || "Student",
                          cert.courseTitle,
                          cert.createdAt?.toDate ? cert.createdAt.toDate() : new Date(),
                          cert.id
                        );
                      }}
                      className="w-full mt-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
