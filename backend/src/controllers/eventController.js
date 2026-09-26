const { z } = require('zod');
const { prisma, fallbackStore, getIsPrismaConnected } = require('../config/db');

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  date: z.string(),
  image_url: z.string().optional(),
  location: z.string().optional(),
});

/**
 * Get all events (Public & Authenticated)
 */
async function getAllEvents(req, res, next) {
  try {
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const events = await prisma.event.findMany({
        orderBy: { date: 'asc' },
      });
      return res.status(200).json({ success: true, data: events, message: 'Events retrieved.' });
    } else {
      const sorted = [...fallbackStore.events].sort((a, b) => new Date(a.date) - new Date(b.date));
      return res.status(200).json({ success: true, data: sorted, message: 'Events retrieved.' });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Create event (Admin only)
 */
async function createEvent(req, res, next) {
  try {
    const validated = eventSchema.parse(req.body);
    const userId = req.user.id;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const event = await prisma.event.create({
        data: {
          title: validated.title,
          description: validated.description,
          date: new Date(validated.date),
          image_url: validated.image_url || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
          location: validated.location || 'Academy Hall, Thiruthangal',
          created_by: userId,
        },
      });
      return res.status(201).json({ success: true, data: event, message: 'Event created successfully.' });
    } else {
      const newEvent = {
        id: `ev-${Date.now()}`,
        title: validated.title,
        description: validated.description,
        date: new Date(validated.date),
        image_url: validated.image_url || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
        location: validated.location || 'Academy Hall, Thiruthangal',
        created_by: userId,
        created_at: new Date(),
      };
      fallbackStore.events.push(newEvent);
      return res.status(201).json({ success: true, data: newEvent, message: 'Event created successfully.' });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Update event (Admin only)
 */
async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    const validated = eventSchema.partial().parse(req.body);
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const updated = await prisma.event.update({
        where: { id },
        data: {
          ...(validated.title && { title: validated.title }),
          ...(validated.description && { description: validated.description }),
          ...(validated.date && { date: new Date(validated.date) }),
          ...(validated.image_url && { image_url: validated.image_url }),
          ...(validated.location && { location: validated.location }),
        },
      });
      return res.status(200).json({ success: true, data: updated, message: 'Event updated.' });
    } else {
      const idx = fallbackStore.events.findIndex(e => e.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Event not found.' });

      fallbackStore.events[idx] = { ...fallbackStore.events[idx], ...validated };
      return res.status(200).json({ success: true, data: fallbackStore.events[idx], message: 'Event updated.' });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Delete event (Admin only)
 */
async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      await prisma.event.delete({ where: { id } });
      return res.status(200).json({ success: true, data: null, message: 'Event deleted.' });
    } else {
      const idx = fallbackStore.events.findIndex(e => e.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Event not found.' });
      fallbackStore.events.splice(idx, 1);
      return res.status(200).json({ success: true, data: null, message: 'Event deleted.' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
