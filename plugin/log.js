'use strict';

const DailyRotateFile = require('winston-daily-rotate-file');
const {createLogger, transports, format} = require('winston');

const config = require('../config');

const {combine, timestamp, printf} = format;

function getTransports() {
  let res = [];

  if (config.logConfig.console) {
    res.push(new transports.Console(config.logger));
  }
  if (config.logConfig.file) {
    res.push(new DailyRotateFile(config.logger));
  }

  return res;
}

const logger = createLogger({
  transports: getTransports(),
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss:SSS',
    }),
    printf(info => {
      const {level, message, timestamp} = info;

      return `[${timestamp}][${level}][${process.pid}]: ${JSON.stringify(message)}`;
    })
  ),
});

module.exports = logger;
