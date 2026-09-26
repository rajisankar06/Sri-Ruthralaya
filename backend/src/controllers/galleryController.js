const { z } = require('zod');
const { prisma, fallbackStore, getIsPrismaConnected, recordAdminActivity, getAdminInfoFromReq } = require('../config/db');

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
    const adminInfo = getAdminInfoFromReq(req);
    let createdItem;

    if (isDb && prisma) {
      createdItem = await prisma.gallery.create({
        data: validated,
      });
    } else {
      createdItem = {
        id: `gal-${Date.now()}`,
        ...validated,
        uploaded_at: new Date(),
      };
      fallbackStore.gallery.unshift(createdItem);
    }

    // Record Admin Activity in DB
    await recordAdminActivity({
      ...adminInfo,
      action: 'UPLOAD_GALLERY',
      entity_type: 'gallery',
      entity_id: createdItem.id,
      title: 'Uploaded Gallery Media',
      details: `Uploaded photo "${validated.title}" to category "${validated.category}"`,
    });

    return res.status(201).json({ success: true, data: createdItem, message: 'Media item added to gallery.' });
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
    const adminInfo = getAdminInfoFromReq(req);
    let deletedTitle = id;

    if (isDb && prisma) {
      const item = await prisma.gallery.findUnique({ where: { id } });
      if (item) deletedTitle = item.title;
      await prisma.gallery.delete({ where: { id } });
    } else {
      const idx = fallbackStore.gallery.findIndex(g => g.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Item not found.' });
      deletedTitle = fallbackStore.gallery[idx].title || id;
      fallbackStore.gallery.splice(idx, 1);
    }

    // Record Admin Activity in DB
    await recordAdminActivity({
      ...adminInfo,
      action: 'DELETE_GALLERY',
      entity_type: 'gallery',
      entity_id: id,
      title: 'Deleted Gallery Media',
      details: `Removed gallery photo "${deletedTitle}"`,
    });

    return res.status(200).json({ success: true, data: null, message: 'Media item removed from gallery.' });
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
    const adminInfo = getAdminInfoFromReq(req);
    let updatedItem;

    if (isDb && prisma) {
      updatedItem = await prisma.gallery.update({
        where: { id },
        data: validated,
      });
    } else {
      const idx = fallbackStore.gallery.findIndex(g => g.id === id);
      if (idx === -1) return res.status(404).json({ success: false, data: null, message: 'Item not found.' });
      fallbackStore.gallery[idx] = { ...fallbackStore.gallery[idx], ...validated };
      updatedItem = fallbackStore.gallery[idx];
    }

    // Record Admin Activity in DB
    await recordAdminActivity({
      ...adminInfo,
      action: 'UPDATE_GALLERY',
      entity_type: 'gallery',
      entity_id: id,
      title: 'Updated Gallery Media',
      details: `Updated details for gallery photo "${updatedItem.title || validated.title || id}"`,
    });

    return res.status(200).json({ success: true, data: updatedItem, message: 'Gallery media updated.' });
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

