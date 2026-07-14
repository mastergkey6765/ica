import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, Briefcase, Star, ChevronRight, Loader2, CheckCircle } from 'lucide-react';
import { Presentation } from 'lucide-react'; // Re-using an existing icon
import { submitToHubSpot } from '../lib/hubspot';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, query, getDocs, where } from 'firebase/firestore';

const JoinICA = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    occupation: "",
    plan: "monthly",
    comments: ""
  });

  React.useEffect(() => {
    document.title = "Join ICA | International Caregivers Association LLC";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (plan: string) => {
    setFormData((prev) => ({ ...prev, plan }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitToHubSpot({
        formId: import.meta.env.VITE_HUBSPOT_JOIN_FORM_ID || '27292cf6-fff8-4b4b-91a4-976c1462fbe0',
        fields: [
          { name: 'firstname', value: formData.firstName },
          { name: 'lastname', value: formData.lastName },
          { name: 'email', value: formData.email },
          { name: 'phone', value: formData.phone },
          { name: 'jobtitle', value: formData.occupation },
          { name: 'message', value: formData.comments },
          { name: 'plan', value: formData.plan }
        ]
      });
    } catch (error) {
      console.error('HubSpot submission error', error);
      // Continue to payment even if hubspot fails
    } finally {
      setIsSubmitting(false);
      setPaymentStep(true);
    }
  };

  const handlePayment = async (token: string) => {
    try {
      setPaymentError(null);
      
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceId: token,
          plan: formData.plan
        }),
      });

      const data = await response.json();
      if (data.success) {
        if (currentUser) {
          try {
            // Find the membership course
            const coursesRef = collection(db, 'courses');
            const coursesSnap = await getDocs(coursesRef);
            let membershipCourseId = null;
            
            coursesSnap.forEach(doc => {
              const data = doc.data();
              if (data.category === 'Membership' || data.title?.includes('Membership')) {
                membershipCourseId = doc.id;
              }
            });

            // If we couldn't find one in the DB, default to c3 (DEFAULT_COURSES)
            if (!membershipCourseId) {
              membershipCourseId = 'c3';
            }

            // Check if already enrolled to prevent duplicates
            const enrollmentsRef = collection(db, 'enrollments');
            const q = query(
              enrollmentsRef, 
              where('userId', '==', currentUser.uid),
              where('courseId', '==', membershipCourseId)
            );
            
            const existingEnrollments = await getDocs(q);
            
            if (existingEnrollments.empty) {
              await addDoc(enrollmentsRef, {
                userId: currentUser.uid,
                courseId: membershipCourseId,
                status: 'enrolled',
                progress: 0,
                enrolledAt: new Date().toISOString()
              });
            }
          } catch (err) {
            console.error("Failed to enroll user after payment:", err);
            // We still show success even if this fails, they paid successfully
          }
        }
        setPaymentSuccess(true);
      } else {
        setPaymentError(data.error || 'Payment failed');
      }
    } catch (err: any) {
      console.error(err);
      setPaymentError('An error occurred during payment processing.');
    }
  };

  const appId = import.meta.env.VITE_SQUARE_APP_ID;
  const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;

  return (
    <div className="bg-brand-light-gray min-h-screen">
      <section className="bg-brand-navy pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-deep-teal rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-deep-teal/30 border border-brand-soft-teal/30 text-brand-soft-teal px-4 py-2 rounded-full text-sm font-bold tracking-wide mb-6 uppercase"
          >
            Join the Movement
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white leading-tight mb-6"
          >
            Become an ICA Fellow
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-light-gray max-w-3xl mx-auto leading-relaxed mt-4"
          >
            Your ideas, experience, and membership dues are an investment in a better world for many, and personal development for yourself.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <HeartHandshake className="w-32 h-32" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-brand-navy mb-6">
                  Your Personal Invitation
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-4 text-brand-deep-teal font-medium">
                  Dear Potential ICA Fellow,
                </p>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    The mission of the International Caregivers Association LLC is to elevate the standards of dementia care. By joining us as an ICA Fellow, you join others who support that mission. I founded the ICA over 20 years ago, initially for personal reasons. First, my late husband was diagnosed with vascular dementia, and also I was able to appreciate the need to elevate the standards of dementia care and services. I have dedicated my entire career to relentlessly pursuing that mission and changing the course of dementia care.
                  </p>
                  <p>
                    The work of the ICA around the globe is essential, and so is your membership. Your support helps the ICA fuel the growing needs in dementia care; the urgent need to build a new model of dementia care such as the Transactional Dementia Intelligence business model of dementia care (TDI) that makes existing models obsolete; and our urgent need to provide the best possible life for everyone living with memory loss, no matter where they live in the world.
                  </p>
                  <p>
                    At the heart, we seek to provide you with the information and perspectives that will enrich the daily lives of those living with memory loss/dementia and their care providers. I'm so glad you've joined us on this journey.
                  </p>
                  <p className="font-heading font-bold text-xl text-brand-navy mt-6">
                    Sincerely, <br />
                    <span className="text-brand-gold text-2xl">Dr. Éthelle G. Lord</span>
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold font-heading text-brand-navy mb-4">
                    ICA Fellow Status Has Its Privileges... and Cost Savings!
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    When you become an ICA Fellow, you become part of a global movement to make a difference in the lives of the many millions touched by dementia. The ICA is at the center of defining the new best practice for dementia care. All you need to bring with you is a driving curiosity to learn and a passion to make a difference for the next 50 years!
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-brand-gold flex gap-6">
                    <div className="bg-brand-warm-white p-4 rounded-full h-fit shrink-0">
                      <Star className="w-8 h-8 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-navy mb-2">FREE: Content & Research Access</h4>
                      <p className="text-gray-700 leading-relaxed">
                        As an industry thought leader, ICA is continually researching major breakthroughs in dementia care. As an ICA Fellow, you get unfettered access to our broad spectrum of content: blogs, podcasts, webinars, white papers, and much more! Receive special Member-Only offers and stay attuned to the new best practice in dementia care.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-brand-deep-teal flex gap-6">
                    <div className="bg-brand-warm-white p-4 rounded-full h-fit shrink-0">
                      <Presentation className="w-8 h-8 text-brand-deep-teal" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-navy mb-2">FREE: Quarterly Updates & Consultation</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Dr. Lord and the ICA leadership team are committed to briefing caregivers on the best practices. Once a quarter, ICA hosts an industry Zoom call featuring the sharpest minds to share their experience. You learn in hours what would otherwise take months or years!
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-brand-navy flex gap-6">
                    <div className="bg-brand-warm-white p-4 rounded-full h-fit shrink-0">
                      <Briefcase className="w-8 h-8 text-brand-navy" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-navy mb-2">FREE: ICA Dementia Talent/Jobs Bank</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Staffing is a vital issue in dementia care. Whether looking for the right job or the right person to fill openings, the ICA Jobs Bank is your answer. Don't settle for second best when you can pick from the very best. Enjoy this amazing benefit free!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden sticky top-28"
              >
                <div className="bg-brand-navy p-8 text-center text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-xl -mr-10 -mt-10"></div>
                  <Star className="w-12 h-12 text-brand-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-bold font-heading mb-2">Introductory Offer</h3>
                  <p className="text-brand-light-gray">
                    Join the fastest-growing dementia care organization at a 50% discount off the regular $29.95 dues.
                  </p>
                </div>
                
                <div className="p-8">
                  {paymentSuccess ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-brand-deep-teal mx-auto mb-4" />
                      <h4 className="text-2xl font-bold font-heading text-brand-navy mb-4">Payment Successful!</h4>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        Thank you for joining the International Caregivers Association. You now have access to our fellowship benefits.
                      </p>
                      <button 
                        onClick={() => window.location.href = currentUser ? '/dashboard' : '/auth?mode=signup'}
                        className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                      >
                        {currentUser ? 'Access My Dashboard' : 'Create Account to Access Content'}
                      </button>
                    </div>
                  ) : paymentStep ? (
                    <div>
                      <button 
                        onClick={() => setPaymentStep(false)}
                        className="text-sm text-gray-500 hover:text-brand-navy mb-4 font-semibold"
                      >
                        &larr; Back to Details
                      </button>
                      <h4 className="text-xl font-bold font-heading text-brand-navy mb-6">
                        Complete Your Payment
                      </h4>
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Total Due Today:</span>
                        <span className="text-2xl font-bold text-brand-navy">
                          ${formData.plan === 'yearly' ? '145.00' : '14.95'}
                        </span>
                      </div>
                      
                      {paymentError && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md">
                          {paymentError}
                        </div>
                      )}

                      {!appId || !locationId ? (
                        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
                          <p className="font-bold mb-2">Payment System Unavailable</p>
                          <p className="text-sm mb-4">Square payment is currently unavailable (missing configuration). You can use a mock payment to test the flow.</p>
                          <button 
                            onClick={() => handlePayment('fake-token')}
                            className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-3 px-4 rounded-xl transition-colors"
                          >
                            Mock Payment (Test)
                          </button>
                        </div>
                      ) : (
                    <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[300px] relative">
                      <PaymentForm
                        applicationId={appId}
                        locationId={locationId}
                        cardTokenizeResponseReceived={(token, verifiedBuyer) => {
                          if (token.status === 'OK') {
                            handlePayment(token.token);
                          } else {
                            setPaymentError((token as any).errors?.[0]?.message || 'Card error');
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
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">Choose Your Plan</label>
                        <div className="grid grid-cols-1 gap-4">
                          <div 
                            onClick={() => handlePlanChange("monthly")}
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${formData.plan === "monthly" ? "border-brand-navy bg-brand-navy/5" : "border-gray-200 hover:border-brand-navy/30"}`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.plan === "monthly" ? "border-brand-navy" : "border-gray-300"}`}>
                                  {formData.plan === "monthly" && <div className="w-2.5 h-2.5 bg-brand-navy rounded-full"></div>}
                                </div>
                                <span className="font-bold text-brand-navy">Monthly Fellowship</span>
                              </div>
                              <span className="font-bold text-lg text-brand-navy">$14.95<span className="text-sm text-gray-500 font-normal">/mo</span></span>
                            </div>
                          </div>

                          <div 
                            onClick={() => handlePlanChange("yearly")}
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden ${formData.plan === "yearly" ? "border-brand-gold bg-brand-gold/5" : "border-gray-200 hover:border-brand-gold/30"}`}
                          >
                            <div className="absolute top-0 right-0 bg-brand-gold text-brand-navy text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">Save $30</div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.plan === "yearly" ? "border-brand-gold" : "border-gray-300"}`}>
                                  {formData.plan === "yearly" && <div className="w-2.5 h-2.5 bg-brand-gold rounded-full"></div>}
                                </div>
                                <span className="font-bold text-brand-navy">Annual Fellowship</span>
                              </div>
                              <span className="font-bold text-lg text-brand-navy">$145.00<span className="text-sm text-gray-500 font-normal">/yr</span></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                          <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                          <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">How do you look to benefit most?</label>
                        <textarea name="comments" rows={3} value={formData.comments} onChange={handleChange} placeholder="Tell us about yourself and your goals..." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all resize-none"></textarea>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-bold text-lg py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>Processing... <Loader2 className="w-5 h-5 animate-spin" /></>
                        ) : (
                          <>Continue to Payment <ChevronRight className="w-5 h-5" /></>
                        )}
                      </button>
                      <p className="text-xs text-gray-500 text-center leading-relaxed">
                        By joining, you will be added to our distribution list for content, updates, and discounted prices. Your application will be processed immediately upon receipt of first dues.
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brand-warm-white p-8 rounded-3xl border border-gray-200 text-center lg:sticky lg:top-[850px]"
              >
                <h4 className="font-bold text-brand-navy mb-4 text-xl">Questions?</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are here to help! Reach out to us if you need any assistance with your membership.
                </p>
                <div className="space-y-2 font-medium text-brand-deep-teal">
                  <a href="tel:+12077699447" className="block hover:text-brand-navy transition-colors">📱 +1 (207) 769-9447</a>
                  <a href="mailto:info@ICAcares.com" className="block hover:text-brand-navy transition-colors">✉️ info@ICAcares.com</a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinICA;

