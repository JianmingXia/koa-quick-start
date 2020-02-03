'use strict';

const UserModel = require('../model/user');

module.exports = {
  /**
   * @param {Number} userId
   * @returns {{userId: Number}}
   */
  async getUser(userId) {
    return UserModel.getUser(userId);
  },
};
