const sequelize = require('./');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  ctime: DataTypes.DATE,
  mtime: DataTypes.DATE,
}, {
  tableName: 'user',
  freezeTableName: true,
  timestamps: false,
});

module.exports = User;
