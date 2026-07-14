import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Building, User, Mail, Phone, ArrowRight, CheckCircle2, Search, Target, Shield, Briefcase, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { submitToHubSpot } from '../lib/hubspot';

export default function Assessment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    email: '',
    phone: '',
    facilityCount: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Request a Preliminary Assessment | ICA TDI Model";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitToHubSpot({
        formId: import.meta.env.VITE_HUBSPOT_ASSESSMENT_FORM_ID || '5db47363-b1c9-41fe-927b-baed8a72c57e',
        fields: [
          { name: 'firstname', value: formData.firstName },
          { name: 'lastname', value: formData.lastName },
          { name: 'company', value: formData.organization },
          { name: 'jobtitle', value: formData.title },
          { name: 'email', value: formData.email },
          { name: 'phone', value: formData.phone },
          { name: 'how_many_facilities_operate_under_your_organization', value: formData.facilityCount },
          { name: 'message', value: formData.message }
        ]
      });
    } catch (error) {
      console.error('HubSpot submission error', error);
      // Fall through to show success state anyway
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-brand-warm-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-soft-teal rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold font-heading text-white mb-6"
            >
              Request a Preliminary Assessment
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-light-gray leading-relaxed mb-4"
            >
              Take the first step toward transforming your organization's dementia care culture through the TDI Model.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Information Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-brand-navy mb-6 font-heading">What to Expect</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-deep-teal/10 flex items-center justify-center text-brand-deep-teal shrink-0">
                    <Search size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy mb-1">Deep Analysis</h4>
                    <p className="text-sm text-gray-600">A comprehensive review of your facility's current dementia care approach, staff retention metrics, and organizational culture.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy mb-1">Custom Implementation Plan</h4>
                    <p className="text-sm text-gray-600">We outline a step-by-step pathway for training, certifying Dementia Coaches, and rolling out the TDI Model.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-soft-teal/10 flex items-center justify-center text-brand-soft-teal shrink-0">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy mb-1">ROI Projections</h4>
                    <p className="text-sm text-gray-600">Clear forecasts on how the TDI Model can reduce turnover costs, decrease medication usage and hospitalization, and improve occupancy rates.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-navy rounded-3xl p-8 shadow-lg text-white">
              <h3 className="text-xl font-bold font-heading mb-4">Direct Communication</h3>
              <p className="text-brand-light-gray text-sm mb-6">Need immediate assistance? Connect directly with our administration team to set up a consultation.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-brand-gold shrink-0" size={20} />
                  <a href="mailto:info@ICAcares.com" className="text-sm hover:text-brand-gold transition-colors">info@ICAcares.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-brand-gold shrink-0" size={20} />
                  <a href="tel:+12077699447" className="text-sm hover:text-brand-gold transition-colors">+1 (207) 769-9447</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              {isSubmitted ? (
                <div className="text-center py-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="text-green-600 w-10 h-10" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-brand-navy mb-4 font-heading">Request Received</h2>
                  <p className="text-lg text-gray-600 max-w-lg mx-auto mb-8">
                    Thank you for your interest in the TDI Model. Our team will review your organization's preliminary information and reach out within 2 business days to schedule the next steps.
                  </p>
                  <Link 
                    to="/tdi-model"
                    className="inline-flex items-center gap-2 text-brand-deep-teal font-bold hover:text-brand-navy transition-colors"
                  >
                    Return to TDI Model Insights <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-8 border-b border-gray-100 pb-6">
                    <h2 className="text-2xl font-bold text-brand-navy font-heading mb-2">Organization Details</h2>
                    <p className="text-gray-500 text-sm">Please provide some basic information regarding your facilities so we can better tailor our initial consultation.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-semibold text-gray-700">First Name <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            required 
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-deep-teal focus:border-brand-deep-teal transition-colors"
                            placeholder="Jane"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-semibold text-gray-700">Last Name <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            required 
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-deep-teal focus:border-brand-deep-teal transition-colors"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="organization" className="text-sm font-semibold text-gray-700">Organization / Facility Name <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building size={18} className="text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            id="organization" 
                            name="organization" 
                            required 
                            value={formData.organization}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-deep-teal focus:border-brand-deep-teal transition-colors"
                            placeholder="Sunrise Senior Living"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-semibold text-gray-700">Your Title / Role <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase size={18} className="text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            required 
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-deep-teal focus:border-brand-deep-teal transition-colors"
                            placeholder="Executive Director"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700">Work Email <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-400" />
                          </div>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-deep-teal focus:border-brand-deep-teal transition-colors"
                            placeholder="jane@organization.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={18} className="text-gray-400" />
                          </div>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-deep-teal focus:border-brand-deep-teal transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="facilityCount" className="text-sm font-semibold text-gray-700">How many facilities operate under your organization? <span className="text-rose-500">*</span></label>
                      <select 
                        id="facilityCount" 
                        name="facilityCount" 
                        required
                        value={formData.facilityCount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-deep-teal focus:border-brand-deep-teal transition-colors"
                      >
                        <option value="" disabled>Select an option</option>
                        <option value="1">1 Facility (Single Location)</option>
                        <option value="2-5">2 - 5 Facilities</option>
                        <option value="6-15">6 - 15 Facilities</option>
                        <option value="16-50">16 - 50 Facilities</option>
                        <option value="50+">50+ Facilities</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-semibold text-gray-700">Primary Care Challenges or Goals</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-deep-teal focus:border-brand-deep-teal transition-colors resize-none"
                        placeholder="Tell us about your most pressing challenges, e.g., staff turnover, training gaps, or resident behaviors..."
                      ></textarea>
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>Submitting... <Loader2 className="w-5 h-5 animate-spin" /></>
                        ) : (
                          <>
                            Submit Request for Assessment
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                      <p className="text-xs text-gray-500 text-center mt-4">
                        By submitting this form, you agree to allow our team to reach out regarding the TDI Model. Your information is kept strictly confidential.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
          
        </div>
      </section>
    </div>
  );
}
