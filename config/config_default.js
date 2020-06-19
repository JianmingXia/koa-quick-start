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
  koaSession: {
    keys: ['gB6w*s&S2fd3pTkF'],
    config: {
      /** (string) cookie key (default is koa.sess) */
      key: 'koa.sess',
      /** (number || 'session') maxAge in ms (default is 1 days) */
      /** 'session' will result in a cookie that expires when session/browser is closed */
      /** Warning: If a session cookie is stolen, this cookie will never expire */
      maxAge: 86400000,
      /** (boolean) automatically commit headers (default true) */
      autoCommit: true,
      /** (boolean) can overwrite or not (default true) */
      overwrite: true,
      /** (boolean) httpOnly or not (default true) */
      httpOnly: true,
      /** (boolean) signed or not (default true) */
      signed: true,
      /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
      rolling: false,
      /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
      renew: false,
      /** (boolean) secure cookie*/
      secure: false,
      /** (string) session cookie sameSite options (default null, don't set it) */
      sameSite: null,
    },
  },
  urlPrefix: '/api/v1',
};
