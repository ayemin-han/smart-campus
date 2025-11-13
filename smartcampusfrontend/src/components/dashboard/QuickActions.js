// src/components/dashboard/QuickActions.js
import React from 'react';
import { Calendar, BookOpen, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: <Calendar size={20} />, label: 'View Schedule', path: '/schedule' },
    { icon: <BookOpen size={20} />, label: 'Check Grades', path: '/grades' },
    { icon: <Users size={20} />, label: 'Campus Services', path: '/services' },
    { icon: <Calendar size={20} />, label: 'Dining Menu', path: '/dining' },
  ];

  return (
    <div className="dashboard-section">
      <h2>Quick Actions</h2>
      <div className="quick-actions">
        {actions.map((action, i) => (
          <button
            key={i}
            className="action-btn"
            onClick={() => navigate(action.path)}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
