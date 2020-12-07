'use strict';

class HttpException extends Error {
  /**
   * @param {*} args 附加参数，最终会合并到响应对象中的body，与msg、code同级
   * {
   *  data: {...},
   *  code: 22,
   *  msg: "",
   *  ...args
   * }
   */
  constructor({ msg, code, status, data, args }) {
    super();
    this.msg = msg || '服务器异常';
    this.code = code;
    this.status = status || 500;
    this.data = data || null;
    this.args = args;
    this.name = 'HttpException';
  }
}

module.exports = HttpException;
