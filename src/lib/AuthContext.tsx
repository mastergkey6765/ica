import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { AuthError, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isAuthor: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {},
  isAdmin: false,
  isAuthor: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'admin' | 'author' | 'user'>('user');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let role = 'user';
        if (user.email === 'workplace.prem@gmail.com') {
          role = 'admin';
        } else if (user.email) {
          try {
            const snap = await getDoc(doc(db, 'authors', user.email));
            if (snap.exists()) {
              role = 'author';
            }
          } catch (e: any) {
            // Ignore permission denied errors for regular users
            if (e?.code !== 'permission-denied') {
              console.error('Error fetching role:', e);
            }
          }
        }
        setUserRole(role as 'admin'|'author'|'user');
        setCurrentUser(user);
        setLoading(false);
      } else {
        setUserRole('user');
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  async function logout() {
    await signOut(auth);
  }

  const isAdmin = userRole === 'admin';
  const isAuthor = userRole === 'author';

  const value = {
    currentUser,
    loading,
    logout,
    isAdmin,
    isAuthor,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
