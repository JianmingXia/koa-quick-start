'use strict';

const config = require('../config');

const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: config.es.host});

module.exports = client;
