// src/components/administrative/StaffContactsTab.js
import React from 'react';
import { mockData } from '../../data/mockData';

const StaffContactsTab = () => {
  return (
    <div className="section-card">
      <h2>Staff Directory</h2>
      <div className="staff-list">
        {mockData.staff.map((member, i) => (
          <div key={i} className="staff-item">
            <div className="staff-info">
              <h3>{member.name}</h3>
              <div className="staff-role">{member.role}</div>
              <div className="staff-department">{member.department}</div>
            </div>
            <div className="staff-contact">
              <div className="contact-item">
                <span>📧</span> {member.email}
              </div>
              <div className="contact-item">
                <span>📞</span> {member.phone}
              </div>
              <div className="contact-item">
                <span>📍</span> {member.office}
              </div>
            </div>
            <div className="staff-actions">
              <button className="btn-secondary small">Email</button>
              <button className="btn-secondary small">Call</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffContactsTab;