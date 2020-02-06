'use strict';

const fs = require('fs');

const Router = require('koa-router');

const CheckParam = require('../middleware/check_param');
const log = require('../plugin/log');
const config = require('../config');
const LogType = require('../common/log_type');

const router = new Router({prefix: config.urlPrefix});

function addToRouter(routers) {
  routers.forEach(item => {
    const method = item.method;

    log.info({
      type: LogType.INIT_ROUTER,
      payload: {
        method,
        path: `${config.urlPrefix}${item.path}`,
      },
    });

    if (item.middleware) {
      if (false === Array.isArray(item.middleware)) {
        item.middleware = [item.middleware];
      }

      router[method](item.path, CheckParam(item.checkParam), ...item.middleware, item.controller);
    } else {
      router[method](item.path, CheckParam(item.checkParam), item.controller);
    }
  });
}

// 路由初始化
function mergeRouters() {
  const files = fs.readdirSync(__dirname);
  files.forEach((file) => {
    if (file !== 'index.js') {
      addToRouter(require(`./${file}`));
    }
  });
}

mergeRouters();

module.exports = router;
