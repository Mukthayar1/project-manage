import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/redux/store'
import ProtectedRoute from './routes/ProtectedRoute'
import AppLayout from './components/Sidebar/AppLayout'
import LoginScreen from './screens/auth/LoginScreen'
import DashboardScreen from './screens/app/DashboardScreen'
import ProjectDetailScreen from './screens/app/ProjectDetailScreen'
import './index.css'
import PublicRoute from './routes/PublicRoute'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            }
          />
          <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DashboardScreen />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DashboardScreen />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ProjectDetailScreen />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App
