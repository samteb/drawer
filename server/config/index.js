'use strict';

const env = process.env.NODE_ENV || 'development';

const config = {
  drawer : 'http://localhost:4200',
  api    : 'http://localhost:3000',
  db     : 'mongodb://127.0.0.1:27017/draws',
};

if (env === 'production') {
  config.drawer = 'https://canvas-app.herokuapp.com';
  config.api = 'https://canvas-api.herokuapp.com';
  config.db = 'mongodb://heroku_09bxngsf:l6eaf4rnnqnn2majh6ss2o3mut@ds233596.mlab.com:33596/heroku_09bxngsf';
}

module.exports = config;
