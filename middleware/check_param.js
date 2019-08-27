'use strict';

const Joi = require('@hapi/joi');

const log = require('../plugin/log');
const ErrorCode = require('../common/error_code');
const ErrorMsg = require('../common/error_msg');
const SysError = require('../common/sys_error');
const LogType = require('../common/log_type');

module.exports = (params) => {
  return async function(ctx, next) {
    // 请求参数初始化
    const reqParam = {
      router: ctx.params,
      query: ctx.query,
      body: ctx.request.body,
      headers: ctx.headers,
    };

    ctx.reqParams = reqParam;

    if (params) {
      const schemaKeys = Object.getOwnPropertyNames(params);

      for (const keyName of schemaKeys) {
        const validResult = Joi.validate(reqParam[keyName], params[keyName]);

        if (validResult.error) {
          log.warn({
            type: LogType.PARAM_ERROR,
            msg: validResult.error.message,
          });

          throw new SysError(ErrorMsg.INVALID_PARAM, ErrorCode.INVALID_PARAM);
        }

        reqParam[keyName] = validResult.value;
      }
    }

    await next();
  };
};
