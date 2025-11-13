// src/pages/Dashboard.js
import React from 'react';
import { Users, Calendar, Wifi, TrendingUp, FileText } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentUpdates from '../components/dashboard/RecentUpdates';
import InfoCards from '../components/dashboard/InfoCards';
import { mockData } from '../data/mockData';
import { AIChatbotWrapper } from "../components/chatbot/AIChatbotWrapper";


const Dashboard = () => {
  const { stats } = mockData.dashboard;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening on campus today.</p>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={<Users size={24} />}
          label="Students on Campus"
          value={stats.studentsOnCampus.value.toLocaleString()}
          detail="Currently active"
          badge={{ text: stats.studentsOnCampus.change, type: 'positive' }}
          color="green"
        />
        <StatCard
          icon={<Calendar size={24} />}
          label="Today's Events"
          value={stats.todayEvents.value}
          detail={`${stats.todayEvents.happening} happening now`}
          extra={`~ ${stats.todayEvents.starting} starting soon`}
          color="orange"
        />
        <StatCard
          icon={<Wifi size={24} />}
          label="WiFi Networks"
          value={`${stats.wifiNetworks.value} ${stats.wifiNetworks.status}`}
          detail="Campus-wide coverage"
          extra="~~"
          color="blue"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          label="Club Activities"
          value={stats.clubActivities.value}
          detail="Active today"
          badge={{ text: '1', type: 'positive' }}
          color="green"
        />
        <StatCard
          icon={<FileText size={24} />}
          label="Services Available"
          value={stats.servicesAvailable.value}
          detail="Student services"
          extra="~~"
          color="teal"
        />
      </div>

      <div className="dashboard-grid">
        <QuickActions />
        <RecentUpdates />
      </div>

      <InfoCards />

      <div className="assistant-section">
        <h2>AI Assistant</h2>
        <p>Get instant help with your questions and campus services</p>
        <div className="assistant-card">
          <h3>MFU Smart Assistant</h3>
          <p>Ask me anything about campus services, schedules, events, or get help with administrative tasks.</p>
<button
  className="btn-primary"
  onClick={() => window.dispatchEvent(new Event("openChatbot"))}
>
  Start Chat
</button>        </div>
      </div>
    </div>
  );
};

export default Dashboard;