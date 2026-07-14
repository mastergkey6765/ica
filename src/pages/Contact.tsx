import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from 'lucide-react';
import { submitToHubSpot } from '../lib/hubspot';

const Contact = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitToHubSpot({
        formId: import.meta.env.VITE_HUBSPOT_CONTACT_FORM_ID || '34a9d831-6e3b-4323-87f2-cf6e729e5c63',
        fields: [
          { name: 'firstname', value: formData.firstName },
          { name: 'lastname', value: formData.lastName },
          { name: 'email', value: formData.email },
          { name: 'phone', value: formData.phone },
          { name: 'subject_form', value: formData.subject },
          { name: 'message', value: formData.message }
        ]
      });
      alert('Thank you for contacting us! We will get back to you shortly.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (error) {
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-light-gray min-h-screen">
      {/* Hero Section */}
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
            Get in Touch
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white leading-tight mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-lg md:text-xl text-brand-light-gray max-w-3xl mx-auto leading-relaxed"
          >
            We're here to answer your questions, provide support, and assist you in redefining dementia care.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold font-heading text-brand-navy mb-6">Get In Touch</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  Whether you have questions about our certifications, need coaching, or want to partner with us, our team is ready to help.
                </p>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
                      <Phone className="w-6 h-6 text-brand-deep-teal" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy text-lg mb-1">Phone / Text</h4>
                      <p className="text-gray-600 mb-1">Available for calls and text messages.</p>
                      <a href="tel:+12077699447" className="text-brand-deep-teal font-medium hover:text-brand-navy hover:underline transition-colors text-lg">
                        +1 (207) 769-9447
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
                      <Mail className="w-6 h-6 text-brand-deep-teal" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy text-lg mb-1">Email Support</h4>
                      <p className="text-gray-600 mb-1">Send us an email anytime.</p>
                      <a href="mailto:info@ICAcares.com" className="text-brand-deep-teal font-medium hover:text-brand-navy hover:underline transition-colors text-lg">
                        info@ICAcares.com
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-brand-deep-teal" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy text-lg mb-1">Consulting Hours</h4>
                      <p className="text-gray-600">
                        Dr. Lord serves a global clientele around the world and can be scheduled anytime, anywhere, 24/7 based on appointment availability.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brand-navy p-8 rounded-3xl shadow-xl text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-brand-gold">Looking for a Speaker?</h3>
                <p className="text-brand-light-gray leading-relaxed mb-6">
                  Dr. Éthelle G. Lord is available for keynotes, workshops, and speaking engagements worldwide.
                </p>
                <a href="/ica-consultants" className="inline-block bg-white text-brand-navy px-6 py-3 rounded-lg font-bold hover:bg-brand-light-gray transition-colors">
                  Book Dr. Lord
                </a>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
              >
                <h3 className="text-2xl font-bold font-heading text-brand-navy mb-8">Send Us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input 
                        type="text" 
                        name="firstName" 
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input 
                        type="text" 
                        name="lastName" 
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Training & Certification">Training & Certification</option>
                      <option value="Consulting Services">Consulting Services</option>
                      <option value="Speaking Request">Speaking Request</option>
                      <option value="Membership Support">Membership Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea 
                      name="message" 
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-deep-teal hover:bg-brand-deep-teal-hover text-white font-bold text-lg py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Sending... <Loader2 className="w-5 h-5 animate-spin" /></>
                    ) : (
                      <>Send Message <Send className="w-5 h-5" /></>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
