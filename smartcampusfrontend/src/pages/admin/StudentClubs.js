import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentClubs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const res = await axios.get("http://localhost:8080/api/student-clubs");
    setData(res.data);
  };

  const handleDelete = async (studentId, clubId) => {
    if (window.confirm("Are you sure you want to remove this record?")) {
      await axios.delete(`http://localhost:8080/api/student-clubs/${studentId}/${clubId}`);
      fetchAll();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Student – Club Management</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.tableHeader}>Student ID</th>
            <th style={styles.tableHeader}>Club ID</th>
            <th style={styles.tableHeader}>Club Name</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} style={styles.tableRow}>
              <td style={styles.tableCell}>{item.studentId}</td>
              <td style={styles.tableCell}>{item.clubId}</td>
              <td style={styles.tableCell}>{item.clubName}</td>
              <td style={styles.tableCell}>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(item.studentId, item.clubId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
  },
  header: {
    color: "#A00000",
    fontSize: 22,
    marginBottom: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  tableHeaderRow: {
    background: "#A00000",
    color: "#fff",
  },
  tableHeader: {
    padding: "10px",
    textAlign: "left",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
  },
  deleteButton: {
    background: "#fff",
    color: "#A00000",
    border: "1px solid #A00000",
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },
};
