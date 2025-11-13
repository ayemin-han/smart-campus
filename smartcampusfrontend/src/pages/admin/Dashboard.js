import React, { useState } from 'react';
import AnnouncementPage from './Announcement';
import CoursePage from './Course';
import EventPage from './Event';
import StudentPage from './Student';
import UsersPage from './User';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import StudentClubs from './StudentClubs';
import StudentCourses from './StudentCourses';


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('announcements');
  const navigate = useNavigate();
  const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
  window.location.href = '/login';
};


  const renderTab = () => {
    const studentId = localStorage.getItem('studentId');
    switch (activeTab) {
      case 'announcements':
        return <AnnouncementPage />;
      case 'courses':
        return <CoursePage />;
      case 'events':
        return <EventPage />;
      case 'students':
        return <StudentPage />;
      case 'users':
        return <UsersPage />;
      case 'studentClubs':
        return <StudentClubs />;
      case 'studentCourses':
        return <StudentCourses/>;
      default:
        return <AnnouncementPage />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <header style={{ padding: 16, background: '#A00000', color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
        Admin Dashboard
      </header>

      {/* Tab Navigation */}
      <nav style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
        {['announcements', 'courses', 'events', 'students', 'users', 'studentClubs', 'studentCourses'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 16px',
              border: 'none',
              borderBottom: activeTab === tab ? '3px solid #007bff' : '3px solid transparent',
              background: 'transparent',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Page Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {renderTab()}
      </div>
      <button onClick={logout} style={{ padding: 8, background: '#A00000', color: '#fff', border: 'none', borderRadius: 6 }}>
  Logout
</button>

    </div>
  );
}
