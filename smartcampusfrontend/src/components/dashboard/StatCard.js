// src/components/dashboard/StatCard.js
import React from 'react';

const StatCard = ({ icon, label, value, detail, extra, badge, color }) => {
  return (
    <div className={`stat-card ${color}`}>
      {icon}
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-detail">{detail}</div>
        {badge && <div className={`stat-badge ${badge.type}`}>{badge.text}</div>}
        {extra && <div className="stat-extra">{extra}</div>}
      </div>
    </div>
  );
};

export default StatCard;