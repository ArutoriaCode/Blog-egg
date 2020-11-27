"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable(
      "comments",
      {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        avatar: STRING(120),
        content: STRING(360),
        created_at: DATE,
        updated_at: DATE,
        type: STRING,
        fromId: INTEGER,
        fromName: STRING,
        commentReplayNum: INTEGER,
        ownerId: INTEGER,
        likeNum: INTEGER
      },
      {
        tableName: "comments",
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    );
  },

  down: async queryInterface => {
    await queryInterface.dropTable("comments");
  }
};
