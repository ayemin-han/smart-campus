// src/components/administrative/AnnouncementsTab.js
import React, { useEffect, useState } from "react";
import api from "../../api";

const AnnouncementsTab = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch announcements function
  const fetchAnnouncements = async () => {
    try {
      if (!refreshing) setLoading(true);
      const response = await api.get("/announcements");
      setAnnouncements(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
      setError("Failed to load announcements. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch once + refresh every 10 seconds
  useEffect(() => {
    fetchAnnouncements();

    const interval = setInterval(() => {
      fetchAnnouncements();
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Manual refresh button handler
  const handleManualRefresh = () => {
    setRefreshing(true);
    fetchAnnouncements();
  };

  if (loading && !refreshing)
    return <div className="section-card">Loading announcements...</div>;
  if (error) return <div className="section-card error">{error}</div>;

  return (
    <div className="section-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Latest Announcements</h2>
        <button
          className="btn-secondary"
          onClick={handleManualRefresh}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      <div className="announcements-list" style={{ marginTop: "1rem" }}>
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement.announcementId}
              className={`announcement-item ${announcement.category?.toLowerCase()}`}
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div className="announcement-header" style={{ marginBottom: 8 }}>
                <h3 style={{ margin: 0 }}>{announcement.name}</h3>
                <div
                  className="announcement-meta"
                  style={{ fontSize: "0.85rem", color: "#555" }}
                >
                  <span
                    className="announcement-category"
                    style={{
                      background: "#A00000",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      marginRight: "10px",
                    }}
                  >
                    {announcement.category}
                  </span>
                  <span className="announcement-date">
                    {new Date(announcement.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="announcement-content" style={{ marginBottom: 8 }}>
                {announcement.content}
              </p>
              {announcement.admin && (
                <p
                  className="announcement-admin"
                  style={{ fontSize: "0.85rem", color: "#777" }}
                >
                  Posted by: <strong>{announcement.admin.name}</strong>
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No announcements found.</p>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsTab;
