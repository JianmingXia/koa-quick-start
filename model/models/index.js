'use strict';

const {Sequelize} = require('sequelize');

const config = require('../../config');
const mysql = config.mysql;

const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, mysql.options);

module.exports = sequelize;
