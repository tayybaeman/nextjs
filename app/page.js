'use client'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from '@/app/styles/Home.module.css';

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>GEEK OFFICE | Business Growth Solutions</title>
        <meta name="description" content="We help your business to grow and take control of your work" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <Image src="/images/logo.jpg" alt="GEEK OFFICE" width={150} height={40} />
          </div>
         <nav className={styles.nav}>
          <ul className={styles.navList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/advertisement">Advertisement</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
          </ul>
         </nav>
         <div>
              <form className={styles.bgclr}>
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
            </form>
         </div>

        </div>

        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              <span className={styles.highlight}>WE HELP</span><br />
              <span className={styles.highlight}>YOUR BUSINESS</span><br />
              <span className={styles.highlight}>TO GROW</span>
            </h1>
            <h2 className={styles.subtitle}>TAKE CONTROL OF YOUR WORK</h2>
            <p className={styles.description}>
              Work with visionaries, build with dreamers.
              Shape the future, one opportunity at a time.
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

        <div className={styles.socialLinks}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Image src="/images/twitter.svg" alt="Twitter" width={24} height={24} />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
            <Image src="/images/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Image src="/images/facebook.svg" alt="Facebook" width={24} height={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Image src="/images/instagram.svg" alt="Instagram" width={24} height={24} />
          </a>
        </div>
      </main>
    </div>
  );
}