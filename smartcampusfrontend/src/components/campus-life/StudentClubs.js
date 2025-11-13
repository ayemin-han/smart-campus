import React, { useEffect, useState } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const studentId = localStorage.getItem('studentId'); // like your schedule example

  useEffect(() => {
    const fetchClubs = async () => {
      if (!studentId) {
        setError('Student not logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/clubs/student/${studentId}`);
        setClubs(response.data || []);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError('Failed to load clubs.');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [studentId]);

  if (loading) return <p>Loading clubs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="section-card">
      <div className="section-header-with-action">
        <h2>Student Clubs</h2>
        <button className="link-btn">
          Browse All <ChevronRight size={16} />
        </button>
      </div>

      <div className="clubs-list">
        {clubs.length > 0 ? (
          clubs.map((club) => (
            <div key={club.clubId} className="club-item">
              <div className="club-info">
                <h3>{club.name}</h3>
                <div className="club-meta">
                  <span>{club.members} members • {club.category}</span>
                </div>
                <div className="club-meeting">
                  <Clock size={14} />
                  <span>{club.meeting}</span>
                </div>
              </div>
              <div className={`club-status ${club.status}`}>
                {club.status === 'open' ? 'Open' : 'Limited'}
              </div>
              <button className="btn-primary small">
                {club.status === 'limited' ? 'Joined' : 'Joined'}
              </button>
            </div>
          ))
        ) : (
          <p>You have not joined any clubs yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentClubs;
