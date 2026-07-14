import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { ChevronLeft, Loader2, CheckCircle } from 'lucide-react';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { db } from '../lib/firebase';
import { collection, addDoc, query, getDocs, where, getDoc, doc } from 'firebase/firestore';

export default function Checkout() {
  const { id, plan } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(true);
  
  const appId = import.meta.env.VITE_SQUARE_APP_ID;
  const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth?returnUrl=' + encodeURIComponent(`/checkout/${id}/${plan}`));
      return;
    }

    if (id) {
      localStorage.setItem('pendingCourseId', id);
      
      // Fetch course details to show name and price
      const fetchCourse = async () => {
        try {
          const docSnap = await getDoc(doc(db, 'courses', id));
          if (docSnap.exists()) {
            setCourse({ id: docSnap.id, ...docSnap.data() });
          }
        } catch (error) {
          console.error("Error fetching course", error);
        } finally {
          setLoadingCourse(false);
        }
      };
      
      fetchCourse();
    } else {
      setLoadingCourse(false);
    }
  }, [currentUser, navigate, id, plan]);

  if (!currentUser) return null;

  const getAmountInCents = () => {
    if (!course) return 33500; // default fallback
    
    // ATDIT is 3400
    if (course.title?.includes('Advanced TDI')) {
      return 340000;
    }
    
    // Fundamentals
    if (plan === 'single') {
      return 9500;
    }
    
    return 33500; // full fundamentals
  };
  
  const getDisplayPrice = () => {
    return '$' + (getAmountInCents() / 100).toFixed(2);
  };

  const handlePayment = async (token: string) => {
    setIsProcessing(true);
    setPaymentError(null);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceId: token,
          amount: getAmountInCents()
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        if (currentUser && id) {
          try {
            // Enroll the user immediately
            const enrollmentsRef = collection(db, 'enrollments');
            const q = query(
              enrollmentsRef, 
              where('userId', '==', currentUser.uid),
              where('courseId', '==', id)
            );
            
            const existingEnrollments = await getDocs(q);
            
            if (existingEnrollments.empty) {
              await addDoc(enrollmentsRef, {
                userId: currentUser.uid,
                courseId: id,
                status: 'enrolled',
                progress: 0,
                enrolledAt: new Date().toISOString(),
                plan: plan || 'full'
              });
            }
          } catch (err) {
            console.error("Failed to enroll user after payment:", err);
          }
        }
        
        setPaymentSuccess(true);
        // Automatically redirect to the learn page after 2 seconds
        setTimeout(() => {
          navigate(`/course/${id}/learn`);
        }, 2000);
      } else {
        setPaymentError(data.error || 'Payment failed');
      }
    } catch (err) {
      setPaymentError('Network error occurred during payment');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-warm-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(`/course/${id}`)}
          className="flex items-center gap-2 text-brand-navy font-medium mb-8 hover:text-brand-deep-teal transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Course Details
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-sage-200">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold font-heading text-brand-navy mb-4">Complete Your Enrollment</h1>
              {loadingCourse ? (
                 <Loader2 className="w-6 h-6 animate-spin text-brand-navy mx-auto" />
              ) : (
                <div className="bg-brand-navy/5 p-6 rounded-2xl inline-block text-left w-full max-w-md mx-auto">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Order Summary</p>
                  <p className="font-bold text-xl text-brand-navy mb-2">
                    {course?.title || 'Course Enrollment'}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {plan === 'single' ? 'Module 1 Only' : 'Full Program Access'}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="font-bold text-gray-700">Total</span>
                    <span className="font-bold text-2xl text-brand-deep-teal">{getDisplayPrice()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full max-w-md mx-auto">
              {paymentSuccess ? (
                <div className="text-center space-y-6 py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-2">Payment Successful!</h3>
                    <p className="text-gray-600">You are now enrolled in the program.</p>
                    <p className="text-sm text-gray-500 mt-2">Redirecting to your course dashboard...</p>
                  </div>
                  <button 
                    onClick={() => navigate(`/course/${id}/learn`)}
                    className="bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white font-bold py-3 px-6 rounded-xl transition-colors mt-6 w-full"
                  >
                    Go to Course Now
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {paymentError && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
                      {paymentError}
                    </div>
                  )}

                  {isProcessing && (
                    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-200">
                      <Loader2 className="w-8 h-8 animate-spin text-brand-deep-teal mb-4" />
                      <p className="text-gray-600 font-medium">Processing your payment...</p>
                    </div>
                  )}

                  {!isProcessing && (!appId || !locationId) ? (
                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200 text-center">
                      <p className="font-bold mb-2">Payment System Unavailable</p>
                      <p className="text-sm mb-4">Please check your Square configuration in the environment variables. You can continue with a mock payment for testing.</p>
                      <button 
                        onClick={() => handlePayment('fake-token')}
                        className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-3 px-4 rounded-xl transition-colors"
                      >
                        Mock Payment (Test)
                      </button>
                    </div>
                  ) : (!isProcessing && appId && locationId) ? (
                    <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[300px] relative">
                      <PaymentForm
                        applicationId={appId}
                        locationId={locationId}
                        cardTokenizeResponseReceived={(token, verifiedBuyer) => {
                          if (token.status === 'OK') {
                            handlePayment(token.token);
                          } else {
                            setPaymentError((token as any).errors?.[0]?.message || 'Card processing error');
                          }
                        }}
                      >
                        <CreditCard buttonProps={{
                          css: {
                            backgroundColor: '#1a365d',
                            color: '#ffffff',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            fontWeight: '600',
                            height: '48px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }
                        }} />
                      </PaymentForm>

                      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                        <button 
                          type="button"
                          onClick={() => handlePayment('fake-token')}
                          className="text-xs text-gray-400 hover:text-brand-navy underline transition-colors"
                        >
                          Having trouble? Bypass payment (Test Mode)
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
