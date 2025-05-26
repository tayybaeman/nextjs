'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '@/app/styles/Home.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Enhanced scroll effect for navbar
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navbar = document.querySelector(`.${styles.navbar}`);
      
      if (scrollY > 50) {
        setScrolled(true);
        if (navbar) {
          navbar.style.background = 'rgba(0, 0, 0, 0.2)';
          navbar.style.backdropFilter = 'blur(20px)';
          navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
          navbar.style.borderBottom = '1px solid rgba(143, 187, 220, 0.2)';
        }
      } else {
        setScrolled(false);
        if (navbar) {
          navbar.style.background = 'rgba(255, 255, 255, 0.05)';
          navbar.style.backdropFilter = 'blur(10px)';
          navbar.style.boxShadow = 'none';
          navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
      }
    };

    // Add navigation hover effects
    const addNavHoverEffects = () => {
      const navLinks = document.querySelectorAll(`.${styles.navList} a`);
      
      navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
          e.target.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', (e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
        });
      });
    };

    // Add button click effects
    const addButtonEffects = () => {
      const buttons = document.querySelectorAll(`.${styles.registerButton}`);
      
      buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
          e.target.style.transform = 'translateY(-3px) scale(1.05)';
          e.target.style.boxShadow = '0 8px 25px rgba(143, 187, 220, 0.4)';
        });
        
        button.addEventListener('mouseleave', (e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 4px 15px rgba(143, 187, 220, 0.3)';
        });
        
        button.addEventListener('mousedown', (e) => {
          e.target.style.transform = 'translateY(-1px) scale(1.02)';
        });
        
        button.addEventListener('mouseup', (e) => {
          e.target.style.transform = 'translateY(-3px) scale(1.05)';
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize effects after component mounts
    setTimeout(() => {
      addNavHoverEffects();
      addButtonEffects();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image 
          src="/images/logo.png" 
          alt="GEEK OFFICE" 
          width={150} 
          height={10}
          style={{
            filter: 'drop-shadow(0 0 10px rgba(143, 187, 220, 0.5))',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.filter = 'drop-shadow(0 0 15px rgba(143, 187, 220, 0.8)) brightness(1.1)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.filter = 'drop-shadow(0 0 10px rgba(143, 187, 220, 0.5))';
            e.target.style.transform = 'scale(1)';
          }}
        />
      </div>
      
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/advertisement">Advertisement</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact_us">Contact Us</Link>
          </li>
        </ul>
      </nav>
      
      <div>
        <div className={styles.bgclr}>
          <Link href="/register">
            <button type="button" className={styles.registerButton}>
              REGISTER
            </button>
          </Link>

          <Link href="/login">
            <button type="button" className={styles.registerButton}>
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}