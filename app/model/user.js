"use strict";
const bcrypt = require("bcryptjs");
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
    console.log("🚀 ~ file: user.js ~ line 52 ~ user ~ user", user);

    if (!user) {
      Fail("用户不存在或账号密码错误");
    }

    const correct = bcrypt.compareSync(password, user.password);
    if (!correct) {
      Fail("用户不存在或账号密码错误");
    }

    return {
      email: user.email,
      username: user.username,
      id: user.id
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
