"use strict";

const { get } = require("lodash");
const { INSUFFICIENT_PRIVILEGE_LEVEL } = require("../../config/codes");
const Fail = require("../../exceptions/Fail");

module.exports = options => {
  return async function Auth(ctx, next) {
    const user = get(ctx, "state.user", null);

    let level = 1;
    if (typeof options === "object") {
      level = options.level;
    }
    if (typeof options === "number") {
      level = options;
    }

    if (user && user.level < level) {
      Fail({
        msg: '权限等级不足',
        code: INSUFFICIENT_PRIVILEGE_LEVEL
      });
    }

    await next();
  };
};
