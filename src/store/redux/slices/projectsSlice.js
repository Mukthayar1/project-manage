import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  currentProject: null,
  tasks: {},
  isLoading: false,
  updatingTasks: {},
  errorMsg: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
    setProjects: (state, action) => {
      console.log('setProjects===>', action.payload.length);
      state.projects = action.payload;
      state.isLoading = false;
      state.errorMsg = null;
    },
    setSelectedProject: (state, action) => {
      state.currentProject = action.payload;
    },
    setTasks: (state, action) => {
      const { projectId, tasks } = action.payload;
      console.log(projectId, tasks.length);
      state.tasks[projectId] = tasks;
      state.isLoading = false;
    },
    toggleTaskComplete: (state, action) => {
      const { projectId, taskId } = action.payload;
      const task = state.tasks[projectId]?.find(t => t.id == taskId);
      if (task) {
        task.completed = !task.completed;
      } else {
        console.log('task not found', taskId);
      }
    },
    revertTaskComplete: (state, action) => {
      const { projectId, taskId } = action.payload;
      console.log(projectId, taskId);
      const task = state.tasks[projectId]?.find(t => t.id == taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setTaskLoading: (state, action) => {
      const { taskId, value } = action.payload;
      state.updatingTasks[taskId] = value;
    },
    addProject: (state, action) => {
      state.projects.unshift(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.id == action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        console.log('project updated at===>', index);
      } else {
        console.log('project not found', action.payload.id);
      }
      if (state.currentProject?.id == action.payload.id) {
        state.currentProject = action.payload;
        console.log('projecxt updated');
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setProjects,
  setSelectedProject,
  setTasks,
  toggleTaskComplete,
  revertTaskComplete,
  setTaskLoading,
  addProject,
  updateProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;