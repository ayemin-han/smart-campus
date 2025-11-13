// src/components/dashboard/RecentUpdates.js
import React from 'react';
import { mockData } from '../../data/mockData';

const RecentUpdates = () => {
  return (
    <div className="dashboard-section">
      <h2>Recent Updates</h2>
      <div className="updates-list">
        {mockData.dashboard.recentUpdates.map((update, i) => (
          <div key={i} className="update-item">
            <div className="update-dot"></div>
            <div className="update-content">
              <div className="update-title">{update.title}</div>
              <div className="update-subtitle">{update.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUpdates;