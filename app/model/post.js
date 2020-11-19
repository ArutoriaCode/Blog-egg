"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const post = app.model.define("Posts", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(60),
    img: STRING(248),
    content: STRING,
    heart: {
      type: INTEGER,
      defaultValue: 0
    },
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return post;
};
