import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h3>Most read</h3>
      <ul>
        <li>King deeply saddened  over Briton's death</li>
        <li>Venus and crescent Moon stun stargazers</li>
        <li>Pakistan Army plans to capture Wakhan Border</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
