"use strict";

const { LOGIN_SUCEESS, REGISTER_SUCCESS } = require("../../config/codes");
const Fail = require("../../exceptions/Fail");
const Success = require("../../exceptions/Success");
const {
  ValidationCreateUser,
  ValidationGetToken
} = require("../validators/user");

const Controller = require("egg").Controller;

class UserController extends Controller {
  async sgin(user) {
    const access_token = this.app.jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
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
    const user = await this.ctx.service.user.create(v.data.body);

    const token = await this.sgin(user);
    // 注册成功后直接返回token
    Success({
      data: {
        token,
        user: {
          email: user.email,
          username: user.username,
          id: user.id
        },
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

    const token = await this.sgin(user);
    Success({
      data: {
        token,
        user,
      },
      code: LOGIN_SUCEESS
    });
  }

  async refresh() {
    const token = this.ctx.request.body.token;
    if (!token) {
      Fail("无效的token");
    }
    let decoded = null;
    try {
      decoded = this.app.jwt.verify(token, this.app.config.jwt.secret);
    } catch (error) {
      throw error;
    }

    if (decoded.name !== 'refresh_token' || !decoded.id) {
      Fail('无效的刷新令牌');
    }

    const user = await this.ctx.service.user.get(decoded.id);
    const newToken = await this.sgin(user);
    Success({
      data: {
        user: {
          email: user.email,
          username: user.username,
          id: user.id
        },
        token: newToken
      }
    });
  }
}

module.exports = UserController;
