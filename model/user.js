'use strict';

// const User = require('./models/user');

module.exports = {
  /**
   * @param {Number} userId
   * @returns {{userId: Number}}
   */
  async getUser(userId) {
    // return await User.findOne({
    //   where: {
    //     userId,
    //   },
    // });
    return {
      userId,
    };
  },
};
