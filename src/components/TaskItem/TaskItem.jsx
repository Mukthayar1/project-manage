import React from 'react';
import styles from './TaskItem.module.css';

const priorityClass = {
  High: styles.badgeHigh,
  Medium: styles.badgeMedium,
  Low: styles.badgeLow,
};

const TaskItem = ({ task, onToggle, isLoading }) => {
  console.log('task==>',task);
  return (
    <div className={styles.item}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className={styles.content}>
        <div className={`${styles.title} ${task.completed ? styles.titleCompleted : ''}`}>
          {task.title}
        </div>
        <div className={styles.meta}>
          <span className={styles.assignee}>{task.assignee}</span>
          <span className={`${styles.badge} ${priorityClass[task.priority] || ''}`}>
            {task.priority}
          </span>
        </div>
      </div>
      <span className={styles.updated}>
        {task.completed ? 'Done' : ''}
      </span>
    </div>
  );
};

export default TaskItem;
