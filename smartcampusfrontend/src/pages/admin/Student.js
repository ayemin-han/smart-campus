import { useEffect, useState } from "react";
import api from "../../api";

function Card({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}


export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchProgram, setSearchProgram] = useState(""); // 🔍 new state


  const load = async (program = "") => {
    setLoading(true);
    try {
      const res = await api.get("/api/students", {
      params: program ? { program } : {},
    });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load students: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/api/students/${id}`);
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + err.message);
    }
  };

  const styles = {
    btn: {
      background: "#A00000",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: 6,
      cursor: "pointer",
    },
    outlineBtn: {
      background: "transparent",
      color: "#A00000",
      border: "1px solid #A00000",
      padding: "6px 14px",
      borderRadius: 6,
      cursor: "pointer",
    },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

        }}
      >
        <h2>Student Management</h2>
      
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>          <input
      placeholder="Search by Program"
      value={searchProgram}
      onChange={(e) => setSearchProgram(e.target.value)}
      style={{
        padding: "8px 10px",
        borderRadius: 6,
        border: "1px solid #ccc",
        width: 200,
      }}
    />
    
   
      <button
      style={styles.outlineBtn} 
      onClick={() => load(searchProgram)}
    >
      Search
    </button>
    
   
        <button
      style={styles.outlineBtn}
      onClick={() => {
        setSearchProgram("");
        load();
      }}
    >
      Clear
    </button>
     <button
          style={styles.btn}
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + Add Student
        </button>
    </div>
    </div>
  

      {loading ? (
        <p>Loading...</p>
      ) : (
        
        <Card>
         
          <table width="100%" cellPadding="8" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#A00000", color: "#fff" }}>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Program</th>
                <th>GPA</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.studentId} style={{ borderBottom: "1px solid #ccc" }}>
                  <td>{s.studentId}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.program}</td>
                  <td>{s.gpa}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      style={{ ...styles.outlineBtn, marginRight: 8 }}
                      onClick={() => {
                        setEditing(s);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.outlineBtn}
                      onClick={() => deleteStudent(s.studentId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {showForm && (
        <StudentForm
          initial={editing}
          onClose={() => {
            setShowForm(false);
            load();
          }}
        />
      )}
    </div>
  );
}

// ---------------- Student Form ------------------

function StudentForm({ initial, onClose }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState(() => ({
    name: initial?.name || "",
    email: initial?.email || "",
    phNo: initial?.phNo || "",
    program: initial?.program || "",
    gpa: initial?.gpa || 0,
    userId: initial?.user?.userId || "",
    advisorId: initial?.advisor?.advisorId || "",
    scholarshipId: initial?.scholarship?.scholarshipId || "",
    courseCodes: (initial?.courses || []).map((c) => c.courseCode).join(", "),
    clubIds: (initial?.clubs || []).map((c) => c.clubId).join(", "),
  }));

  const styles = {
    btn: {
      background: "#A00000",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: 6,
      cursor: "pointer",
    },
    outlineBtn: {
      background: "transparent",
      color: "#A00000",
      border: "1px solid #A00000",
      padding: "6px 14px",
      borderRadius: 6,
      cursor: "pointer",
    },
  };

  const submit = async (e) => {
    e.preventDefault();

    // convert comma-separated IDs to arrays
    const courseList = form.courseCodes
      ? form.courseCodes.split(",").map((c) => ({ courseCode: c.trim() }))
      : [];
    const clubList = form.clubIds
      ? form.clubIds.split(",").map((id) => ({ clubId: Number(id.trim()) }))
      : [];

    const payload = {
      name: form.name,
      email: form.email,
      phNo: form.phNo,
      program: form.program,
      gpa: parseFloat(form.gpa),
      user: { userId: Number(form.userId) },
      advisor: { advisorId: Number(form.advisorId) },
      scholarship: form.scholarshipId
        ? { scholarshipId: Number(form.scholarshipId) }
        : null,
      courses: courseList,
      clubs: clubList,
    };
    console.log(form.userId);

    try {
      if (isEdit) {
        await api.put(`/api/students/${initial.studentId}`, payload);
      } else {
        await api.post("/api/students", payload);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Save failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 700 }}>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>{isEdit ? "Edit" : "Add"} Student</h4>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          <form
            onSubmit={submit}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginTop: 10,
            }}
          >
            <input
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              placeholder="Phone"
              value={form.phNo}
              onChange={(e) => setForm({ ...form, phNo: e.target.value })}
            />
            <input
              placeholder="Program"
              value={form.program}
              onChange={(e) => setForm({ ...form, program: e.target.value })}
            />
            <input
              placeholder="GPA"
              type="number"
              step="0.01"
              value={form.gpa}
              onChange={(e) => setForm({ ...form, gpa: e.target.value })}
            />
            <input
              placeholder="User ID"
              type="number"
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
              required
            />
            <input
              placeholder="Advisor ID"
              type="number"
              value={form.advisorId}
              onChange={(e) => setForm({ ...form, advisorId: e.target.value })}
              required
            />
            <input
              placeholder="Scholarship ID (optional)"
              type="number"
              value={form.scholarshipId}
              onChange={(e) => setForm({ ...form, scholarshipId: e.target.value })}
            />

            {/* New fields for many-to-many relationships */}
            <input
              placeholder="Course Codes (comma separated)"
              value={form.courseCodes}
              onChange={(e) => setForm({ ...form, courseCodes: e.target.value })}
            />
            <input
              placeholder="Club IDs (comma separated)"
              value={form.clubIds}
              onChange={(e) => setForm({ ...form, clubIds: e.target.value })}
            />

            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <button type="button" onClick={onClose} style={styles.outlineBtn}>
                Cancel
              </button>
              <button type="submit" style={styles.btn}>
                Save
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
