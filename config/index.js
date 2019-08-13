'use strict';

const _ = require('lodash');
let config = require('./config.default');

// load 指定环境配置
const env = process.env.NODE_ENV;

if (env) {
  try {
    let envConfig = require(`./config.${env}`);
    config = _.merge(config, envConfig);
  } catch (e) {
    const log = require('../plugin/log');

    log.error({
      type: 'Config Error',
      msg: e.message,
    });
  }
}

module.exports = config;
