'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    ctime: DataTypes.DATE,
  }, {
    tableName: 'user',
    freezeTableName: true,
    timestamps: false,
  });

  return User;
};
