import React from "react";
import { useAuth } from "../context/AuthContext";

const EventCard = ({ event, onRsvp, onUnrsvp, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isCreator = user && event.creator && event.creator._id === user.id;
  const isAttending =
    user &&
    event.attendees?.some((a) => (a._id || a) === user.id);

  const spotsLeft = event.capacity - (event.attendees?.length || 0);

  return (
    <div className="event-card">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="event-image"
        />
      )}
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>
        {new Date(event.dateTime).toLocaleString()} • {event.location}
      </p>
      <p>
        {event.attendees?.length || 0}/{event.capacity} attending •{" "}
        {spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"}
      </p>
      <div className="event-actions">
        {!isAttending && spotsLeft > 0 && (
          <button onClick={() => onRsvp(event._id)}>RSVP</button>
        )}
        {isAttending && (
          <button onClick={() => onUnrsvp(event._id)}>Leave</button>
        )}
        {isCreator && (
          <>
            <button onClick={() => onEdit(event)}>Edit</button>
            <button onClick={() => onDelete(event._id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
