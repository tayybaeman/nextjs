// components/ProtectedRoute.js
import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push('/login');
        return;
      }
      
      if (requiredRole && userRole !== requiredRole) {
        // Redirect to appropriate dashboards
        if (userRole === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user');
        }
      }
    }
  }, [currentUser, userRole, loading, router, requiredRole]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!currentUser) {
    return null;
  }

  if (requiredRole && userRole !== requiredRole) {
    return null;
  }

  return children;
}