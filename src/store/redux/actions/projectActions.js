import { mockProjects, mockTasks } from '../../../constants/mockData';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProjects = () => async (dispatch) => {
  try {
    await wait(800);
    dispatch({ type: "loadingProjects", payload: mockProjects });
  } catch (error) {
    console.log('error loading projects', error);
  }
};

export const getTasks = (projectId) => async (dispatch) => {
  try {
    console.log('prjtId=>', projectId);
    await wait(600);

    const tasks = mockTasks[projectId] || [];
    console.log('===>', tasks);

    dispatch({ type: "loadTask", payload: { projectId, tasks } });
  } catch (error) {
    console.log('error loading tasks', error);
  }
};

export const updateTaskStatus = (projectId, taskId) => async (dispatch) => {
  dispatch({ type: "toggleTask", payload: { projectId, taskId } });
  try {
    await wait(700);
    console.log('task updated');
  } catch (error) {
    console.log('error updating task', error);
    dispatch({ type: "revertTask", payload: { projectId, taskId } });
  }
};

export const createProject = (data) => async (dispatch) => {
  console.log('data===><>', data);
  try {
    await wait(700);

    const newProject = {
      ...data,
      id: Date.now().toString(),
      progress: 0,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    dispatch({ type: "addNewProjct", payload: newProject });
  } catch (error) {
    console.log('error creating project', error);
  }
};

export const editProject = (data) => async (dispatch) => {
  console.log('data=<>>>>', data);
  try {
    await wait(700);

    dispatch({ type: "updateProject", payload: data });
  } catch (error) {
    console.log('error updating project', error);
  }
};