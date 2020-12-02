"use strict";
const bcrypt = require("bcryptjs");
const { NOT_EXIST_USER_OR_PASSWORD_ERROR } = require("../../config/codes");
const Fail = require("../../exceptions/Fail");

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define(
    "users",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      avatar: STRING(128),
      password: {
        type: STRING(248),
        set(value) {
          const salt = bcrypt.genSaltSync(12);
          const psw = bcrypt.hashSync(value, salt);
          this.setDataValue("password", psw);
        }
      },
      email: STRING,
      level: {
        type: INTEGER,
        defaultValue: 1
      },
      created_at: DATE
    },
    {
      freezeTableName: true,
      tableName: "users",
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      defaultScope: {
        attributes: {
          exclude: ["password"]
        }
      },
      scopes: {
        comparePassword: {}
      }
    }
  );

  User.verifyEmailPassword = async function (email, password) {
    const user = await app.model.User.scope("comparePassword").findOne({
      where: {
        email
      }
    });

    if (!user) {
      Fail({
        msg: "用户不存在或账号密码错误",
        code: NOT_EXIST_USER_OR_PASSWORD_ERROR
      });
    }

    const correct = bcrypt.compareSync(password, user.password);
    if (!correct) {
      Fail({
        msg: "用户不存在或账号密码错误",
        code: NOT_EXIST_USER_OR_PASSWORD_ERROR
      });
    }

    return {
      email: user.email,
      username: user.username,
      id: user.id,
      avatar: user.avatar,
      level: user.level
    };
  };

  User.associate = function () {
    app.model.User.hasMany(app.model.Post, {
      foreignKey: "user_id",
      targetKey: "user_id"
    });
  };

  return User;
};
