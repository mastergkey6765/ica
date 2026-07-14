import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { addDoc, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { Loader2, CheckCircle } from 'lucide-react';

export default function PaymentConfirmation() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [enrolledCourseId, setEnrolledCourseId] = useState<string | null>(null);

  useEffect(() => {
    const storedCourseId = localStorage.getItem('pendingCourseId');
    if (storedCourseId) {
      setEnrolledCourseId(storedCourseId);
    }

    if (!currentUser) {
      // If they somehow aren't logged in, send them to login and return here
      navigate('/auth?returnUrl=/payment-confirmation');
      return;
    }

    if (!storedCourseId) {
      // No course was queued in memory
      setStatus('error');
      return;
    }

    const completeEnrollment = async () => {
      try {
        // Check if already enrolled to prevent duplicates
        const q = query(
          collection(db, 'enrollments'), 
          where('userId', '==', currentUser.uid),
          where('courseId', '==', storedCourseId)
        );
        const docs = await getDocs(q);
        
        if (docs.empty) {
          // Grant access
          await addDoc(collection(db, 'enrollments'), {
             userId: currentUser.uid,
             courseId: storedCourseId,
             status: 'enrolled',
             progress: 0,
             createdAt: serverTimestamp(),
             updatedAt: serverTimestamp(),
          });
        }
        
        setStatus('success');
        localStorage.removeItem('pendingCourseId'); // Clear to prevent loops

      } catch (err) {
        console.error("Failed to complete enrollment:", err);
        setStatus('error');
      }
    };

    completeEnrollment();
  }, [currentUser, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-warm-white">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-brand-sage-200">
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-brand-deep-teal animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-brand-navy">Verifying Payment...</h2>
            <p className="text-gray-500 mt-2">Please don't close this window.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
               <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-8">You are now enrolled in the program. You can start learning immediately!</p>
            <button 
              onClick={() => navigate(enrolledCourseId ? `/course/${enrolledCourseId}/learn` : '/dashboard')}
              className="bg-brand-deep-teal text-white w-full py-4 rounded-xl font-bold hover:bg-brand-deep-teal/90 transition-colors shadow-lg"
            >
              Go to Course Dashboard
            </button>
          </div>
        )}

        {status === 'error' && (
           <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Verification Issue</h2>
            <p className="text-gray-600 mb-8">
              We couldn't automatically verify your enrollment or you may be missing course details.
              If your payment went through, your account will be updated shortly or you can contact support.
            </p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-brand-navy text-white w-full py-4 rounded-xl font-bold hover:bg-brand-navy/90 transition-colors"
            >
              Go to My Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
