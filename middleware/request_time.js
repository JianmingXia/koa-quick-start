'use strict';

const log = require('../plugin/log');

module.exports = () => {
  return async (ctx, next) => {
    const startTime = Date.now();
    await next();
    let time = (Date.now() - startTime) + 'ms';

    log.info({
      type: 'Request Time',
      base: {
        ip: ctx.request.ip,
        method: ctx.method,
        path: ctx.path,
        time,
      },
    });
  };
};
