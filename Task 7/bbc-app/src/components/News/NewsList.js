import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import styles from './NewsList.module.css';

const NewsList = () => {
  const newsItems = [
    { id: 1, title: 'Breakthrough in Quantum Computing', description: 'Researchers have developed a new quantum processor that could revolutionize computing.' },
    { id: 2, title: 'Cybersecurity Breach', description: 'A major tech company has reported a data breach affecting millions of users.' },
    { id: 2, title: 'Pandemic Update', description: 'A new variant of the virus has been detected, prompting travel restrictions.' },
    { id: 2, title: 'Global Economic Summit Concludes in Geneva', description: 'World leaders have agreed on a new framework to address climate change and economic disparities.' },
  ];

  return (
    <div className={styles.newsList}>
      {newsItems.map(news => (
        <NewsCard key={news.id} title={news.title} description={news.description} />
      ))}
    </div>
  );
};

export default NewsList;
