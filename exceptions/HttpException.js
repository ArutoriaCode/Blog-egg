'use strict';

class HttpException extends Error {
  /**
   * @param {*} attributes 附加参数，最终会合并到响应对象中的body，与msg、code同级
   * {
   *  data: {...},
   *  code: 22,
   *  msg: "",
   *  ...attributes
   * }
   */
  constructor({ msg, code, status, data, attributes }) {
    super();
    this.msg = msg || '服务器异常';
    this.code = code;
    this.status = status || 500;
    this.data = data || {};
    this.attributes = attributes;
    this.name = 'HttpException';
  }
}

module.exports = HttpException;
