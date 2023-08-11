'use strict';

const { ProjectTypes } = require('shared');
const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => Promise.all([
      queryInterface.addColumn('projects', 'status', {
        type: DataTypes.ENUM(...Object.values(ProjectTypes.Status)),
        allowNull: false,
        defaultValue: ProjectTypes.Status.Draft,
      }, { transaction: t }),
      queryInterface.addColumn('projects', 'start_date', {
        type: DataTypes.DATE,
      }, { transaction: t }),
      queryInterface.addColumn('projects', 'end_date', {
        type: DataTypes.DATE,
      }, { transaction: t }),
      queryInterface.addColumn('projects', 'avatar_url', {
        type: DataTypes.STRING,
      }, { transaction: t }),
      queryInterface.addColumn('projects', 'other_requirements', {
        type: DataTypes.STRING,
      }, { transaction: t }),
      queryInterface.addColumn('projects', 'add_language_test', {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }, { transaction: t }),
      queryInterface.addColumn('projects', 'add_screening_survey', {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }, { transaction: t }),
      queryInterface.addColumn('projects', 'require_candidate_recording', {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }, { transaction: t }),
      queryInterface.addColumn('projects', 'add_transcription_test', {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }, { transaction: t }),
      queryInterface.addColumn('projects', 'add_moderator_test', {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }, { transaction: t }),
    ]));
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => Promise.all([
      queryInterface.removeColumn('projects', 'status', { transaction: t }),
      queryInterface.removeColumn('projects', 'start_date', { transaction: t }),
      queryInterface.removeColumn('projects', 'end_date', { transaction: t }),
      queryInterface.removeColumn('projects', 'avatar_url', { transaction: t }),
      queryInterface.removeColumn('projects', 'other_requirements', { transaction: t }),
      queryInterface.removeColumn('projects', 'add_language_test', { transaction: t }),
      queryInterface.removeColumn('projects', 'add_screening_survey', { transaction: t }),
      queryInterface.removeColumn('projects', 'require_candidate_recording', { transaction: t }),
      queryInterface.removeColumn('projects', 'add_transcription_test', { transaction: t }),
      queryInterface.removeColumn('projects', 'add_moderator_test', { transaction: t }),
    ]));
  }
};
