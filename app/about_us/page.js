"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  Laptop,
  Code,
  Palette,
  Target,
  Rocket,
  Star,
  Zap,
  Brain,
  Heart,
  Award,
  Globe,
} from "lucide-react";
import Header from "../components/Header";

<Header />;
export default function CompleteAboutUsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-8px) rotate(1deg); }
        66% { transform: translateY(-4px) rotate(-1deg); }
      }
      @keyframes pulse-rainbow {
        0%, 100% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(147, 51, 234, 0.2); }
        33% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.4), 0 0 60px rgba(59, 130, 246, 0.2); }
        66% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.4), 0 0 60px rgba(236, 72, 153, 0.2); }
      }
      @keyframes laptop-dance {
        0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
        25% { transform: rotateY(10deg) rotateX(5deg); }
        50% { transform: rotateY(0deg) rotateX(-5deg); }
        75% { transform: rotateY(-10deg) rotateX(5deg); }
      }
      @keyframes shimmer-wave {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes bounce-scale {
        0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
        50% { transform: scale(1.1) rotate(5deg); opacity: 0.8; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes text-glow {
        0%, 100% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
        50% { text-shadow: 0 0 30px rgba(147, 51, 234, 0.8), 0 0 40px rgba(236, 72, 153, 0.3); }
      }
      @keyframes particle-float {
        0% { transform: translateY(100px) rotate(0deg); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
      }
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .float-animation { animation: float 4s ease-in-out infinite; }
      .pulse-rainbow { animation: pulse-rainbow 3s ease-in-out infinite; }
      .laptop-dance { animation: laptop-dance 2s ease-in-out infinite; }
      .shimmer-wave { 
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
        background-size: 200% 100%;
        animation: shimmer-wave 2s infinite;
      }
      .bounce-scale { animation: bounce-scale 0.8s ease-out forwards; }
      .text-glow { animation: text-glow 2s ease-in-out infinite; }
      .particle { animation: particle-float 4s linear infinite; }
      .gradient-bg {
        background: linear-gradient(-45deg, #0f172a, #1e293b, #0f1629 #1e2a3a);
        background-size: 100% 100%;

      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="min-h-screen relative text-white overflow-hidden">
      <Header />

      {/* Animated Background */}
      <div className="fixed inset-0 gradient-bg -z-20" />

      {/* Floating Particles */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full particle opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-4 relative pt-20"
      >
        <div className="text-center max-w-6xl">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6 text-glow">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-md">
                ABOUT US
              </span>
            </h1>
            <div className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent float-animation">
                The Dream Team of
              </span>
            </div>
            <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              AI-Powered Recruitment
            </div>
          </div>

          <p className="text-xl md:text-2xl text-blue-200 leading-relaxed max-w-4xl mx-auto mb-12">
            We're reshaping recruitment with intelligent automation, making
            hiring smarter, faster, and more efficient for modern companies
            worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <StatBadge
              icon={<Rocket />}
              number="1000+"
              label="Companies Served"
            />
            <StatBadge
              icon={<Users />}
              number="50K+"
              label="Resumes Processed"
            />
            <StatBadge icon={<Zap />} number="98%" label="Success Rate" />
            <StatBadge icon={<Globe />} number="24/7" label="AI Support" />
          </div>
        </div>
      </section>

      {/* Mission Section - Compact Design */}
      <section id="mission" className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Target className="w-12 h-12 mx-auto mb-4 text-blue-400 float-animation" />
          <h2 className="text-3xl font-bold text-blue-300 mb-6 text-glow">
            Our Mission
          </h2>
          <p className="text-lg text-blue-200 leading-relaxed">
            To empower businesses with AI-driven tools that enhance recruitment
            by automating resume screening, improving candidate-job matches, and
            optimizing communication for a seamless hiring experience.
          </p>
        </div>
      </section>

      {/* Story Section - Compact Design */}
      <section id="story" className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400 float-animation" />
          <h2 className="text-3xl font-bold text-pink-300 mb-6 text-glow">
            Our Story
          </h2>
          <div className="text-lg text-blue-200 leading-relaxed space-y-4">
            <p>
              In 2024, two aspiring tech minds—
              <span className="text-purple-300 font-semibold">Tayyba</span> and{" "}
              <span className="text-blue-300 font-semibold">Amna</span>
              —envisioned a hiring experience where manual resume screening
              would be a thing of the past.
            </p>
            <p>
              From humble beginnings and endless brainstorming sessions, our
              platform evolved into a full-fledged AI-powered solution tailored
              for startups and small businesses.
            </p>
            <p>
              With clean UX design and efficient backend logic, we now power
              seamless recruitment from first click to final interview, helping
              companies find their perfect matches faster than ever before.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section - Center Aligned */}
      <section className="py-16 max-w-4xl mx-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-glow">
            <Users className="inline w-12 h-12 mb-2 float-animation" /> Meet Our
            Founders
          </h2>
          <p className="text-xl text-blue-200 text-center mb-16">
            The Visionaries Behind The Revolution
          </p>

          <div className="grid lg:grid-cols-2 gap-16"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Founder 1 - Amna */}
          <div className="text-center group">
            <div className="relative mb-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-2xl float-animation pulse-glow transform group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-purple-600 to-pink-600">
                <img
                  src="/images/f1.jpg" // <-- Replace with correct path
                  alt="Amna Tasneem"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-full shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Amna Tasneem</h3>
            <p className="text-blue-300 text-sm font-medium mb-2">
              Founder & AI Specialist
            </p>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs mx-auto">
              Focused on developing intelligent matching algorithms that make
              hiring smarter and fairer through AI.
            </p>
          </div>

          {/* Founder 2 - Tayyaba */}
          <div className="text-center group">
            <div className="relative mb-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-2xl float-animation pulse-glow transform group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-blue-600 to-cyan-600">
                <img
                  src="/images/f2.jpg" // <-- Replace with correct path
                  alt="Tayyaba Eman"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-full shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Tayyaba Eman</h3>
            <p className="text-blue-300 text-sm font-medium mb-2">
              Co-Founder & Frontend Developer
            </p>
            <p className="text-blue-200 text-sm leading-relaxed max-w-xs mx-auto">
              Passionate about crafting beautiful user interfaces that feel
              intuitive and empowering for users.
            </p>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section id="values" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-glow">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Zap />}
              title="Innovation"
              description="Pushing boundaries with cutting-edge AI technology"
            />
            <ValueCard
              icon={<Heart />}
              title="Empathy"
              description="Understanding and solving real human problems"
            />
            <ValueCard
              icon={<Target />}
              title="Precision"
              description="Delivering accurate results every single time"
            />
            <ValueCard
              icon={<Rocket />}
              title="Growth"
              description="Helping businesses scale and succeed together"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

const StatBadge = ({ icon, number, label }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20 pulse-rainbow">
    <div className="flex items-center gap-3">
      <div className="text-blue-400 float-animation">{icon}</div>
      <div>
        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          {number}
        </div>
        <div className="text-blue-200 text-sm">{label}</div>
      </div>
    </div>
  </div>
);

const FounderCard = ({
  name,
  title,
  service,
  description,
  icon,
  gradientFrom,
  gradientTo,
  laptopColor,
  delay,
  specialties,
}) => (
  <div
    className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 pulse-rainbow bounce-scale relative overflow-hidden"
    style={{ animationDelay: delay }}
  >
    {/* Shimmer Effect */}
    <div className="absolute inset-0 shimmer-wave opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    {/* Profile Image Area */}
    <div className="relative mb-8 flex justify-center">
      <div
        className={`relative w-40 h-48 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden float-animation`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="text-white text-5xl font-bold z-10 mb-4">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        {/* Dancing Laptop */}
        <div
          className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 ${laptopColor} laptop-dance`}
        >
          <Laptop
            className="w-16 h-16"
            style={{ filter: "drop-shadow(0 8px 16px rgba(34, 197, 94, 0.6))" }}
          />
        </div>
      </div>
    </div>

    {/* Service Badge */}
    <div className="text-center mb-6">
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 px-6 py-3 rounded-full text-lg font-medium border border-green-500/30 pulse-rainbow">
        {icon}
        {service}
      </div>
    </div>

    {/* Name and Title */}
    <div className="text-center mb-6">
      <h3 className="text-3xl font-bold text-white mb-2 text-glow">{name}</h3>
      <p className="text-blue-300 font-semibold text-lg">{title}</p>
    </div>

    {/* Description */}
    <div className="text-center mb-8">
      <p className="text-blue-200 leading-relaxed">{description}</p>
    </div>

    {/* Specialties */}
    <div className="flex flex-wrap gap-2 justify-center">
      {specialties.map((specialty, index) => (
        <span
          key={index}
          className="bg-white/20 text-blue-200 px-3 py-1 rounded-full text-sm border border-white/30"
        >
          {specialty}
        </span>
      ))}
    </div>
  </div>
);

const TeamCard = ({ name, role, description, icon, color }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 pulse-rainbow">
    <div
      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-2xl float-animation`}
    >
      {icon}
    </div>
    <h3 className="font-bold text-xl text-white text-center mb-2">{name}</h3>
    <p className="text-blue-300 text-center mb-4 font-medium">{role}</p>
    <p className="text-blue-200 text-sm leading-relaxed text-center">
      {description}
    </p>
  </div>
);

const ValueCard = ({ icon, title, description }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center pulse-rainbow transform hover:scale-105 transition-all duration-300">
    <div className="text-blue-400 mb-4 flex justify-center float-animation">
      {React.cloneElement(icon, { className: "w-12 h-12" })}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-blue-200 text-sm leading-relaxed">{description}</p>
  </div>
);
