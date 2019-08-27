'use strict';

const log = require('../plugin/log');
const LogType = require('../common/log_type');

module.exports = () => {
  return async (ctx, next) => {
    const startTime = Date.now();
    await next();
    let time = (Date.now() - startTime) + 'ms';

    log.info({
      type: LogType.REQUEST_TIME,
      base: {
        ip: ctx.request.ip,
        method: ctx.method,
        path: ctx.path,
        time,
      },
    });
  };
};
