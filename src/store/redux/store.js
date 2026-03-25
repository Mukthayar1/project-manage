import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducer/authReducer';
import projectsReducer from './reducer/projectReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);