// src/components/dashboard/InfoCards.js
import React from 'react';
import { mockData } from '../../data/mockData';

const InfoCards = () => {
  const { academicProgress, campusEngagement, serviceUsage } = mockData.dashboard;

  return (
    <div className="info-grid">
      <div className="info-card">
        <h3>Academic Progress</h3>
        <div className="info-items">
          <div className="info-item">
            <span>Current GPA</span>
            <strong>{academicProgress.gpa}/4.0</strong>
          </div>
          <div className="info-item">
            <span>Credits completed</span>
            <strong>{academicProgress.credits}/21</strong>
          </div>
          <div className="info-item">
            <span>Courses this semester</span>
            <strong>{academicProgress.coursesThisSemester}</strong>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '85%' }}></div>
        </div>
      </div>

      <div className="info-card">
        <h3>Campus Engagement</h3>
        <div className="info-items">
          <div className="info-item">
            <span>MFU Points</span>
            <strong>{campusEngagement.mfuPoints}</strong>
          </div>
          <div className="info-item">
            <span>Current level</span>
            <strong>{campusEngagement.level}</strong>
          </div>
          <div className="info-item">
            <span>Events attended</span>
            <strong>{campusEngagement.eventsAttended}</strong>
          </div>
          <div className="info-item">
            <span>Club memberships</span>
            <strong>{campusEngagement.clubMemberships}</strong>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h3>Service Usage</h3>
        <div className="info-items">
          <div className="info-item">
            <span>Library visits</span>
            <strong>{serviceUsage.library} this month</strong>
          </div>
          <div className="info-item">
            <span>Campus events attended</span>
            <strong>{serviceUsage.campusEvents} this month</strong>
          </div>
          <div className="info-item">
            <span>Dining purchases</span>
            <strong>{serviceUsage.dining} this month</strong>
          </div>
          <div className="info-item">
            <span>Support tickets</span>
            <strong>{serviceUsage.support} open</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;