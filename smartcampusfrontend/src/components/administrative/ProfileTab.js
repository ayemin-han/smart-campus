// src/components/administrative/ProfileTab.js
import React from 'react';
import { mockData } from '../../data/mockData';

const ProfileTab = () => {
  const { user } = mockData;

  return (
    <div className="section-card">
      <h2>Student Profile</h2>
      <div className="profile-grid">
        <div className="profile-item">
          <label>Student ID</label>
          <div className="profile-value highlight">{user.id}</div>
        </div>
        <div className="profile-item">
          <label>Email</label>
          <div className="profile-value">{user.email}</div>
        </div>
        <div className="profile-item">
          <label>Full Name</label>
          <div className="profile-value">{user.name}</div>
        </div>
        <div className="profile-item">
          <label>Phone</label>
          <div className="profile-value">{user.phone}</div>
        </div>
        <div className="profile-item">
          <label>Program</label>
          <div className="profile-value">{user.program}</div>
        </div>
        <div className="profile-item">
          <label>Current GPA</label>
          <div className="profile-value success">{user.gpa}</div>
        </div>
        <div className="profile-item">
          <label>Academic Year</label>
          <div className="profile-value">{user.year}</div>
        </div>
        <div className="profile-item">
          <label>Credits</label>
          <div className="profile-value">{user.credits}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;