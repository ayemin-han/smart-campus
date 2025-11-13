// src/components/administrative/DocumentRequestTab.js
import React from 'react';
import { FileText } from 'lucide-react';
import { mockData } from '../../data/mockData';

const DocumentRequestTab = () => {
  return (
    <div className="section-card">
      <h2>Document Request Services</h2>
      <p className="section-description">
        Request official documents and certificates for your academic records
      </p>
      <div className="document-grid">
        {mockData.documents.map((doc, i) => (
          <div key={i} className="document-card">
            <FileText size={32} />
            <h3>{doc.name}</h3>
            <p>{doc.description}</p>
            <div className="document-processing">Processing: {doc.processing}</div>
            <button className="btn-primary">Request</button>
          </div>
        ))}
      </div>
      <div className="request-status">
        <h3>Request Status</h3>
        <div className="status-row">
          <span>Pending Requests</span>
          <strong>2</strong>
        </div>
        <div className="status-row">
          <span>Completed Requests</span>
          <strong className="success">5</strong>
        </div>
        <button className="btn-secondary">View All Requests</button>
      </div>
    </div>
  );
};

export default DocumentRequestTab;