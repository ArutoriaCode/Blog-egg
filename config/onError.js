"use strict";

const HttpException = require("../exceptions/HttpException");

module.exports = (err, ctx) => {
  const path = `${ctx.request.method} ${ctx.request.url}`;
  if (err instanceof HttpException) {
    ctx.body = JSON.stringify({
      msg: err.msg,
      code: err.code,
      request: path
    });

    if (err.data) {
      ctx.body.data = err.data;
    }

    ctx.status = err.status;
  } else if (err instanceof Error) {
    ctx.body = JSON.stringify({
      msg: "服务器错误",
      code: 22,
      request: path
    });
    ctx.status = 500;
  } else {
    ctx.body = JSON.stringify({
      msg: "未知异常",
      code: 33,
      request: path
    });
    ctx.status = 500;
  }
};
