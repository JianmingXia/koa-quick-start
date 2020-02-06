'use strict';

const log = require('../plugin/log');

const ErrorCode = require('../common/error_code');
const ErrorMsg = require('../common/error_msg');
const StatusCode = require('../common/status_code');
const SysError = require('../common/sys_error');
const LogType = require('../common/log_type');

const parseErrorResult = (ctx, err) => {
  if (err instanceof SysError) {
    log.warn({
      type: LogType.SERVER_WARN,
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
      success: false,
      code: err.code || ErrorCode.UNKNOWN_ERROR,
      data: err.data || null,
      message: err.message,
    };
  } else {
    log.error({
      type: LogType.SERVER_ERROR,
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
      success: false,
      code: ErrorCode.UNKNOWN_ERROR,
      data: null,
      message: ErrorMsg.UNKNOWN_ERROR,
    };
  }
};

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();

      // 不存在的路由（忽略 HTTP 方法）
      if (ctx.status === StatusCode.NOT_FOUND) {
        throw new SysError(ErrorMsg.ROUTER_NOT_FOUND, ErrorCode.ROUTER_NOT_FOUND, StatusCode.NOT_FOUND);
      }

      ctx.body = {
        success: true,
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
