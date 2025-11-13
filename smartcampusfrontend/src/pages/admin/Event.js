import { useEffect, useState } from "react";
import api from "../../api";
import { Card, styles } from '../../style';
// Reusable Card component
function EventCard({ children }) {
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

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

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

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load events: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    if (!window.confirm("Delete event?")) return;
    try {
      await api.delete(`/api/events/${id}`);
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Events</h2>
          <button
            style={styles.btn}
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
          >
            + Add Event
          </button>
        </div>

        <EventCard>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table
              style={{ width: "100%", borderCollapse: "collapse" }}
              cellPadding="8"
            >
               <thead>
        <tr style={{ background: "#A00000", color: "#fff" }}>
          <th style={{ padding: "8px 12px", textAlign: "left" }}>Title</th>
          <th style={{ padding: "8px 12px", textAlign: "left" }}>Type</th>
          <th style={{ padding: "8px 12px", textAlign: "left" }}>Date</th>
          <th style={{ padding: "8px 12px", textAlign: "left" }}>Time</th>
          <th style={{ padding: "8px 12px", textAlign: "left" }}>Location</th>
          <th style={{ padding: "8px 12px", textAlign: "center" }}>Actions</th>
        </tr>
      </thead>
               <tbody>
        {events.map((ev) => (
          <tr key={ev.eventId} style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "8px 12px" }}>{ev.title}</td>
            <td style={{ padding: "8px 12px" }}>{ev.type}</td>
            <td style={{ padding: "8px 12px" }}>{ev.date}</td>
            <td style={{ padding: "8px 12px" }}>{ev.time}</td>
            <td style={{ padding: "8px 12px" }}>{ev.location}</td>
            <td style={{ padding: "8px 12px", textAlign: "center" }}>
              <button
                style={{ ...styles.outlineBtn, marginRight: 8 }}
                onClick={() => {
                  setEditing(ev);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
              <button
                style={{
                  ...styles.outlineBtn,
                  background: "#fff",
                  color: "#A00000",
                }}
                onClick={() => del(ev.eventId)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
            </table>
          )}
        </EventCard>

        {showForm && (
          <EventForm
            initial={editing}
            onClose={() => {
              setShowForm(false);
              load();
            }}
          />
        )}
      </div>
    </>
  );
}

// ---------------- Event Form ----------------

function EventForm({ initial, onClose }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState(() => ({
    title: initial?.title || "",
    type: initial?.type || "",
    date: initial?.date || "",
    time: initial?.time || "",
    location: initial?.location || "",
    admin: initial?.admin || null,
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
    try {
    const user = JSON.parse(localStorage.getItem("user"));
    const adminId = JSON.parse(localStorage.getItem("adminId"));
    console.log("user object:", user);
    console.log("adminId", adminId);


     if (!adminId) {
      alert("Admin ID not found — please log in again.");
      return;
    }

      const payload = { ...form, admin: { adminId }}; 
      if (isEdit) {
        await api.put(`/api/events/${initial.eventId}`, form);
      } else {
        await api.post("/api/events", payload);
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
      <div style={{ width: 600 }}>
        <EventCard>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>{isEdit ? "Edit" : "Add"} Event</h4>
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
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              placeholder="Type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date (YYYY-MM-DD)"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <input
              placeholder="Time (HH:MM)"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
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
        </EventCard>
      </div>
    </div>
  );
}
