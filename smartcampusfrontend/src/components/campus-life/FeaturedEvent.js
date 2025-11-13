// src/components/campus-life/FeaturedEvent.js
import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { mockData } from '../../data/mockData';

const FeaturedEvent = () => {
  const { featuredEvent } = mockData.campusLife;

  return (
    <div className="featured-event">
      <div className="featured-badge">Featured Event</div>
      <div className="featured-category">Career</div>
      <h2>{featuredEvent.title}</h2>
      <div className="featured-details">
        <div className="detail-item">
          <Clock size={18} />
          <span>{featuredEvent.date}</span>
        </div>
        <div className="detail-item">
          <MapPin size={18} />
          <span>{featuredEvent.location}</span>
        </div>
        <div className="detail-item">
          <Users size={18} />
          <span>{featuredEvent.registered}+ registered</span>
        </div>
      </div>
      <p>{featuredEvent.description}</p>
      <button className="btn-primary">Register Now</button>
    </div>
  );
};

export default FeaturedEvent;