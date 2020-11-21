"use strict";
const bcrypt = require("bcryptjs");
const Fail = require("../../exceptions/Fail");

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define(
    "Users",
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
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      }
    }
  );

  User.verifyEmailPassword = async function (email, password) {
    const user = await app.model.User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      Fail("用户不存在或账号密码错误");
    }

    const correct = bcrypt.compareSync(password, user.password);
    if (!correct) {
      Fail("用户不存在或账号密码错误");
    }

    return user;
  };

  User.associate = function() {
    app.model.User.hasMany(app.model.Post, { foreignKey: "user_id", targetKey: 'user_id' });
  };

  return User;
};
