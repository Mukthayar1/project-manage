import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { useAuth } from '../../hooks/useAuth';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import CreateEditProjectModal from './CreateEditProjectScreen';
import styles from './DashboardScreen.module.css';
import HomeScreenSkeleton from '../../components/Skeleton/HomeScreenSkeleton';

const DashboardScreen = () => {

  const navigate = useNavigate();
  const { projects, loading, loadProjects, selectProject } = useProjects();
  const { userEmail } = useAuth();
  const FILTERS = ['All', 'Active', 'Completed'];

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);

  console.log('projects count:', projects?.length);

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    console.log('filtering projects...')
    const filtered = projects.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = activeFilter == 'All' || p.status == activeFilter
      return matchesSearch && matchesFilter;
    });
    console.log('filtered projects count:', filtered.length);
    return filtered;
  }, [projects, search, activeFilter]);
  console.log('search=>', search);
  console.log('active filter:', activeFilter);


  const handleProjectClick = (project) => {
    console.log('project clicked:', project.id);
    selectProject(project);
    navigate(`/projects/${project.id}`);
  };

  const handleEdit = (project) => {
    console.log('editing project:', project.id);
    setEditProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log('closing modal');
    setShowModal(false);
    setEditProject(null);
  };

  const avatarLetter = userEmail ? userEmail[0].toUpperCase() : 'U';

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.topBar}>
        <div className={styles.leftSection}>
          <div className={styles.searchWrapper}>
            <input
              className={styles.searchField}
              placeholder="Find projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.userAvatar}>{avatarLetter}</div>
        </div>
      </div>

      <div className={styles.filtersBar}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`${styles.filterButton} ${activeFilter == f ? styles.activeFilter : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
        <button className={styles.newProjectBtn} onClick={() => setShowModal(true)}>
           New Prjects
        </button>
      </div>

      <div className={styles.projectsList}>
        {(loading || projects?.length == 0 ) ? (
          <HomeScreenSkeleton />
        ) : filteredProjects.length == 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyHeading}>Nothing here</div>
            <div className={styles.emptyHint}>
              {search ? 'No matches found' : 'Create a project to get started'}
            </div>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
              onEdit={() => handleEdit(project)}
            />
          ))
        )}
      </div>

      {showModal && (
        <CreateEditProjectModal
          project={editProject}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DashboardScreen;