'use strict';

const express = require('express');
const router = express.Router();

const Diagram = require('../models/diagram');

function getDiagramObjectWithoutSessionID(diagramModel) {
  const diagramObject = diagramModel.toObject();
  delete diagramObject.sessionID;
  return diagramObject;
}

router.get('/diagrams/:id', async (req, res, next) => {
  try {
    const diagram = await Diagram.DiagramModel.findById(req.params.id);
    if (!diagram) {
      return res.status(404).send('Diagram not found!');
    }
    if (!diagram.published && req.sessionID !== diagram.sessionID) {
      return res.status(401).send('You are not allowed to access this diagram!');
    }
    return res.json(getDiagramObjectWithoutSessionID(diagram));
  } catch (error) {
    return next(error);
  }
});

router.post('/diagrams', async (req, res, next) => {
  try {
    const diagram = await Diagram.DiagramModel.create({ sessionID: req.sessionID, shapes: req.body });
    return res.json(getDiagramObjectWithoutSessionID(diagram));
  } catch (error) {
    return next(error);
  }
});

router.put('/diagrams/:id', async (req, res, next) => {
  try {
    const diagram = await Diagram.DiagramModel.findById(req.params.id);
    if (req.sessionID !== diagram.sessionID) {
      return res.status(405).send(`You can't edit because you are not the diagram's owner!`);
    }
    diagram.shapes = req.body.shapes;
    diagram.save();
    return res.json(getDiagramObjectWithoutSessionID(diagram));
  } catch (error) {
    return next(error);
  }
});

router.put('/diagrams/publish/:id', async (req, res, next) => {
  try {
    const diagram = await Diagram.DiagramModel.findById(req.params.id);
    if (req.sessionID !== diagram.sessionID) {
      return res.status(405).send(`You can't edit because you are not the diagram's owner!`);
    }
    diagram.published = !diagram.published;
    diagram.save();
    return res.json(getDiagramObjectWithoutSessionID(diagram));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
