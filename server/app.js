'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const config = require('./config');
const diagramsRouter = require('./routes/diagrams');

const app = express();

app.use(logger('dev'));

//Enable CORS
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || [ config.drawer, config.server ].includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed to send request from origin.'));
      }
    }
  })
);

//Parse application/json
app.use(
  bodyParser.json({
    limit: '10mb'
  })
);

//Parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true
  })
);

app.use(session({
  secret: 'my-awesome-canvas',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/../dist/drawer'));

app.use('/api', diagramsRouter);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/../dist/drawer/index.html')));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(new Date() + `Listening on port ${app.get('port')}`);
});
