'use strict';

const Joi = require('@hapi/joi');

const getUser = {
  router: {
    userId: Joi.number().required(),
  },
};

module.exports = {
  getUser,
};
