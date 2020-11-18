"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable("Post", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: STRING(60),
      img: STRING(248),
      content: STRING,
      heart: INTEGER,
      created_at: DATE,
      updated_at: DATE,
      user_id: INTEGER
    });
  },

  down: async queryInterface => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Post");
  }
};
