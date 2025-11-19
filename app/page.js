'use client'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '@/app/styles/Home.module.css';
import Header from '@/app/components/Header';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Subtle mouse parallax effect - ONLY for background elements
    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      // Very subtle parallax for background only
      const container = document.querySelector(`.${styles.container}`);
      if (container && container.querySelector('::before')) {
        const moveX = (mouseX - 0.5) * 5; // Much smaller movement
        const moveY = (mouseY - 0.5) * 5;
        container.style.setProperty('--mouse-x', `${moveX}px`);
        container.style.setProperty('--mouse-y', `${moveY}px`);
      }
    };

    // Enhanced button ripple effect
    const addRippleEffect = (e) => {
      if (e.target.classList.contains(styles.registerButton)) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
          z-index: 1000;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.remove();
          }
        }, 600);
      }
    };

    // Add floating animation to hero elements
    const addFloatingAnimation = () => {
      const heroContent = document.querySelector(`.${styles.heroContent}`);
      const heroImage = document.querySelector(`.${styles.heroImage}`);
      
      if (heroContent) {
        heroContent.style.animation = `${styles.slideInLeft} 1s ease, floatGentle 6s ease-in-out infinite 1s`;
      }
      
      if (heroImage) {
        heroImage.style.animation = `${styles.slideInRight} 1s ease, floatGentle 8s ease-in-out infinite 1.5s`;
      }
    };

    // Scroll-triggered animations
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const socialLinks = document.querySelector(`.${styles.socialLinks}`);
      
      // Keep social links always visible with subtle animation
      if (socialLinks) {
        socialLinks.style.transform = `translateY(-50%) translateX(${Math.sin(scrollY * 0.01) * 2}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', addRippleEffect);
    document.addEventListener('scroll', handleScroll);
    
    // Add enhanced CSS animations
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      @keyframes floatGentle {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      @keyframes slideInFromTop {
        from {
          transform: translateY(-50px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes slideInFromBottom {
        from {
          transform: translateY(50px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(enhancedStyles);
    
    // Add floating animation after mount
    setTimeout(addFloatingAnimation, 500);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', addRippleEffect);
      document.removeEventListener('scroll', handleScroll);
      if (enhancedStyles.parentNode) {
        document.head.removeChild(enhancedStyles);
      }
    };
  }, []);

  if (!mounted) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        <div style={{
          animation: 'pulse 1s ease-in-out infinite',
          textShadow: '0 0 20px rgba(143, 187, 220, 0.8)',
          background: 'linear-gradient(45deg, #8fbbdc, #64b5f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          GEEK OFFICE
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>GEEK OFFICE - Next Gen Hiring Platform</title>
        <meta name="description" content="Work with visionaries, build with dreamers. Shape the future, one opportunity at a time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.container}>
        <Header />
        
        <main className={styles.main}>
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.title}>
                <span className={styles.highlight}>NEXT GEN</span><br />
                <span className={styles.highlight}>HIRE SMART</span><br/>
                <span className={styles.highlight}>TO GROW FASTER</span>
              </h1>
              <h2 className={styles.subtitle}>TAKE CONTROL OF YOUR WORK</h2>
              <p className={styles.description}>
                Work with visionaries, build with dreamers.
                Shape the future, one opportunity at a time.
                Experience the next generation of hiring solutions.
              </p>
            </div>
            
            <div className={styles.heroImage}>
              <div className={styles.imageContainer}>
                <Image 
                  src="/images/team.jpg"
                  alt="Business Growing Collaboration" 
                  width={400} 
                  height={400} 
                  className={styles.roundedImage}
                  priority
                />
              </div>
            </div>
          </div>
        </main>

        {/* Fixed Social Links */}
        <div className={styles.socialLinks}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
             <img src="/images/twitter.svg" alt="Twitter" width={20} height={20} />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" title="WhatsApp">
            <img src="/images/whatsapp.svg" alt="Twitter" width={20} height={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
            <img src="/images/facebook.svg" alt="Twitter" width={20} height={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
            <img src="/images/instagram.svg" alt="Twitter" width={20} height={20} />
          </a>
        </div>
      </div>
    </>
  );
}
