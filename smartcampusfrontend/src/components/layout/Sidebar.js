// src/components/layout/Sidebar.js
import React from 'react';
import { GraduationCap, BookOpen, Users, Calendar, MapPin, Settings, LogOut } from 'lucide-react';
import { mockData } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ active, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', icon: <GraduationCap size={20} />, label: 'Dashboard' },
    { id: 'academic', icon: <BookOpen size={20} />, label: 'Academic Services' },
    { id: 'administrative', icon: <Users size={20} />, label: 'Administrative' },
    { id: 'campus-life', icon: <Calendar size={20} />, label: 'Campus Life' },
    { id: 'campus-map', icon: <MapPin size={20} />, label: 'Campus Map' }
  ];
  const navigate = useNavigate();
    const studentName = localStorage.getItem('studentName') || 'Guest';


   const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';

};


  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">MFU</div>
          <div className="logo-text">
            <div className="logo-title">Smart Campus</div>
            <div className="logo-subtitle">Mae Fah Luang University</div>
          </div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            {studentName.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="user-info">
            <div className="user-name">{studentName}</div>
            <div className="user-id">{mockData.user.id}</div>
          </div>
        </div>
        <div className="footer-actions">
          <button className="icon-btn"><Settings size={20} /></button>
          <button className="icon-btn" onClick={logout}><LogOut size={20} /></button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;