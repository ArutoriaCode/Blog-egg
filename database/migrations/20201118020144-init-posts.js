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
    await queryInterface.createTable(
      "Posts",
      {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        title: STRING(60),
        img: STRING(248),
        content: STRING,
        heart: {
          type: INTEGER,
          defaultValue: 0
        },
        user_id: {
          // field 保存到表中的字段名
          field: "user_id",
          type: INTEGER
        },
        created_at: DATE,
        updated_at: DATE
      },
      {
        tableName: "posts",
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    );
  },

  down: async queryInterface => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Posts");
  }
};
