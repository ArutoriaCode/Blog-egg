"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable(
      "comments",
      {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        avatar: STRING(360),
        content: STRING(360),
        created_at: DATE,
        updated_at: DATE,
        type: STRING,
        fromId: { type: INTEGER, field: "fromId" },
        fromName: { type: STRING, field: "fromName" },
        commentReplayNum: {
          type: INTEGER,
          defaultValue: 0,
          field: "commentReplayNum"
        },
        ownerId: { type: INTEGER, field: 'ownerId', allowNull: true },
        likeNum: {
          type: INTEGER,
          defaultValue: 0,
          field: "likeNum"
        },
        commentId: { type: INTEGER, field: 'commentId', allowNull: true },
        toId: { type: INTEGER, field: "toId", allowNull: true },
        toName: { type: STRING, field: "toName", allowNull: true }
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
