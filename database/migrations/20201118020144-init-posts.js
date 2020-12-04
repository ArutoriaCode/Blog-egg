"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable(
      "posts",
      {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        title: STRING(60),
        img: STRING(248),
        content: TEXT('long'),
        likeNum: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          field: "likeNum"
        },
        user_id: {
          // field 保存到表中的字段名
          field: "user_id",
          type: INTEGER
        },
        readCount: {
          field: 'readCount',
          type: INTEGER,
          defaultValue: 0
        },
        commentNum: {
          field: 'commentNum',
          type: INTEGER,
          defaultValue: 0
        },
        shortContent: {
          type: STRING(300),
          field: 'shortContent',
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
    await queryInterface.dropTable("posts");
  }
};
