"use strict";

const Success = require("../../exceptions/Success");
const {
  ValidationCreateUser,
  ValidationGetToken
} = require("../validators/user");

const Controller = require("egg").Controller;

class UserController extends Controller {
  async create() {
    const v = await new ValidationCreateUser().validate(this.ctx);
    await this.ctx.service.user.create(v.data.body);
    Success("注册成功！");
  }

  async token() {
    const ctx = this.ctx;
    const v = await new ValidationGetToken().validate(ctx);

    const { email, password } = v.data.body;
    const user = await ctx.model.User.verifyEmailPassword(email, password);
    const token = this.app.jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      this.config.jwt.secret,
      {
        expiresIn: "2h"
      }
    );

    Success({
      data: token
    });
  }
}

module.exports = UserController;
