import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { Loader2, Plus, Trash2, UserPlus } from 'lucide-react';

export default function AuthorManager() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'authors'),
      (snapshot) => {
        setAuthors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'authors');
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const handleAddAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    setIsSubmitting(true);
    try {
      await setDoc(doc(db, 'authors', newEmail.trim().toLowerCase()), {
        email: newEmail.trim().toLowerCase(),
        addedAt: new Date().toISOString()
      });
      setNewEmail('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'authors');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveAuthor = async (emailId: string) => {
    try {
      await deleteDoc(doc(db, 'authors', emailId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'authors');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-sage-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-brand-navy mb-2">Author Management</h2>
        <p className="text-gray-600 text-sm">
          Add emails of users who are allowed to publish and edit articles. They must sign up with this exact email to gain access.
        </p>
      </div>

      <form onSubmit={handleAddAuthor} className="flex gap-4 mb-8">
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter author's email"
          required
          className="flex-1 px-4 py-2 border border-brand-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-deep-teal bg-brand-warm-white/50"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-brand-deep-teal hover:bg-brand-deep-teal/90 rounded-lg text-white font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
          Add Author
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 size={24} className="animate-spin text-brand-deep-teal" />
        </div>
      ) : authors.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-500">No authors added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {authors.map((author) => (
            <div key={author.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-sage/30 flex items-center justify-center text-brand-deep-teal font-bold uppercase">
                  {author.id.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{author.id}</p>
                  <p className="text-xs text-gray-500">Added: {author.addedAt ? new Date(author.addedAt).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveAuthor(author.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                title="Remove Author"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
