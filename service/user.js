'use strict';

const ErrorMsg = require('../common/error_msg');
const ErrorCode = require('../common/error_code');
const SysError = require('../common/sys_error');

const UserModel = require('../model/user');

module.exports = {
  /**
   * @param {Number} userId
   * @returns {{userId: Number}}
   */
  async getUser(userId) {
    const user = await UserModel.getUser(userId);

    if (user) {
      return user;
    } else {
      throw new SysError(ErrorMsg.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND);
    }
  },
};
