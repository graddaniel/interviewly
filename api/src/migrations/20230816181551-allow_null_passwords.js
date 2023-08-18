'use strict';

const { DataTypes } = require('sequelize');

const PASSWORD_LENGTH = 64; 

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('accounts', 'password_hash', {
      type: DataTypes.STRING(PASSWORD_LENGTH),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('accounts', 'password_hash', {
      type: DataTypes.STRING(PASSWORD_LENGTH),
      allowNull: false,
    });
  }
};