"use strict";

const { isEmpty } = require("lodash");
const HttpException = require("../exceptions/HttpException");

function HandlerHttpException(err) {
  const body = {
    msg: err.msg,
    code: err.code
  };

  if (!isEmpty(err.data)) {
    body.data = err.data;
  }

  return body;
}

module.exports = (err, ctx) => {
  const path = `${ctx.request.method} ${ctx.request.url}`;
  console.error("\nError:", err, err.status, "\n");

  let body = {};
  if (err instanceof HttpException) {
    body = HandlerHttpException(err);
    body.request = path;
  } else if (err.status === 403) {
    body = {
      msg: "禁止访问",
      code: 1403,
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
