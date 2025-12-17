import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import EventCard from "../components/EventCard";

const MyEventsPage = () => {
  const { user, token } = useAuth();
  const [created, setCreated] = useState([]);
  const [attending, setAttending] = useState([]);

  const load = async () => {
    const events = await api.request("/api/events");
    setCreated(events.filter((e) => e.creator._id === user.id));
    setAttending(
      events.filter((e) =>
        e.attendees.some((a) => (a._id || a) === user.id)
      )
    );
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>My Events</h2>
      <h3>Created by me</h3>
      <div className="events-grid">
        {created.map((e) => (
          <EventCard
            key={e._id}
            event={e}
            onRsvp={() => {}}
            onUnrsvp={() => {}}
            onEdit={() => {}}
            onDelete={async (id) => {
              await api.request(`/api/events/${id}`, "DELETE", null, token);
              load();
            }}
          />
        ))}
      </div>
      <h3>I'm attending</h3>
      <div className="events-grid">
        {attending.map((e) => (
          <EventCard
            key={e._id}
            event={e}
            onRsvp={() => {}}
            onUnrsvp={async (id) => {
              await api.request(`/api/events/${id}/unrsvp`, "POST", null, token);
              load();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MyEventsPage;
