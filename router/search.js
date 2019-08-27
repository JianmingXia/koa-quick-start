'use strict';

const SearchCtrl = require('../controller/search');
const SearchSchema = require('../schema/search');

module.exports = [
  {
    method: 'post',
    path: '/search',
    controller: SearchCtrl.search,
    checkParam: SearchSchema.search,
    middleware: [],
  },
];
