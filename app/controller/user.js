"use strict";

const { LOGIN_SUCEESS, REGISTER_SUCCESS } = require("../../config/codes");
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
      }
    );

    const refresh_token = this.app.jwt.sign(
      {
        email: user.email,
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
        ...user,
        ...token
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
        ...user,
        ...token
      },
      code: LOGIN_SUCEESS
    });
  }
}

module.exports = UserController;
