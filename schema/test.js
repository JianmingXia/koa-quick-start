'use strict';

const Joi = require('joi');

const getUser = {
  router: {
    userId: Joi.number().required(),
  },
};

module.exports = {
  getUser,
};