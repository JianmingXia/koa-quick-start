'use strict';

const UserService = require('../service/user');

module.exports = {
  /**
   * 第一个测试
   * @param {*} ctx
   */
  async test(ctx) {
    ctx.body = 'test';
  },

  /**
   * 抛出异常的测试
   * @param {*} ctx
   */
  async throwUndefinedError(ctx) {
    ctx.body = xxxx;
  },

  /**
   * 获取员工
   * @param {*} ctx
   */
  async getUser(ctx) {
    const {userId} = ctx.reqParams.router;

    ctx.body = await UserService.getUser(userId);
  },
};
