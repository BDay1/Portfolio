const express = require('express');
const projectsRouter = express.Router();
const { createProject, getProjectById, getAllProjects, updateProject, destroyProject } = require('../db');
const { requireAdmin, requireUser } = require('./utils');

// GET /api/projects
projectsRouter.get('/', async (req, res, next) => {
  try {
    const projects = await getAllProjects();

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});
// GET /api/projects/:projectid
projectsRouter.get('/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await getProjectById(projectId);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});


// POST /api/projects
projectsRouter.post('/', requireAdmin, async (req, res, next) => {
  try {
    const project = await createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/projects/:projectId
projectsRouter.patch('/:projectId', requireAdmin, async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await getProjectById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'ProjectNotFound', message: 'No project found with that id' });
    }

    const updatedProject = await updateProject({ id: projectId, ...req.body });

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/projects/:projectId
projectsRouter.delete('/:projectId', requireAdmin, async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await getProjectById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'ProjectNotFound', message: 'No project found with that id' });
    }

    const deletedProject = await destroyProject(projectId);
    res.status(200).json(deletedProject);
  } catch (error) {
    next(error);
  }
});



module.exports = projectsRouter;
