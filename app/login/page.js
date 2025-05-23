'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '', // Changed from name to email
    password: '',
    role: '',
    captcha: ''
  });
  const [captchaCode, setCaptchaCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const ADMIN_CREDENTIALS = {
    email: 'admin@admin.com', // Use email instead of name
    password: 'admin123'
  };

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    console.log('now user object ', formData );
    
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.captcha !== captchaCode) {
      setError('Invalid captcha. Please try again.');
      generateCaptcha();
      setFormData({ ...formData, captcha: '' });
      setLoading(false);
      return;
    }

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }


    console.log('role is sub ', formData);
    

      if (formData.role == 'admin') {
          if (formData.email == ADMIN_CREDENTIALS.email && 
              formData.password == ADMIN_CREDENTIALS.password) {
            alert('Admin login successful!');
            router.push('/admin');

            return;
          } 
        }



    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, 'jobusers', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Check if admin credentials match
        if (formData.role === 'admin') {
          if (formData.email === ADMIN_CREDENTIALS.email && 
              formData.password === ADMIN_CREDENTIALS.password) {
            alert('Admin login successful!');
            router.push('/admin');
          } else {
            setError('Invalid admin credentials.');
            setLoading(false);
            return;
          }
        } else {
          // Regular user login
          alert('User login successful!');
          router.push('/user');
        }
      } else {
        setError('User data not found. Please register first.');
      }
      
    } catch (error) {
      setError(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-800 flex items-center justify-center px-2">
      <div className="w-full max-w-sm bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div>
            <div className="flex items-center space-x-2 mb-1">
              <div 
                className="px-3 py-1 rounded-md font-mono text-base font-bold tracking-wider cursor-pointer hover:opacity-80"
                style={{ backgroundColor: '#8fbbdc', color: 'black' }}
                onClick={generateCaptcha}
                title="Click to refresh captcha"
              >
                {captchaCode}
              </div>
              <input
                type="text"
                name="captcha"
                placeholder="Enter captcha"
                value={formData.captcha}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <p className="text-xs text-gray-400">Click on captcha to refresh</p>
          </div>

          {error && (
            <div className="text-red-400 text-xs text-center bg-red-900/20 py-2 px-4 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-md transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>

          {formData.role === 'user' && (
            <div className="text-center mt-3">
              <p className="text-gray-400 text-xs mb-1">
                Don't have an account?
              </p>
              <Link 
                href="/register"
                className="inline-block w-full py-2 px-3 bg-transparent bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg focus:outline-none transform hover:scale-105 text-md text-center"
              >
                Create Account
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}