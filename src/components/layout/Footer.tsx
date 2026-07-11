import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t-4 border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-xl text-white">
              International Caregivers Association LLC
            </h3>
            <p className="text-brand-muted-sage text-sm leading-relaxed max-w-sm">
              Setting the new best practice in dementia and Alzheimer's care worldwide through the Transactional Dementia Intelligence™ Model (TDIM).
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/ICAssoc/" target="_blank" rel="noopener noreferrer" className="text-brand-muted-sage hover:text-brand-gold transition-colors"><Facebook size={20} /></a>
              <a href="https://www.linkedin.com/company/icacares" target="_blank" rel="noopener noreferrer" className="text-brand-muted-sage hover:text-brand-gold transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white border-b border-white/10 pb-2 inline-block">Explore Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/tdi" className="text-brand-muted-sage hover:text-white transition-colors text-sm">The TDI™ Model</Link></li>
              <li><Link to="/dr-lord" className="text-brand-muted-sage hover:text-white transition-colors text-sm">About Dr. Ethelle Lord</Link></li>
              <li><Link to="/academy" className="text-brand-muted-sage hover:text-white transition-colors text-sm">Training & Certifications</Link></li>
              <li><Link to="/resources" className="text-brand-muted-sage hover:text-white transition-colors text-sm">Educational Resources</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white border-b border-white/10 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <span className="text-brand-muted-sage text-sm max-w-[201px]">Mapleton, Maine 04757 United States</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold flex-shrink-0" />
                <a href="tel:+12077699447" className="text-brand-muted-sage text-sm hover:text-white">+1 (207) 769-9447</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold flex-shrink-0" />
                <a href="mailto:info@ICAcares.com" className="text-brand-muted-sage text-sm hover:text-white">info@ICAcares.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white border-b border-white/10 pb-2 inline-block">Stay Updated</h3>
            <p className="text-brand-muted-sage text-sm mb-4">
              Sign up for our upcoming newsletter on the latest insights in dementia care and training.
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all text-sm"
              />
              <button 
                type="button"
                className="w-full bg-brand-deep-teal hover:bg-brand-soft-teal text-white font-medium px-4 py-2.5 rounded-md transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-muted-sage/60 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} International Caregivers Association LLC. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-brand-muted-sage/60 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-brand-muted-sage/60 hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
