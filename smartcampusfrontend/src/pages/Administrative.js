// src/pages/Administrative.js
import React, { useState } from 'react';
import { Users, CreditCard, Award, Bell, Phone, FileText } from 'lucide-react';
import ProfileTab from '../components/administrative/ProfileTab';
import PaymentTab from '../components/administrative/PaymentTab';
import ScholarshipsTab from '../components/administrative/ScholarshipsTab';
import AnnouncementsTab from '../components/administrative/AnnouncementsTab';
import StaffContactsTab from '../components/administrative/StaffContactsTab';
import DocumentRequestTab from '../components/administrative/DocumentRequestTab';
import { AIChatbotWrapper } from "../components/chatbot/AIChatbotWrapper";


const Administrative = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <Users size={18} /> },
    { id: 'payments', label: 'Payment Services', icon: <CreditCard size={18} /> },
    { id: 'scholarships', label: 'Scholarships', icon: <Award size={18} /> },
    { id: 'announcements', label: 'Announcements', icon: <Bell size={18} /> },
    { id: 'staff', label: 'Staff Contacts', icon: <Phone size={18} /> },
    { id: 'documents', label: 'Document Request', icon: <FileText size={18} /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'payments':
        return <PaymentTab />;
      case 'scholarships':
        return <ScholarshipsTab />;
      case 'announcements':
        return <AnnouncementsTab />;
      case 'staff':
        return <StaffContactsTab />;
      case 'documents':
        return <DocumentRequestTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Administrative Services</h1>
        <p>Manage your student profile, payments, scholarships, and administrative needs</p>
      </div>

      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Administrative;