'use client'
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '', 
    password: '',
    confirmPassword: '',
    email: '',
    captcha: ''
  });
  const [captchaCode, setCaptchaCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

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
    setError('');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Reset captcha field for retry
    const resetCaptcha = () => {
      generateCaptcha();
      setFormData(prev => ({ ...prev, captcha: '' }));
    };

    try {
      // Validation checks
      if (formData.captcha !== captchaCode) {
        setError('Invalid captcha. Please try again.');
        resetCaptcha();
        return;
      }

      if (!formData.firstName || !formData.lastName || !formData.password ||
          !formData.confirmPassword || !formData.email) {
        setError('Please fill in all fields');
        return;
      }

      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      if (!agreedToTerms) {
        setError('Please agree to the terms and conditions');
        return;
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      // Save user data in Firestore
      await setDoc(doc(db, 'jobusers', userCredential.user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: 'user',
        createdAt: new Date().toISOString(),
        uid: userCredential.user.uid
      });

      /*alert('Registration successful! Redirecting to login...');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 1000);*/
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific Firebase errors
      let errorMessage = 'Registration failed. ';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += 'This email is already registered.';
          break;
        case 'auth/weak-password':
          errorMessage += 'Password is too weak.';
          break;
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/network-request-failed':
          errorMessage += 'Network error. Please check your connection.';
          break;
        default:
          errorMessage += error.message;
      }
      
      setError(errorMessage);
      resetCaptcha();
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h3 className="text-white text-2xl font-light mb-1">REGISTER</h3>
          <p className="text-slate-400 text-sm">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
              value={formData.firstName} 
              onChange={handleChange} 
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 px-3 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 text-sm" 
              required
            />
            <input 
              type="text" 
              name="lastName" 
              placeholder="Last Name" 
              value={formData.lastName} 
              onChange={handleChange} 
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 px-3 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 text-sm" 
              required
            />
          </div>

          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 px-3 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 text-sm" 
            required 
          />

          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 px-2 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 text-sm" 
            required 
          />

          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 px-3 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 text-sm" 
            required 
          />

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div 
                onClick={generateCaptcha} 
                title="Click to refresh captcha" 
                className="px-3 py-2.5 bg-teal-500 text-slate-900 rounded-lg font-mono font-bold text-lg tracking-wider cursor-pointer hover:bg-teal-400 select-none text-sm"
              >
                {captchaCode}
              </div>
              <input 
                type="text" 
                name="captcha" 
                placeholder="Enter captcha" 
                value={formData.captcha} 
                onChange={handleChange} 
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg py-2.5 px-3 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 text-sm" 
                required 
              />
            </div>
            <p className="text-xs text-slate-400">Click on captcha to refresh</p>
          </div>

          <div className="flex items-start space-x-3">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreedToTerms} 
              onChange={(e) => setAgreedToTerms(e.target.checked)} 
              className="mt-0.5 w-4 h-4 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500" 
              required 
            />
            <label htmlFor="terms" className="text-sm text-slate-300">
              I agree to the <span className="text-teal-400 cursor-pointer hover:underline">Terms and Conditions</span> and <span className="text-teal-400 cursor-pointer hover:underline">Privacy Policy</span>
            </label>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900 bg-opacity-30 py-2 px-3 rounded-lg border border-red-500 border-opacity-30">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-800 transform hover:scale-105 transition-all duration-200 text-sm"
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-slate-400 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-teal-400 hover:text-teal-300 cursor-pointer font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}