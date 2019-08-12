'use strict';

const TestService = require('../service/test');

module.exports = {
  /**
   * 第一个测试
   * @param {*} ctx
   */
  async test(ctx) {
    ctx.body = 'test';
  },

  /**
   * 发生错误的测试
   * @param {*} ctx
   */
  async errTest(ctx) {
    ctx.body = xxxx;
  },

  /**
   * 获取员工
   * @param {*} ctx
   */
  async getUser(ctx) {
    ctx.body = await TestService.getUser();
  },
};
