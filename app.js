'use strict';

const Koa = require('koa');
const config = require('./config');
const log = require('./plugin/log');
const LogType = require('./common/log_type');

const middleware = require('./middleware');

const app = new Koa();

middleware(app);

const server = app.listen(config.port, '0.0.0.0', () => {
  log.info({
    type: LogType.INIT,
    msg: 'Server listening on port: ' + server.address().port,
  });
});

module.exports = app;
