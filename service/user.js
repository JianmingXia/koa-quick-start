'use strict';

const TestModel = require('../model/user');

module.exports = {
  /**
   * @param {Number} userId
   * @returns {{userId: Number}}
   */
  async getUser(userId) {
    return TestModel.getUser(userId);
  },
};
