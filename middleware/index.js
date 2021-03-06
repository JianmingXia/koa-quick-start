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

  if (config.koaSession.config.signed) {
    app.keys = config.koaSession.keys;
  }

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
    // controller 未传入 next，路由匹配默认不会调用 allowedMethods
    .use(router.allowedMethods({
      throw: true,
      // 不支持此 HTTP 方法
      notImplemented: () => {
        return new SysError(ErrorMsg.ROUTER_NOT_FOUND, ErrorCode.ROUTER_NOT_FOUND, StatusCode.NOT_FOUND);
      },
      // 路由存在，无对应方法
      methodNotAllowed: () => {
        return new SysError(ErrorMsg.ROUTER_NOT_FOUND, ErrorCode.ROUTER_NOT_FOUND, StatusCode.NOT_FOUND);
      },
    }));
};
