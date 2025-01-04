import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <h2>Top News Story</h2>
      <p>Researchers have developed a new quantum processor that could revolutionize computing.</p>
    </section>
  );
};

export default HeroSection;
