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
        msg: "注册失败，用户已存在！",
        code: EXIST_USER
      });
    }

    const url = await this.ctx.service.upload.uploadFile(
      user.avatar,
      this.config.tencentCos.avatarPath
    );

    user = { ...user, avatar: url };
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
      Fail("该用户不存在");
    }

    return user;
  }

  /**
   * 封禁某个用户
   * @param {number} id 要封禁的用户id
   * @param {object} adminUser 操作员
   */
  async banned(id, adminUser) {
    const user = await this.ctx.service.user.get(id);
    if (!user) {
      Fail("该用户不存在");
    }

    // 无法封禁同级或大于操作员等级权限的用户
    if (user.level >= adminUser.level) {
      Fail("无权限操作");
    }

    await user.update({ level: 0 });
  }
}

module.exports = UserService;
