import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>BBC News</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>World</li>
          <li>Technology</li>
          <li>Business</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
