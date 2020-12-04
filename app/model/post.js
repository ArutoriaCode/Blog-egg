"use strict";

const dayjs = require("dayjs");

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Post = app.model.define(
    "posts",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: STRING(60),
      img: STRING(248),
      content: TEXT('long'),
      likeNum: {
        type: INTEGER,
        defaultValue: 0,
        field: "likeNum"
      },
      user_id: {
        // field 保存到表中的字段名
        field: 'user_id',
        type: INTEGER
      },
      created_at: {
        type: DATE,
        get() {
          const time = this.getDataValue('created_at')
          return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      updated_at: {
        type: DATE,
        get() {
          const time = this.getDataValue('updated_at')
          return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      commentNum: {
        type: INTEGER,
        defaultValue: 0,
        field: 'commentNum'
      },
      readCount: {
        type: INTEGER,
        defaultValue: 0,
        field: 'readCount'
      },
      shortContent: {
        type: STRING(200),
        field: "shortContent"
      }
    },
    {
      freezeTableName: true,
      tableName: 'posts',
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  Post.associate = function () {
    app.model.Post.belongsTo(app.model.User, { foreignKey: "user_id" });
  };

  return Post;
};
