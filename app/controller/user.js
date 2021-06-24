"use strict";

const { LOGIN_SUCEESS, REGISTER_SUCCESS, BANNED_USER } = require("../../config/codes");
const Fail = require("../../exceptions/Fail");
const Success = require("../../exceptions/Success");
const {
  ValidationCreateUser,
  ValidationGetToken,
  ValidationUserId
} = require("../validators/user");

const Controller = require("egg").Controller;

function decodeByToken(token, secret) {
  if (!token) {
    return "token: 请传递刷新令牌";
  }

  let decodedUser = null;
  try {
    decodedUser = this.app.jwt.verify(token, secret);
  } catch (error) {
    return "无效的刷新令牌";
  }

  if (decodedUser.name !== "refresh_token" || !decodedUser.id) {
    return "无效的刷新令牌";
  }

  return decodedUser;
}

class UserController extends Controller {
  async sgin(user) {
    const access_token = this.app.jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.level,
        name: "access_token",
        createTime: new Date().getTime()
      },
      this.app.config.jwt.secret,
      {
        expiresIn: "2h"
        // expiresIn: "10000" // 测试双令牌刷新 10秒后token过期
      }
    );

    const refresh_token = this.app.jwt.sign(
      {
        id: user.id,
        level: user.level,
        name: "refresh_token",
        createTime: new Date().getTime()
      },
      this.app.config.jwt.secret,
      {
        expiresIn: "30d"
      }
    );

    return {
      access_token,
      refresh_token
    };
  }

  async create() {
    const v = await new ValidationCreateUser().validate(this.ctx);
    const user = await this.ctx.service.user.create({
      ...v.data.body,
      avatar: this.ctx.request.files[0]
    });

    const token = await this.sgin(user);
    // 注册成功后直接返回token
    Success({
      data: {
        token,
        user: {
          email: user.email,
          username: user.username,
          id: user.id,
          avatar: user.avatar
        }
      },
      msg: "注册成功！",
      code: REGISTER_SUCCESS
    });
  }

  async token() {
    const ctx = this.ctx;
    const v = await new ValidationGetToken().validate(ctx);

    const { email, password } = v.data.body;
    const user = await ctx.model.User.verifyEmailPassword(email, password);
    if (user.level === 0) {
      Fail({
        msg: '账号已被封禁',
        code: BANNED_USER
      });
    }

    const token = await this.sgin(user);
    Success({
      data: {
        token,
        user
      },
      code: LOGIN_SUCEESS
    });
  }

  async refresh() {
    const token = this.ctx.request.body.token;
    const decodedUser = decodeByToken(token, this.app.config.jwt.secret);
    if (typeof decodeByToken === "string") {
      Fail(decodedUser);
    }

    const user = await this.ctx.service.user.get(decodedUser.id);
    const newToken = await this.sgin(user);
    Success({
      data: {
        user: {
          email: user.email,
          username: user.username,
          id: user.id,
          avatar: user.avatar
        },
        token: newToken
      }
    });
  }

  async banned() {
    const token = this.ctx.request.body.token;
    const decodedUser = decodeByToken(token, this.app.config.jwt.secret);
    if (typeof decodeByToken === "string") {
      Fail(decodedUser);
    }

    if (decodedUser.level < 10) {
      Fail("无权限操作");
    }

    const v = await new ValidationUserId().validate(this.ctx);
    await this.ctx.service.banned(v.id);
    Success("封禁成功");
  }
}

module.exports = UserController;
