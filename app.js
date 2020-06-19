'use strict';

const Koa = require('koa');
const config = require('./config');
const log = require('./plugin/log');
const LogType = require('./common/log_type');

const app = new Koa();
// session 会引入 app.js
module.exports = app;

const middleware = require('./middleware');
middleware(app);

const server = app.listen(config.port, '0.0.0.0', () => {
  log.info({
    type: LogType.INIT,
    msg: 'Server listening on port: ' + server.address().port,
  });
});
