import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardPage from './components/DashboardPage'; 

const PrivateRoute = ({ children, user }) => {
  return user.role === 'leader' ? children : <p>Access Denied</p>;
};


const App = () => {
  const currentUser = { role: 'leader' };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute user={currentUser}>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};


export default App;
