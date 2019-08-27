'use strict';

const bodyParser = require('koa-bodyparser');
const requestTimeMiddleware = require('./request_time');
const log = require('../plugin/log');
const responseFormat = require('./response_format');
const config = require('../config');

const SysError = require('../common/sys_error');
const ErrorCode = require('../common/error_code');
const ErrorMsg = require('../common/error_msg');
const StatusCode = require('../common/status_code');
const LogType = require('../common/log_type');

const router = require('../router');

module.exports = app => {
  app.on('error', (err, ctx) => {
    log.error({
      type: LogType.SERVER_ERROR,
      msg: err.message,
    });

    ctx.body = {};
  });

  app
    .use(requestTimeMiddleware())
    .use(responseFormat())
    .use(bodyParser(Object.assign(
      {
        onerror: function (err) {
          if (err.status === StatusCode.REQUEST_ENTITY_TOO_LARGE) {
            throw new SysError(ErrorMsg.REQUEST_ENTITY_TOO_LARGE, ErrorCode.REQUEST_ENTITY_TOO_LARGE, err.status);
          } else {
            throw new SysError(ErrorMsg.UNKNOWN_ERROR, ErrorCode.UNKNOWN_ERROR, StatusCode.OK);
          }
        },
      },
      config.bodyParser
    )))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx) => {
      if (ctx.status === StatusCode.NOT_FOUND) {
        throw new SysError(ErrorMsg.ROUTER_NOT_FOUND, ErrorCode.ROUTER_NOT_FOUND, StatusCode.NOT_FOUND);
      } else {
        throw new SysError(ErrorMsg.UNKNOWN_ERROR, ErrorCode.UNKNOWN_ERROR, StatusCode.OK);
      }
    });
};
