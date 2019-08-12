'use strict';

const fs = require('fs');

const Router = require('koa-router');

const CheckParam = require('../middleware/check_param');
const log = require('../plugin/log');
const config = require('../config');

const router = new Router(config.urlPrefix);

function addToRouter(routers) {
  routers.forEach(item => {
    const method = item.method ? item.method : 'all';

    log.info({
      type: 'Server Init Router',
      payload: {
        method,
        path: item.path,
      },
    });

    if (item.permissions) {
      if (false === Array.isArray(item.permissions)) {
        item.permissions = [item.permissions];
      }

      router[method](item.path, CheckParam(item.checkParam), ...item.permissions, item.controller);
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
