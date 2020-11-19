"use strict";
const { Service } = require("egg");
const Fail = require("../../exceptions/Fail");

class UserService extends Service {
  async create(user) {
    try {
      await this.ctx.model.User.create(user);
    } catch (error) {
      console.warn("UserService -> create -> error", error);
      Fail("注册失败！");
    }
  }
}

module.exports = UserService;
