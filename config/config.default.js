/* eslint valid-jsdoc: "off" */

"use strict";
const exception = require("./exception");
const { sequelize, jwt, tencentCos, multipart } = require("./secure.js");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    bodyParser: {
      formLimit: '5mb'
    },
    onerror: {
      all: exception,
      accepts() {
        return "json";
      }
    },
    security: {
      csrf: {
        enable: false
      }
    },
    i18n: {
      defaultLocale: "zh-CN"
    },
    listen: {
      port: 7001,
      // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      hostname: "127.0.0.1"
    }
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1605596549985_6738";

  // add your middleware config here
  // 注意一定要写驼峰 如：notfound_hanlder.js 这里需要写成notfoundHanlder
  config.middleware = ["notfoundHanlder"];

  config.sequelize = sequelize;
  config.jwt = jwt;
  config.multipart = multipart;

  // add your user config here
  const userConfig = {
    tencentCos
  };

  return {
    ...config,
    ...userConfig
  };
};
