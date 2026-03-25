const initialState = {
  projects: [],
  currentProject: null,
  tasks: {},
};

export default function projectsReducer(state = initialState, action) {
  console.log('action.payload===>', action.payload, action.type);
  switch (action.type) {
    case 'loadingProjects':
      return {
        ...state,
        projects: action.payload,
      };

    case 'loadTask':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.projectId]: action.payload.tasks,
        },
      };

    case 'toggleTask':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.projectId]: state.tasks[action.payload.projectId].map(t =>
            t.id == action.payload.taskId ? { ...t, completed: !t.completed } : t
          ),
        },
      };

    case 'revertTask':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.projectId]: state.tasks[action.payload.projectId].map(t =>
            t.id == action.payload.taskId ? { ...t, completed: !t.completed } : t
          ),
        },
      };
    case 'addNewProjct':
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };

    case 'updateProject':
      const updatedProjects = state.projects.map(p =>
        p.id == action.payload.id ? action.payload : p
      );
      return {
        ...state,
        projects: updatedProjects,
        currentProject:
          state.currentProject?.id == action.payload.id
            ? action.payload
            : state.currentProject,
      };

    case 'selectedProject':
      return {
        ...state,
        currentProject: action.payload,
      };

    default:
      return state;
  }
}