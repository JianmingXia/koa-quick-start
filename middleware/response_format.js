'use strict';

const log = require('../plugin/log');

const ErrorCode = require('../common/error_code');
const ErrorMsg = require('../common/error_msg');
const StatusCode = require('../common/status_code');

const parseErrorResult = (ctx, err) => {
  if (err instanceof ReferenceError || err instanceof RangeError || err instanceof SyntaxError || err instanceof URIError) {
    log.error({
      type: 'Server Error',
      msg: err.message,
      base: {
        method: ctx.method,
        path: ctx.path,
        status: ctx.status,
      },
      payload: ctx.reqParams,
    });

    // 未知错误
    return {
      code: ErrorCode.UNKNOWN_ERROR,
      data: null,
      message: ErrorMsg.UNKNOWN_ERROR,
    };
  } else {
    log.warn({
      type: 'Server Warn',
      msg: err.message,
      base: {
        method: ctx.method,
        path: ctx.path,
        status: ctx.status,
      },
      payload: ctx.reqParams,
    });

    // 自定义错误
    return {
      code: err.code || ErrorCode.UNKNOWN_ERROR,
      data: err.data || null,
      message: err.message,
    };
  }
};

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();

      ctx.body = {
        code: ErrorCode.OK,
        data: ctx.body,
        message: null,
      };
    } catch (err) {
      ctx.status = err.status || StatusCode.OK;

      ctx.body = parseErrorResult(ctx, err);
    }
  };
};
