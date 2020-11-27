"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Post = app.model.define(
    "posts",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: STRING(60),
      img: STRING(248),
      content: STRING,
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
      created_at: DATE,
      updated_at: DATE,
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
