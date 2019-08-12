'use strict';

const TestModel = require('../model/test');

module.exports = {
  /**
   * 测试
   */
  async getUser() {
    return TestModel.getUser();
  },
};
