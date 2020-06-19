'use strict';

const moment = require('moment');

const dateFormat = function() {
  return '[' + moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ']';
};

module.exports = {
  port: '3000',
  logConfig: {
    console: true,
    file: false,
  },
  logger: {
    name: 'dev',
    level: 'debug',
    json: false,
    colorize: 'all',
    localTime: true,
    label: process.pid,
    timestamp: dateFormat,
  },
  bodyParser: {
    enableTypes: ['json', 'form'],
    formLimit: '2mb',
    jsonLimit: '56kb',
  },
  mysql: {
    username: 'root',
    password: '123456',
    database: 'test',
    host: '127.0.0.1',
    options: {
      dialect: 'mysql',
      operatorsAliases: false,
    },
  },
  urlPrefix: '/api/v1',
};
