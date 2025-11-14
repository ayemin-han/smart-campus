import React, { useEffect, useState } from "react";
import api from '../../api';

const ScholarshipsTab = ({}) => {
  const [scholarshipInfo, setScholarshipInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await api.get(
          `/scholarships/student/${studentId}`
        );
        setScholarshipInfo(res.data);
      } catch (error) {
        console.error("Error fetching scholarship info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [studentId]);

  if (loading) return <div>Loading scholarship info...</div>;

  if (!scholarshipInfo?.hasScholarship) {
    return (
      <div className="section-card">
        <h2>Scholarship Information</h2>
        <p className="text-gray-600">You currently do not have a scholarship.</p>
      </div>
    );
  }

  const scholarship = scholarshipInfo.scholarship;

  return (
    <div className="section-card">
      <h2>Scholarship Information</h2>

      <div className="scholarship-item">
        <div className="scholarship-header">
          <h3>{scholarship.title}</h3>
          <div className="scholarship-status received">Received</div>
        </div>

        <div className="scholarship-details">
          <div className="detail-row">
            <span>Amount:</span>
            <strong className="amount-highlight">
              ฿{Number(scholarship.amount).toLocaleString()}
            </strong>
          </div>

          <div className="detail-row">
            <span>Type:</span>
            <strong>{scholarship.type}</strong>
          </div>

          <div className="detail-row">
            <span>Duration:</span>
            <strong>{scholarship.duration}</strong>
          </div>

          <div className="detail-row">
            <span>Requirement:</span>
            <strong>{scholarship.requirement}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsTab;
