import { mockProjects, mockTasks } from '../../../constants/mockData'
import { setLoading, setError, setProjects, setTasks, toggleTaskComplete, revertTaskComplete, setTaskLoading, addProject, updateProject } from '../slices/projectsSlice'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getProjects = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    await wait(800)
    console.log('projects added=>', mockProjects.length)
    dispatch(setProjects(mockProjects))
    dispatch(setLoading(false))
  } catch (error) {
    console.log('error loading projects', error)
    dispatch(setError('Failed to load projects.'))
    dispatch(setLoading(false))
  }
}

const getTasks = (projectId) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    console.log('prjtId=>', projectId)
    await wait(600)
    const tasks = mockTasks[projectId] || []
    console.log('===>',tasks);
    dispatch(setTasks({ projectId, tasks }))
    dispatch(setLoading(false))
  } catch (error) {
    console.log('error loading tasks', error)
    dispatch(setError('Failed to load tasks.'))
  }
}

const updateTaskStatus = (projectId, taskId) => async (dispatch) => {
  console.log(projectId, taskId)
  dispatch(toggleTaskComplete({ projectId, taskId }))
  dispatch(setTaskLoading({ taskId, value: true }))
  try {
    await wait(700)
    console.log('task updated')
    dispatch(setTaskLoading({ taskId, value: false }))
  } catch (error) {
    console.log('error updating task', error)
    dispatch(revertTaskComplete({ projectId, taskId }))
    dispatch(setTaskLoading({ taskId, value: false }))
  }
}

const createProject = (data) => async (dispatch) => {
  console.log('data===><>', data)
  dispatch(setLoading(true))
  try {
    console.log('strat project')
    await wait(700)
    const newProject = {
      ...data,
      id: Date.now().toString(),
      progress: 0,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    }
    console.log('end project')
    dispatch(addProject(newProject))
    dispatch(setLoading(false))
  } catch (error) {
    console.log('error creating project', error)
    dispatch(setError('Failed to create project.'))
    dispatch(setLoading(false))
  }
}

const editProject = (data) => async (dispatch) => {
  console.log('data=<>>>>', data)
  dispatch(setLoading(true))
  try {
    await wait(700)
    console.log('project updated')
    dispatch(updateProject(data))
    dispatch(setLoading(false))
  } catch (error) {
    console.log('error updating project', error)
    dispatch(setError('Failed to update project.'))
  }
}

export {
  getProjects,
  getTasks,
  updateTaskStatus,
  createProject,
  editProject
}