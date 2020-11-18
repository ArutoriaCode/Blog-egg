"use strict";

const HttpException = require("./HttpException");

module.exports = function (errors) {
  throw new HttpException({
    msg: errors,
    code: 1422,
    status: 422
  });
};
