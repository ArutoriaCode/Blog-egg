"use strict";

const { LIKE_TYPE } = require("../../config/keys");

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const Like = app.model.define(
    "like",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ownerId: {
        type: INTEGER,
        field: "ownerId"
      },
      type: {
        type: INTEGER,
        field: "type"
      },
      uid: {
        type: INTEGER,
        field: "uid"
      }
    },
    {
      tableName: "like",
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
      scopes: {
        post: {
          where: {
            type: LIKE_TYPE.POST
          }
        },
        comment: {
          where: {
            type: LIKE_TYPE.COMMENT
          }
        }
      }
    }
  );

  return Like;
};
