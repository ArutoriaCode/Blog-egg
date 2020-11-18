'use strict';

class HttpException extends Error {
  constructor({ msg, code, status, data }) {
    super();
    this.msg = msg || '服务器异常';
    this.code = code;
    this.status = status || 500;
    this.data = data || {};
  }
}

module.exports = HttpException;
