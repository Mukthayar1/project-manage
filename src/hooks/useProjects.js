import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProject } from '../store/redux/slices/projectsSlice'
import { getProjects, getTasks, updateTaskStatus, createProject, editProject} from '../store/redux/actions/projectActions'

export const useProjects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects)

  const loadProjects = () => {
    dispatch(getProjects());
  };

  const loadTasks = (projectId) => {
    dispatch(getTasks(projectId))
  };

  const selectProject = (project) => {
    dispatch(setSelectedProject(project))
  };

  const toggleTask = (projectId, taskId) => {
    dispatch(updateTaskStatus(projectId, taskId))
  };

  const saveProject = async (data, isEdit) => {
    if (isEdit) {
      await dispatch(editProject(data))
    } else {
      await dispatch(createProject(data))
    }
  };

  return {
    ...projects,
    loadProjects,
    loadTasks,
    selectProject,
    toggleTask,
    saveProject,
  };
};
