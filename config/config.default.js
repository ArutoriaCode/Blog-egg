/* eslint valid-jsdoc: "off" */

"use strict";
const onError = require("./onError");
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
      all: onError
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

  config.sequelize = {
    password: "20082009",
    database: "blog",
    user: "root"
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
