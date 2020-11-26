"use strict";

module.exports = {
  /** 操作失败 */
  FAIL: 333,
  /** 操作成功 */
  SUCCESS: 666,
  /** 参数错误 */
  PARAMS_ERROR: 1422,
  /** 服务器错误 */
  SERVER_ERROR: 1500,
  /** 登录成功 */
  LOGIN_SUCEESS: 6000,
  /** 该用户已存在 */
  EXIST_USER: 6001,
  /** 注册成功并会返回token */
  REGISTER_SUCCESS: 6100,
  /** 令牌无效或过期 */
  INVALID_OR_EXPIRED_TOKEN: 7000,
  /** 无效的令牌 */
  INVALID_TOKEN: 7100,
  /** 过期的令牌 */
  EXPIRED_TOKEN: 7101,
  /** 吊销的令牌 */
  REVOKED_TOKEN: 7102,
  /** 请求头令牌方案不正确 */
  CREDENTIALS_BAD_SCHEME: 7300,
  /** 请求头令牌方案的格式不正确 */
  CREDENTAILS_BAD_FORMAT: 7301,
  /** 请求头没有携带令牌信息 */
  CREDENTIALS_REQUIRED_TOKEN: 7302
};
