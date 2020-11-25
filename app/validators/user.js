"use strict";
const { LinValidator, Rule } = require("../../validator/lin-validator");

class ValidationCreateUser extends LinValidator {
  constructor() {
    super();

    this.email = [new Rule("isEmail", "邮箱地址格式不正确")];
    this.password = [
      new Rule("isLength", "密码不能小于8位且不能大于30位", { min: 8, max: 30 })
    ];
    this.username = [
      new Rule("isLength", "昵称长度不能小于2字符且不能大于16字符", {
        min: 2,
        max: 16
      })
    ];
  }

  /** 校验邮箱账号是否已存在
   * 这里不再使用的原因是每次请求都会查询一次数据库且无论email参数是否正确
   * 且无法准确的描述用户已存在（抛出的错误都会归类为参数错误，无法设置状态码）
   */
  // async validateEmail(params, model) {
  //   const email = params.body.email;
  //   let isExistUser = null;
  //   try {
  //     isExistUser = await model.User.findOne({
  //       where: {
  //         email
  //       }
  //     });
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }

  //   if (isExistUser) {
  //     throw Error("该用户已存在！");
  //   }
  // }
}

class ValidationGetToken extends LinValidator {
  constructor() {
    super();

    this.email = [new Rule("isEmail", "邮箱地址格式不正确")];
    this.password = [
      new Rule("isLength", "密码不能小于8位且不能大于30位", { min: 8, max: 30 })
    ];
  }
}

module.exports = {
  ValidationCreateUser,
  ValidationGetToken
};
