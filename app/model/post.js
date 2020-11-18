"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Post = app.model.define("post", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(60),
    img: STRING(248),
    content: STRING,
    heart: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    user_id: INTEGER
  });

  return Post;
};
