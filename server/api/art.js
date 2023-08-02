const express = require('express');
const artsRouter = express.Router();
const { createArt, getArtById, getAllArts, updateArt, destroyArt} = require('../db');
const { requireAdmin, requireUser } = require('./utils');

// GET /api/arts
artsRouter.get('/', async (req, res, next) => {
  try {
    const arts = await getAllArts();

    res.status(200).json(arts);
  } catch (error) {
    next(error);
  }
});
// GET /api/arts/:artid
artsRouter.get('/:artId', async (req, res, next) => {
  try {
    const { artId } = req.params;
    const art = await getArtById(artId);
    res.status(200).json(art);
  } catch (error) {
    next(error);
  }
});


// POST /api/arts
artsRouter.post('/', requireAdmin, async (req, res, next) => {
  try {
    const art = await createArt(req.body);
    res.status(201).json(art);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/arts/:artId
artsRouter.patch('/:artId', requireAdmin, async (req, res, next) => {
  try {
    const { artId } = req.params;
    const art = await getArtById(artId);

    if (!art) {
      return res.status(404).json({ error: 'ArtNotFound', message: 'No art found with that id' });
    }

    const updatedArt = await updateArt({ id: artId, ...req.body });

    res.status(200).json(updatedArt);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/arts/:artId
artsRouter.delete('/:artId', requireAdmin, async (req, res, next) => {
  try {
    const { artId } = req.params;
    const art = await getArtById(artId);

    if (!art) {
      return res.status(404).json({ error: 'ArtNotFound', message: 'No art found with that id' });
    }

    const deletedArt = await destroyArt(artId);
    res.status(200).json(deletedArt);
  } catch (error) {
    next(error);
  }
});


module.exports = artsRouter;
