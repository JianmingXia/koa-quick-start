'use strict';

const _ = require('lodash');
let config = require('./config.default');

// load 默认环境配置
try {
  let envConfig = require('./config');
  config = _.merge(config, envConfig);
} catch (e) {
  if (false === config.debug) {
    console.log('[ERROR] loading config/config.js failed:', e.message); // eslint-disable-line
  } else {
    if (e.code !== 'MODULE_NOT_FOUND') {
      console.log('[ERROR] loading config/config.js failed:', e.message); // eslint-disable-line
    }
  }
}

module.exports = config;
