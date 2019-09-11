'use strict';

const DB = require('../models');

module.exports = {
  /**
   * @param {Number} userId
   * @returns {{userId: Number}}
   */
  async getUser(userId) {
    return DB.User.findOne({
      where: {
        userId,
      },
    });
  },
};
