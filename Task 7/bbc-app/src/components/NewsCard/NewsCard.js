import React from 'react';
import styles from './NewsCard.module.css';

const NewsCard = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default NewsCard;
