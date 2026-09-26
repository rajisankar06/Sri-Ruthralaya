const { z } = require('zod');
const { prisma, fallbackStore, getIsPrismaConnected, recordAdminActivity, getAdminInfoFromReq } = require('../config/db');

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
    const userId = req.user?.id || 'usr-admin-01';
    const isDb = getIsPrismaConnected();
    const adminInfo = getAdminInfoFromReq(req);
    let createdItem;

    if (isDb && prisma) {
      createdItem = await prisma.event.create({
        data: {
          title: validated.title,
          description: validated.description,
          date: new Date(validated.date),
          image_url: validated.image_url || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
          location: validated.location || 'Academy Hall, Thiruthangal',
          created_by: userId,
        },
      });
    } else {
      createdItem = {
        id: `ev-${Date.now()}`,
        title: validated.title,
        description: validated.description,
        date: new Date(validated.date),
        image_url: validated.image_url || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
        location: validated.location || 'Academy Hall, Thiruthangal',
        created_by: userId,
        created_at: new Date(),
      };
      fallbackStore.events.push(createdItem);
    }

    // Record Admin Activity in DB
    await recordAdminActivity({
      ...adminInfo,
      action: 'CREATE_EVENT',
      entity_type: 'event',
      entity_id: createdItem.id,
      title: 'Scheduled Academy Event',
      details: `Scheduled event "${validated.title}" on ${new Date(validated.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} at ${validated.location || 'Academy Hall'}`,
    });

    return res.status(201).json({ success: true, data: createdItem, message: 'Event created successfully.' });
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
    const adminInfo = getAdminInfoFromReq(req);
    let updatedItem;

    if (isDb && prisma) {
      updatedItem = await prisma.event.update({
        where: { id },
        data: {
          ...(validated.title && { title: validated.title }),
          ...(validated.description && { description: validated.description }),
          ...(validated.date && { date: new Date(validated.date) }),
          ...(validated.image_url && { image_url: validated.image_url }),
          ...(validated.location && { location: validated.location }),
        },
      });
    } else {
      const idx = fallbackStore.events.findIndex(e => e.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Event not found.' });

      fallbackStore.events[idx] = { ...fallbackStore.events[idx], ...validated };
      updatedItem = fallbackStore.events[idx];
    }

    // Record Admin Activity in DB
    await recordAdminActivity({
      ...adminInfo,
      action: 'UPDATE_EVENT',
      entity_type: 'event',
      entity_id: id,
      title: 'Updated Academy Event',
      details: `Updated details for event "${updatedItem.title || validated.title || id}"`,
    });

    return res.status(200).json({ success: true, data: updatedItem, message: 'Event updated.' });
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
    const adminInfo = getAdminInfoFromReq(req);
    let deletedTitle = id;

    if (isDb && prisma) {
      const ev = await prisma.event.findUnique({ where: { id } });
      if (ev) deletedTitle = ev.title;
      await prisma.event.delete({ where: { id } });
    } else {
      const idx = fallbackStore.events.findIndex(e => e.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Event not found.' });
      deletedTitle = fallbackStore.events[idx].title || id;
      fallbackStore.events.splice(idx, 1);
    }

    // Record Admin Activity in DB
    await recordAdminActivity({
      ...adminInfo,
      action: 'DELETE_EVENT',
      entity_type: 'event',
      entity_id: id,
      title: 'Deleted Academy Event',
      details: `Deleted event record "${deletedTitle}"`,
    });

    return res.status(200).json({ success: true, data: null, message: 'Event deleted.' });
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

