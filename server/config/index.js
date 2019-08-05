'use strict';

const env = process.env.NODE_ENV || 'development';

const config = {
  drawer   : 'http://localhost:4200',
  server   : 'http://localhost:3000',
  database : 'mongodb://127.0.0.1:27017/draws',
};

if (env === 'production') {
  config.server = 'https://my-drawer.herokuapp.com';
  config.database = 'mongodb://heroku_sk8q0pwv:n4e5j2u40dvv7lqfkvvp5ck519@ds259367.mlab.com:59367/heroku_sk8q0pwv';
}

module.exports = config;
