"use strict";

const HttpException = require("./HttpException");
const UnauthorizedError = require("koa-jwt2/lib/errors/UnauthorizedError");
const TokenExpiredError = require("jsonwebtoken/lib/TokenExpiredError");
const {
  INVALID_OR_EXPIRED_TOKEN,
  INVALID_TOKEN,
  CREDENTIALS_REQUIRED_TOKEN,
  CREDENTAILS_BAD_SCHEME,
  CREDENTAILS_BAD_FORMAT,
  REVOKED_TOKEN,
  EXPIRED_TOKEN
} = require("../config/codes.js");
const { isEmpty } = require("lodash");

function HttpExceptionHandler(err) {
  const body = {
    msg: err.msg,
    code: err.code
  };

  if (!isEmpty(err.data)) {
    body.data = err.data;
  }

  if (err.attributes instanceof Object && !isEmpty(err.attributes)) {
    Object.assign(body, err.attributes);
  }

  return body;
}

function UnauthorizedErrorHandler(err) {
  console.log("UnauthorizedErrorHandler:", err);
  const body = {};

  switch (err.code) {
    case "invalid_token":
      body.msg = "无效的令牌";
      body.code = INVALID_TOKEN;
      break;
    case "credentials_required":
      body.msg = "无权限，请携带令牌";
      body.code = CREDENTIALS_REQUIRED_TOKEN;
      break;
    case "credentials_bad_scheme":
      body.msg =
        "请求头携带令牌的方案不正确（Format is Authorization: Bearer [token]）";
      body.code = CREDENTAILS_BAD_SCHEME;
      break;
    case "credentials_bad_format":
      body.msg =
        "请求头携带令牌的方案中的格式不正确（Format is Authorization: Bearer [token]）";
      body.code = CREDENTAILS_BAD_FORMAT;
      break;
    case "revoked_token":
      body.msg = "吊销的令牌";
      body.code = REVOKED_TOKEN;
      break;
    default:
      body.msg = "令牌无效或过期";
      body.code = INVALID_OR_EXPIRED_TOKEN;
  }

  return body;
}

function TokenExpiredErrorHandler(err) {
  console.log("TokenExpiredErrorHandler:", err);
  return {
    msg: "令牌已过期",
    code: EXPIRED_TOKEN
  };
}

module.exports = {
  [HttpException.name]: HttpExceptionHandler,
  [UnauthorizedError.name]: UnauthorizedErrorHandler,
  [TokenExpiredError.name]: TokenExpiredErrorHandler
};
