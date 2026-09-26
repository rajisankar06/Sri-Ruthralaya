const { z } = require('zod');
const { prisma, fallbackStore, getIsPrismaConnected } = require('../config/db');

const gallerySchema = z.object({
  title: z.string().min(2),
  media_url: z.string().min(1),
  category: z.string().default('performances'),
  media_type: z.enum(['image', 'video']).default('image'),
});

/**
 * Get all gallery media
 */
async function getGallery(req, res, next) {
  try {
    const { category, media_type } = req.query;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const where = {};
      if (category && category !== 'all') where.category = category;
      if (media_type && media_type !== 'all') where.media_type = media_type;

      const items = await prisma.gallery.findMany({
        where,
        orderBy: { uploaded_at: 'desc' },
      });

      return res.status(200).json({ success: true, data: items, message: 'Gallery media retrieved.' });
    } else {
      let items = [...fallbackStore.gallery];
      if (category && category !== 'all') items = items.filter(g => g.category === category);
      if (media_type && media_type !== 'all') items = items.filter(g => g.media_type === media_type);

      return res.status(200).json({ success: true, data: items, message: 'Gallery media retrieved.' });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Upload / add gallery media (Admin only)
 */
async function addGalleryItem(req, res, next) {
  try {
    const validated = gallerySchema.parse(req.body);
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const item = await prisma.gallery.create({
        data: validated,
      });
      return res.status(201).json({ success: true, data: item, message: 'Media item added to gallery.' });
    } else {
      const newItem = {
        id: `gal-${Date.now()}`,
        ...validated,
        uploaded_at: new Date(),
      };
      fallbackStore.gallery.unshift(newItem);
      return res.status(201).json({ success: true, data: newItem, message: 'Media item added to gallery.' });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Delete gallery media item (Admin only)
 */
async function deleteGalleryItem(req, res, next) {
  try {
    const { id } = req.params;
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      await prisma.gallery.delete({ where: { id } });
      return res.status(200).json({ success: true, data: null, message: 'Media item removed from gallery.' });
    } else {
      const idx = fallbackStore.gallery.findIndex(g => g.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Item not found.' });
      fallbackStore.gallery.splice(idx, 1);
      return res.status(200).json({ success: true, data: null, message: 'Media item removed from gallery.' });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Update gallery media item (Admin only)
 */
async function updateGalleryItem(req, res, next) {
  try {
    const { id } = req.params;
    const validated = gallerySchema.partial().parse(req.body);
    const isDb = getIsPrismaConnected();

    if (isDb && prisma) {
      const item = await prisma.gallery.update({
        where: { id },
        data: validated,
      });
      return res.status(200).json({ success: true, data: item, message: 'Gallery media updated.' });
    } else {
      const idx = fallbackStore.gallery.findIndex(g => g.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Item not found.' });
      fallbackStore.gallery[idx] = { ...fallbackStore.gallery[idx], ...validated };
      return res.status(200).json({ success: true, data: fallbackStore.gallery[idx], message: 'Gallery media updated.' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};
