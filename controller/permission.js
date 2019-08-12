'use strict';

const SysError = require('../common/sys_error');
const ErrorMsg = require('../common/error_msg');

/**
 * 这里只是作为路由 permissions 的一个示例
 */
module.exports = {
  /**
   * 没有权限
   * @param {*} ctx
   */
  async checkNoPermission() {
    throw new SysError(ErrorMsg.NO_PERMISSION);
  },
};
