import React, { useEffect, useState } from "react";
import api from '../../api';

export default function StudentCourses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true); // start loading
      const res = await api.get("/student-courses");
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleDelete = async (studentId, courseId) => {
    if (window.confirm("Are you sure you want to remove this record?")) {
      try {
        await api.delete(`/student-courses/${studentId}/${courseId}`);
        fetchAll();
      } catch (err) {
        console.error("Failed to delete record:", err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Student – Course Management</h2>

      {loading ? (
        <p>Loading...</p> // ✅ show while loading
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Student ID</th>
              <th style={styles.tableHeader}>Course ID</th>
              <th style={styles.tableHeader}>Course Code</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, i) => (
                <tr key={i} style={styles.tableRow}>
                  <td style={styles.tableCell}>{item.studentId}</td>
                  <td style={styles.tableCell}>{item.courseId}</td>
                  <td style={styles.tableCell}>{item.courseCode}</td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(item.studentId, item.courseId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: 10 }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  header: { color: "#A00000", fontSize: 22, marginBottom: 16 },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  tableHeaderRow: { background: "#A00000", color: "#fff" },
  tableHeader: { padding: "10px", textAlign: "left" },
  tableRow: { borderBottom: "1px solid #ddd" },
  tableCell: { padding: "10px" },
  deleteButton: {
    background: "#fff",
    color: "#A00000",
    border: "1px solid #A00000",
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },
};
