'use strict';

const _ = require('lodash');
const LogType = require('../common/log_type');

let config = require('./config_default');

// load 指定环境配置
const env = process.env.NODE_ENV;

if (env) {
  try {
    let envConfig = require(`./config_${env}`);
    config = _.merge(config, envConfig);
  } catch (e) {
    const log = require('../plugin/log');

    log.error({
      type: LogType.CONFIG_ERROR,
      msg: e.message,
    });
  }
}

module.exports = config;
