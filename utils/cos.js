"use strict";
const _Cos = require("cos-nodejs-sdk-v5");

class Cos {
  constructor(options = {}) {
    this.cos = new _Cos(options);
  }

  putObject(options = {}) {
    return new Promise((resolve, reject) => {
      this.cos.putObject(options, function (err, data) {
        if (err && err.Code) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
}

module.exports = Cos;
