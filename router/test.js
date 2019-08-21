'use strict';

const TestCtrl = require('../controller/test');
const PermissionCtrl = require('../controller/permission');
const TestSchema = require('../schema/test');

module.exports = [
  {
    method: 'get',
    path: '/test',
    controller: TestCtrl.test,
    middleware: [],
  },
  {
    method: 'get',
    path: '/throw_undefined_error',
    controller: TestCtrl.throwUndefinedError,
    middleware: [],
  },
  {
    method: 'get',
    path: '/users/:userId',
    controller: TestCtrl.getUser,
    checkParam: TestSchema.getUser,
    middleware: [],
  },
  {
    method: 'get',
    path: '/no_permission',
    controller: TestCtrl.test,
    permissions: [PermissionCtrl.checkNoPermission],
    middleware: [],
  },
];
