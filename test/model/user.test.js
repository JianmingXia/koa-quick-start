'use strict';

const assert = require('assert');

const UserModel = require('../../model/user');

describe('model/user.js', () => {
  describe('获取用户', () => {
    it('获取用户：成功', async () => {
      const userId = 1;

      const res = await UserModel.getUser(userId);

      assert.equal(res.userId, userId);
    });
  });
});
