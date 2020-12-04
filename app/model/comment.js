"use strict";

const dayjs = require("dayjs");
const { Op } = require('sequelize')
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Comment = app.model.define(
    "comments",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      // 评论人的头像
      avatar: STRING(360),
      // 评论内容
      content: STRING(360),
      created_at: {
        type: DATE,
        get() {
          const time = this.getDataValue("created_at");
          return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
        }
      },
      updated_at: {
        type: DATE,
        get() {
          const time = this.getDataValue("updated_at");
          return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
        }
      },
      // 评论所属类型，与ownerId一起使用，根据该条件去查询某表
      type: INTEGER,
      // 来自哪个用户id
      fromId: { type: INTEGER, field: "fromId" },
      // 来自哪个用户昵称
      fromName: { type: STRING, field: "fromName" },
      commentReplayNum: {
        type: INTEGER,
        defaultValue: 0,
        field: "commentReplayNum"
      },
      // 本条评论所属哪个类型Id，类型是指文章、或其他评论的id，如果为空，那么代表是在留言板页面进行的评论
      ownerId: { type: INTEGER, field: "ownerId", allowNull: true },
      // like表新增时递增该字段
      likeNum: {
        type: INTEGER,
        field: "likeNum"
      },
      commentId: { type: INTEGER, field: "commentId", allowNull: true },
      toId: { type: INTEGER, field: "toId", allowNull: true },
      toName: { type: STRING, field: "toName", allowNull: true },
      status: { type: INTEGER, field: 'status', defaultValue: 0 },
    },
    {
      freezeTableName: true,
      tableName: "comments",
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      defaultScope: {
        where: {
          status: {
            [Op.ne]: 0
          }
        }
      }
    }
  );

  return Comment;
};
