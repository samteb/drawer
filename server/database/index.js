'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = Promise;

const ConnectionOptions = {
    promiseLibrary: Promise,
    useMongoClient: true,
    poolSize: 20,
    socketTimeoutMS: 0,
    connectTimeoutMS: 0
};

const DbConnection = mongoose.createConnection(config.db, ConnectionOptions);

module.exports = {
    connection: DbConnection,
    mongoose: mongoose
};
