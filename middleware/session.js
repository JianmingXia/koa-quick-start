'use strict';

const session = require('koa-session');
const app = require('../app');
const config = require('../config');

// 默认未引入外部存储
module.exports = session(config.koaSession.config, app);
