'use strict';

const DataDb = require('../database');
const Schema = DataDb.mongoose.Schema;

const ShapeSchema = new Schema({
  _id: false,
  name: {
    type: String,
    enum: {
      values: ['circle', 'square', 'triangle'],
      message: 'Invalid Shape Name'
    },
    required: true
  },
  position: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  }
});

const DiagramSchema = new Schema(
    {
        sessionID: {
          type: String,
          required: true
        },
        published: {
            type: Boolean,
            default: false
        },
        shapes: [ ShapeSchema ]
    },
    {
        collection: 'Diagrams',
        versionKey: false
    }
);

exports.DiagramModel = DataDb.connection.model('Diagram', DiagramSchema);
