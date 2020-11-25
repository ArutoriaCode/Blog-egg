"use strict";
const { Service } = require("egg");
const Fail = require("../../exceptions/Fail");

class UserService extends Service {
  async create(user) {
    const isExistUser = await this.ctx.model.User.findOne({
      where: {
        email: user.email
      }
    });

    if (isExistUser) {
      Fail({
        msg: '注册失败，用户已存在！',
        code: this.config.code.EXIST_USER
      });
    }

    try {
      await this.ctx.model.User.create(user);
    } catch (error) {
      console.warn("UserService -> create -> error", error);
      Fail("注册失败，未知原因");
    }
  }
}

module.exports = UserService;
