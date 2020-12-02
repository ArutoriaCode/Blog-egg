'use strict';
exports.sequelize = {
  password: "20082009",
  database: "blog",
  user: "root"
};

exports.jwt = {
  // token加密密匙
  secret: "jwt123456"
};

exports.tencentCos = {
  // 腾讯云cos密匙，请自行购买或使用别的方式存储文件
  SecretId: 'SecretId',
  SecretKey: 'SecretId',
};
