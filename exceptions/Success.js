"use strict";
const HttpException = require("./HttpException");

module.exports = function({ msg, data, code }) {
  if (typeof arguments[0] === "string") {
    msg = arguments[0];
  }
  throw new HttpException({
    msg: msg || "成功",
    code: code || 666,
    status: 200,
    data
  });
};
