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
  SecretId: 'xxx',
  SecretKey: 'xxx',
  Bucket: 'xxx',
  Region: 'ap-guangzhou',
  avatarPath: 'avatar/',
  CDN: 'https://arutoria-1256549464.file.myqcloud.com/'
};

// 上传文件的安全限制：https://eggjs.github.io/zh/guide/upload.html#%E5%AE%89%E5%85%A8%E9%99%90%E5%88%B6
exports.multipart = {
  mode: 'file',
  // 单个文件大小
  fileSize: '8mb',
  // 允许上传的最大文件数
  files: 8,
  // 覆盖原有（https://github.com/eggjs/egg-multipart/blob/master/app.js#L23）的上传的文件白名单
  whitelist: ['.jpg', '.jpeg', '.png']
};
