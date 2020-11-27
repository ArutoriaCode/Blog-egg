"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Comment = app.model.define(
    "comments",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      avatar: STRING(120),
      content: STRING(360),
      created_at: DATE,
      updated_at: DATE,
      // 评论所属类型，与ownerId一起使用，根据该条件去查询某表
      type: INTEGER,
      fromId: { type: INTEGER, field: "fromId" },
      fromName: { type: STRING, field: "fromName" },
      commentReplayNum: INTEGER,
      // 本条评论所属哪个类型Id,类型是指文章、留言又或者其他评论id
      ownerId: {
        type: INTEGER,
        field: "ownerId"
      },
      // like表新增时递增该字段
      likeNum: {
        type: INTEGER,
        field: "likeNum"
      }
    },
    {
      freezeTableName: true,
      tableName: "comments",
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  return Comment;
};
