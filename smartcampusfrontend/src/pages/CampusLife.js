// src/pages/CampusLife.js
import React from 'react';
import FeaturedEvent from '../components/campus-life/FeaturedEvent';
import UpcomingEvents from '../components/campus-life/UpcomingEvents';
import StudentClubs from '../components/campus-life/StudentClubs';
import { AIChatbotWrapper } from "../components/chatbot/AIChatbotWrapper";


const CampusLife = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Campus Life</h1>
        <p>Discover events and join clubs to enhance your campus experience</p>
      </div>

      <FeaturedEvent />

      <div className="two-section-grid">
        <UpcomingEvents />
        <StudentClubs />
      </div>
    </div>
  );
};

export default CampusLife;