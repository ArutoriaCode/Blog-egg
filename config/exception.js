"use strict";

const HttpException = require("../exceptions/HttpException");
const UnauthorizedError = require("koa-jwt2/lib/errors/UnauthorizedError");

function HttpExceptionHandler(err) {
  const body = {
    msg: err.msg,
    code: err.code
  };

  if (err.data) {
    body.data = err.data;
  }

  if (err.args instanceof Object) {
    Object.assign(body, err.args);
  }

  return body;
}

module.exports = (err, ctx) => {
  console.warn("\n[Error]\t", err);
  const path = `${ctx.request.method} ${ctx.request.url}`;

  let body = {};
  if (err instanceof HttpException) {
    body = HttpExceptionHandler(err);
    body.request = path;
  } else if (err instanceof UnauthorizedError) {
    body = {
      msg: "token无效或未授权",
      code: 1401,
      request: path
    };
  } else {
    body = {
      msg: "服务器错误",
      code: 1500,
      request: path
    };
  }

  try {
    ctx.body = JSON.stringify(body);
  } catch (error) {
    ctx.body = {
      msg: "服务器错误",
      code: 1500,
      request: path
    };
  }

  ctx.status = err.status;
  ctx.set("Content-Type", "application/json");
};
