'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameColumn('projects', 'add_transcription_test', 'transcription_needed'),
        queryInterface.renameColumn('projects', 'add_moderator_test', 'moderator_needed'),
      ]);
    });

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameColumn('projects', 'transcription_needed', 'add_transcription_test'),
        queryInterface.renameColumn('projects', 'moderator_needed', 'add_moderator_test'),
      ]);
    });
  }
};
