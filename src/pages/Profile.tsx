import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { updateProfile } from 'firebase/auth';
import { Loader2, User, Mail, ShieldCheck } from 'lucide-react';

export default function Profile() {
  const { currentUser, isAdmin } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  if (!currentUser) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName,
        });
        setMessage('Profile updated successfully!');
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-[70vh]">
      <div className="bg-white rounded-3xl shadow-sm border border-brand-sage-200 overflow-hidden">
        <div className="bg-brand-navy p-8 sm:p-12 text-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-brand-deep-teal/30 rounded-full flex items-center justify-center border-4 border-white/10 backdrop-blur-sm">
              <User size={48} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading mb-2">
                {currentUser.displayName || 'My Profile'}
              </h1>
              <p className="text-brand-sage-100 flex items-center gap-2">
                <Mail size={16} />
                {currentUser.email}
              </p>
              {isAdmin && (
                <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold text-brand-navy text-xs font-bold rounded-full">
                  <ShieldCheck size={14} />
                  Administrator
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
          
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 border border-brand-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-gray-50"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={currentUser.email || ''}
                readOnly
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
                title="Email cannot be changed here"
              />
            </div>

            {message && (
              <div className={`p-4 rounded-xl text-sm ${message.includes('Error') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : null}
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
