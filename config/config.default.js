/* eslint valid-jsdoc: "off" */

"use strict";
const exception = require("./exception");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    onerror: {
      all: exception
    },
    security: {
      csrf: {
        enable: false
      }
    },
    i18n: {
      defaultLocale: 'zh-CN'
    }
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1605596549985_6738";

  // add your middleware config here
  // 注意一定要写驼峰 如：notfound_hanlder.js 这里需要写成notfoundHanlder
  config.middleware = ['notfoundHanlder'];

  config.sequelize = {
    password: "20082009",
    database: "blog",
    user: "root"
  };

  exports.jwt = {
    // token加密密匙
    secret: "jwt123456"
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
