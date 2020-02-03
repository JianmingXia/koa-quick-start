'use strict';

const moment = require('moment');

const dateFormat = function() {
  return '[' + moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ']';
};

module.exports = {
  port: '3000',
  logConfig: {
    console: false,
    file: true,
  },
  logger: {
    name: 'dev',
    level: 'info',
    json: false,
    colorize: 'all',
    localTime: true,
    label: process.pid,
    timestamp: dateFormat,
    filename: '%DATE%.log',
    dirname: './logs/',
  },
};
