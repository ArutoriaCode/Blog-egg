"use strict";
const HttpException = require("./HttpException");

module.exports = function({ msg, data, code }) {
  if (typeof arguments[0] === "string") {
    msg = arguments[0];
  }

  throw new HttpException({
    msg: msg || "失败",
    code: code || 333,
    status: 200,
    data: data || null
  });
};
