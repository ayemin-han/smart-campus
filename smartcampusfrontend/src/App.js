import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ChatButton from './components/layout/ChatButton';
import Sidebar from './components/layout/Sidebar';
import AcademicServices from './pages/AcademicServices';
import Administrative from './pages/Administrative';
import CampusLife from './pages/CampusLife';
import CampusMap from './pages/CampusMap';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ViewSchedule from './pages/ViewSchedule';
import CheckGrades from './pages/CheckGrade';
import CampusServices from './pages/CampusService';
import DiningMenu from './pages/DiningMenu';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (token) {
      setLoggedIn(true);
      setIsAdmin(Boolean(admin));
    }
  }, []);

  const handleLoginSuccess = (admin) => {
    setLoggedIn(true);
    setIsAdmin(admin);
  };

  // Logout function to clear session and redirect to login
  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setIsAdmin(false);
  };

  // Regular user dashboard with page switching
  const UserDashboard = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const navigate = useNavigate();

    const renderPage = () => {
      switch (currentPage) {
        case 'dashboard':
          return <Dashboard />;
        case 'academic':
          return <AcademicServices />;
        case 'administrative':
          return <Administrative />;
        case 'campus-life':
          return <CampusLife />;
        case 'campus-map':
          return <CampusMap />;
        default:
          return <Dashboard />;
      }
    };

    return (
      <div className="app">
        <Sidebar active={currentPage} onNavigate={setCurrentPage} />
        <main className="main-content">
          {renderPage()}
        </main>
        <ChatButton />
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Root route */}
        <Route
          path="/"
          element={
            loggedIn ? (
              isAdmin ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Admin route */}
        <Route
          path="/admin/*"
          element={
            loggedIn && isAdmin ? (
              <>
                <AdminDashboard />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Regular user dashboard */}
        <Route
          path="/dashboard/*"
          element={
            loggedIn && !isAdmin ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
          <Route path="/schedule" element={<ViewSchedule />} />
          <Route path="/grades" element={<CheckGrades />} />
          <Route path="/services" element={<CampusServices />} />
          <Route path="/dining" element={<DiningMenu />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
