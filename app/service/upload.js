"use strict";
const Cos = require("cos-nodejs-sdk-v5");
const sendToWormhole = require('stream-wormhole');
const Fail = require("../../exceptions/Fail");

const { Service } = require("egg");
const cos = new Cos({
  SecretId: this.config.tencentCos.SecretId,
  SecretKey: this.config.tencentCos.SecretKey
});

class UploadService extends Service {
  async uploadFile(file, path = '/') {
    if (!file.filename) {
      Fail("文件名不存在！");
    }

    const filename = this.ctx.state.user.id + "_" + file.filename;
    let url = "";
    cos.putObject(
      {
        Bucket: this.config.tencentCos.Bucket,
        Region: this.config.tencentCos.Region,
        Key: path + filename,
        Body: file
      },
      async function (err, data) {
        if (err && err.Code) {
          await sendToWormhole(file);
          Fail("上传文件失败！");
        }

        url = data.Location;
      }
    );

    return url;
  }
}

module.exports = UploadService;
