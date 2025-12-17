import React, { useState, useEffect } from "react";

const EventForm = ({ initial, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    capacity: 1,
    imageUrl: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        dateTime: initial.dateTime
          ? new Date(initial.dateTime).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      capacity: Number(form.capacity),
      dateTime: new Date(form.dateTime),
    };
    onSave(payload);
  };

  // basic file -> base64 as "imageUrl"
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((f) => ({ ...f, imageUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="dateTime"
        value={form.dateTime}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="capacity"
        min="1"
        value={form.capacity}
        onChange={handleChange}
        required
      />
      <input type="file" accept="image/*" onChange={handleImage} />
      <button type="submit">Save</button>
    </form>
  );
};

export default EventForm;
