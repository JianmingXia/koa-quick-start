'use strict';

const Joi = require('@hapi/joi');

const titleSchema = {
  isTerm: Joi.boolean().required(),
  title: Joi.string().required(),
};

const authorSchema = {
  isTerm: Joi.boolean().required(),
  author: Joi.string().required(),
};

const searchSchema = {
  body: Joi.object().keys({
    title: titleSchema,
    author: authorSchema,
    content: Joi.string(),
  }).or('title', 'author', 'content'),
};

module.exports = {
  search: searchSchema,
};
