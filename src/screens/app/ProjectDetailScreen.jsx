import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import TaskItem from '../../components/TaskItem/TaskItem';
import CreateEditProjectModal from './CreateEditProjectScreen';
import styles from './ProjectDetailScreen.module.css';

const ProjectDetailScreen = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, selectedProject, tasks, loading, taskLoading, loadTasks, selectProject, toggleTask } = useProjects();

  const [showEdit, setShowEdit] = useState(false);
  
  console.log('id=>', id);

  const project = selectedProject?.id == id
    ? selectedProject
    : projects.find((p) => p.id == id);
    
  console.log('current project:', project);

  useEffect(() => {
    if (project) {
      console.log('selecting project and loading tasks');
      selectProject(project);
      loadTasks(id);
    }
  }, [id]);

  if (!project) {
    return (
      <div className={styles.detailPage}>
        <button className={styles.goBackBtn} onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <p className={styles.notFoundMsg}>Project not found.</p>
      </div>
    );
  }

  const projectTasks = tasks[id] || [];
  const completedCount = projectTasks.filter((t) => t.completed).length;
  const isCompleted = project.status == 'Completed';

  const handleToggle = (taskId) => {
    console.log('toggling task:', taskId);
    toggleTask(id, taskId);
  };

  return (
    <div className={styles.detailPage}>
      <button className={styles.goBackBtn} onClick={() => navigate('/dashboard')}>
        ← Back
      </button>

      <div className={styles.projectInfoCard}>
        <div className={styles.infoHeader}>
          <div>
            <h1 className={styles.projectTitle}>{project.name}</h1>
            <span className={`${styles.statusBadge} ${isCompleted ? styles.statusDone : styles.statusActive}`}>
              {project.status}
            </span>
          </div>
          <button className={styles.editProjectBtn} onClick={() => setShowEdit(true)}>
            Edit
          </button>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Owner</span>
            <span className={styles.detailValue}>{project.owner}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Created</span>
            <span className={styles.detailValue}>{project.createdAt}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Tasks</span>
            <span className={styles.detailValue}>{completedCount}/{projectTasks.length}</span>
          </div>
        </div>

        {project.description && (
          <p className={styles.projectDesc}>{project.description}</p>
        )}

        <div className={styles.progressSection}>
          <span className={styles.progressText}>Progress</span>
          <span className={styles.progressPercent}>{project.progress}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={`${styles.progressFillBar} ${isCompleted ? styles.fillComplete : ''}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className={styles.tasksSection}>
        <div className={styles.tasksHeaderBar}>
          <h2 className={styles.tasksHeading}>Tasks</h2>
          <span className={styles.tasksStats}>
            {completedCount}/{projectTasks.length} done
          </span>
        </div>

        {loading ? (
          <div className={styles.loadingState}>Loading tasks...</div>
        ) : projectTasks.length == 0 ? (
          <div className={styles.loadingState}>No tasks yet</div>
        ) : (
          projectTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>

      {showEdit && (
        <CreateEditProjectModal
          project={project}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
};

export default ProjectDetailScreen;