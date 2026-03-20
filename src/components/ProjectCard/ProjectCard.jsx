import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, onClick }) => {
  const isCompleted = project.status === 'Completed';
  const avatarLetter = project.owner ? project.owner[0].toUpperCase() : 'U';

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.top}>
        <h3 className={styles.name}>{project.name}</h3>
        <span className={`${styles.badge} ${isCompleted ? styles.badgeCompleted : styles.badgeActive}`}>
          {project.status}
        </span>
      </div>

      <div className={styles.owner}>
        <div className={styles.avatar}>{avatarLetter}</div>
        <span className={styles.ownerName}>{project.owner}</span>
      </div>

      <div className={styles.progressRow}>
        <span className={styles.progressLabel}>Progress</span>
        <span className={styles.progressValue}>{project.progress}%</span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={`${styles.progressFill} ${isCompleted ? styles.progressFillComplete : ''}`}
          style={{ width: `${project.progress}%` }}
        />
      </div>

      <div className={styles.footer}>Created {project.createdAt}</div>
    </div>
  );
};

export default ProjectCard;
