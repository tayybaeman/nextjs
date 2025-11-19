'use client'
import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Send, User, MessageSquare } from 'lucide-react';
import Header from '@/app/components/Header';

<Header />

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.2); }
        50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.5); }
      }
      .float-animation { animation: float 5s ease-in-out infinite; }
      .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    return () => { if (style.parentNode) document.head.removeChild(style); };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Enter your name';
    if (!formData.email.trim()) newErrors.email = 'Enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Enter a message';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 px-4 relative flex flex-col items-center text-white">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-black to-slate-800" />
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-24 h-24 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-16 w-28 h-28 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            GET IN TOUCH
          </h1>
          <p className="text-blue-200 mt-2 text-sm md:text-base">
            Ready to transform your hiring? Let's connect.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-xl p-6 w-full max-w-2xl border border-white/10 space-y-4 pulse-glow">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text" name="name" value={formData.name} onChange={handleInputChange}
                placeholder="Your Full Name"
                className={`w-full bg-white/5 pl-10 pr-3 py-3 rounded-lg text-white placeholder-blue-200 border ${
                  errors.name ? 'border-red-400' : 'border-white/20 focus:ring focus:ring-blue-400'
                }`}
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="relative">
              <input
                type="email" name="email" value={formData.email} onChange={handleInputChange}
                placeholder="your.email@example.com"
                className={`w-full bg-white/5 pl-10 pr-3 py-3 rounded-lg text-white placeholder-blue-200 border ${
                  errors.email ? 'border-red-400' : 'border-white/20 focus:ring focus:ring-blue-400'
                }`}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
          <div className="relative">
            <textarea
              name="message" rows={4} value={formData.message} onChange={handleInputChange}
              placeholder="Your message..."
              className={`w-full bg-white/5 pl-10 pr-3 py-3 rounded-lg text-white placeholder-blue-200 border resize-none ${
                errors.message ? 'border-red-400' : 'border-white/20 focus:ring focus:ring-blue-400'
              }`}
            />
            <MessageSquare className="absolute left-3 top-3 text-blue-300 w-4 h-4" />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit" disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </form>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-3 max-w-4xl w-full px-2">
          {/*
          <InfoCard icon={<Phone className="w-6 h-6 text-white" />} title="Call Us" lines={['+912 567 8987', '+912 252 3336']} />
          <InfoCard icon={<MapPin className="w-6 h-6 text-white" />} title="Visit Us" lines={['Design Studio', 'Colorado, USA']} />
          <InfoCard icon={<Mail className="w-6 h-6 text-white" />} title="Email Us" lines={['contact@geekoffice.com']} />
        */}
          </div>
      </main>
    </>
  );
}

const InfoCard = ({ icon, title, lines }) => (
  <div className=" float-animation text-center">
    <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl">
      {icon}
    </div>
    <h3 className="font-semibold text-sm mb-1">{title}</h3>
    {lines.map((line, idx) => (
      <p key={idx} className="text-blue-200 text-xs">{line}</p>
    ))}
  </div>
);
