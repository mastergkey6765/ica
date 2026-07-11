import { Navigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, isAdmin, isAuthor, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 size={40} className="animate-spin text-brand-deep-teal" />
      </div>
    );
  }

  if (!currentUser || (!isAdmin && !isAuthor)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
