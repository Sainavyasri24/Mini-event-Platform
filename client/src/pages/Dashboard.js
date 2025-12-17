import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";

const Dashboard = () => {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      const data = await api.request("/api/events");
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSave = async (payload) => {
    try {
      if (editing) {
        await api.request(`/api/events/${editing._id}`, "PUT", payload, token);
      } else {
        await api.request("/api/events", "POST", payload, token);
      }
      setEditing(null);
      loadEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.request(`/api/events/${id}`, "DELETE", null, token);
      loadEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRsvp = async (id) => {
    try {
      await api.request(`/api/events/${id}/rsvp`, "POST", null, token);
      loadEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUnrsvp = async (id) => {
    try {
      await api.request(`/api/events/${id}/unrsvp`, "POST", null, token);
      loadEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard">
      <h2>Upcoming Events</h2>
      {error && <p className="error">{error}</p>}
      <section className="event-form-section">
        <h3>{editing ? "Edit Event" : "Create Event"}</h3>
        <EventForm initial={editing} onSave={handleSave} />
        {editing && (
          <button onClick={() => setEditing(null)}>Cancel edit</button>
        )}
      </section>
      <section className="events-grid">
        {events.map((ev) => (
          <EventCard
            key={ev._id}
            event={ev}
            onRsvp={handleRsvp}
            onUnrsvp={handleUnrsvp}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
