"use strict";
const ExceptionHandlers = require("../exceptions/ExceptionHandlers.js");
const { SERVER_ERROR } = require("./codes");

module.exports = (err, ctx) => {
  ctx.set("Content-Type", "application/json");
  const path = `${ctx.request.method} ${ctx.request.url}`;

  let body = {};
  if (ExceptionHandlers[err.name]) {
    body = ExceptionHandlers[err.name](err);
    body.request = path;
  } else {
    body = {
      msg: "服务器错误",
      code: SERVER_ERROR,
      request: path
    };
  }

  try {
    ctx.body = body;
  } catch (error) {
    ctx.body = {
      msg: "服务器错误",
      code: SERVER_ERROR,
      request: path
    };
  }

  ctx.status = err.status;
};
