import express from "express";
import Event from "../models/Event.js"; 
import auth from "../middleware/auth.js";

const router = express.Router();

// Create event
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dateTime, location, capacity, imageUrl } = req.body;
    const event = await Event.create({
      title,
      description,
      dateTime,
      location,
      capacity,
      imageUrl,
      creator: req.user._id,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all upcoming events
router.get("/", async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ dateTime: { $gte: now } })
      .populate("creator", "name")
      .sort({ dateTime: 1 });
    res.json(events);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Update event (only creator)
router.put("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.creator.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const fields = ["title", "description", "dateTime", "location", "capacity", "imageUrl"];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) event[f] = req.body[f];
    });

    await event.save();
    res.json(event);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete event (only creator)
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.creator.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await event.deleteOne();
    res.json({ message: "Event deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * RSVP join: capacity + concurrency-safe + no duplicates.
 * Uses atomic findOneAndUpdate with $addToSet and capacity check.
 */
router.post("/:id/rsvp", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const updated = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        attendees: { $ne: userId },
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] },
      },
      { $addToSet: { attendees: userId } },
      { new: true }
    ).populate("attendees", "name");

    if (!updated)
      return res
        .status(400)
        .json({ message: "Event full or already joined" });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// RSVP leave
router.post("/:id/unrsvp", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const updated = await Event.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { attendees: userId } },
      { new: true }
    ).populate("attendees", "name");

    if (!updated) return res.status(404).json({ message: "Event not found" });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
