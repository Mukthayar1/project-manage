import React from 'react';
import styles from './HomeScreenSkeleton.module.css';

const SkeletonCard = () => (
  <div className={styles.card}>
    <div className={styles.top}>
      <div className={styles.line} style={{ height: 16, width: '50%' }} />
      <div className={styles.badge} />
    </div>
    <div className={styles.line} style={{ height: 13, width: '30%', marginBottom: 16 }} />
    <div className={styles.line} style={{ height: 8, width: '100%', marginBottom: 6 }} />
    <div className={styles.line} style={{ height: 12, width: '25%' }} />
  </div>
);

const HomeScreenSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      {[0,1,2,3,4].map((val) => (
        <SkeletonCard key={val?.toString()} />
      ))}
    </div>
  );
};

export default HomeScreenSkeleton;