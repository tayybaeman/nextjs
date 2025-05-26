'use client'
import React, { useState } from 'react';
import { Phone, MapPin, Mail, Send, User, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check if name is empty
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    
    // Check if email is empty
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else {
      // Check if email format is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    // Check if message is empty
    if (!formData.message.trim()) {
      newErrors.message = 'Please write a message';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // If no errors, submit the form
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  

  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black-900 to-black" />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="text-center py-4 px-4 bg-gradient-to-r from-blue-600/20 to-slate-800/20">
            <h1 className="text-2xl font-bold text-white mb-1">Contact Us</h1>
            <p className="text-blue-200 text-sm">Any questions? Just write us a message!</p>
          </div>
          
          <div className="p-4">
            {/* Contact Form */}
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your Name"
                    className={`w-full pl-8 pr-3 py-2 text-sm bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-1 transition-all ${
                      errors.name 
                        ? 'border-red-400 focus:ring-red-400' 
                        : 'border-white/20 focus:ring-blue-400'
                    }`}
                  />
                  <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter valid email"
                    className={`w-full pl-8 pr-3 py-2 text-sm bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-1 transition-all ${
                      errors.email 
                        ? 'border-red-400 focus:ring-red-400' 
                        : 'border-white/20 focus:ring-blue-400'
                    }`}
                  />
                  <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message..."
                    rows={2}
                    className={`w-full pl-8 pr-3 py-2 text-sm bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-1 resize-none transition-all ${
                      errors.message 
                        ? 'border-red-400 focus:ring-red-400' 
                        : 'border-white/20 focus:ring-blue-400'
                    }`}
                  />
                  <MessageSquare className="absolute left-2 top-3 text-blue-300 w-4 h-4" />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                SUBMIT
              </button>
            </div>
            
            {/* Contact Information */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {/* About Club */}
              <div className="group">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-500/30 transition-all">
                  <User className="w-5 h-5 text-blue-300" />
                </div>
                <h3 className="text-white font-medium text-xs mb-1">ABOUT CLUB</h3>
                <p className="text-blue-200 text-xs">Running Guide</p>
                <p className="text-blue-200 text-xs">Workouts</p>
              </div>
              
              {/* Phone */}
              <div className="group">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-500/30 transition-all">
                  <Phone className="w-5 h-5 text-blue-300" />
                </div>
                <h3 className="text-white font-medium text-xs mb-1">PHONE</h3>
                <p className="text-blue-200 text-xs">+912 567 8987</p>
                <p className="text-blue-200 text-xs">+912 252 3336</p>
              </div>
              
              {/* Location */}
              <div className="group">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-500/30 transition-all">
                  <MapPin className="w-5 h-5 text-blue-300" />
                </div>
                <h3 className="text-white font-medium text-xs mb-1">LOCATION</h3>
                <p className="text-blue-200 text-xs">Design Studio</p>
                <p className="text-blue-200 text-xs">Colorado, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Small floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-300 rounded-full opacity-50 animate-pulse"></div>
      </div>
    </div>
  );
}