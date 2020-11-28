"use strict";
const { Service } = require("egg");
const { EXIST_USER } = require("../../config/codes");
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
        code: EXIST_USER
      });
    }

    try {
      return await this.ctx.model.User.create(user);
    } catch (error) {
      console.warn("UserService -> create -> error", error);
      Fail("注册失败，未知原因");
    }
  }

  async get(id) {
    const user = await this.ctx.model.User.findOne({
      where: {
        id
      }
    });

    if (!user) {
      Fail('该用户不存在');
    }

    return user;
  }
}

module.exports = UserService;
