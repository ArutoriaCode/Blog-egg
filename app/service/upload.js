"use strict";
const Cos = require("../../utils/cos");
const fs = require("fs");
const Fail = require("../../exceptions/Fail");

const { Service } = require("egg");
class UploadService extends Service {
  async uploadFile(file, path = "/") {
    if (!file.filename) {
      Fail("文件名不存在！");
    }

    const filename = `${new Date().getTime()}_` + encodeURIComponent(file.filename);
    const cos = new Cos({
      SecretId: this.config.tencentCos.SecretId,
      SecretKey: this.config.tencentCos.SecretKey
    });

    return await cos
      .putObject({
        Bucket: this.config.tencentCos.Bucket,
        Region: this.config.tencentCos.Region,
        Key: path + filename,
        Body: fs.createReadStream(file.filepath),
        onProgress(data) {
          console.log("Progress --------------->", data);
        }
      })
      .then(data => {
        if (!data.Location) {
          Fail("上传文件失败！");
        }

        return Promise.resolve(this.config.tencentCos.CDN + path + filename);
      })
      .catch(async err => {
        console.log("UploadError", err);
        Fail("上传文件失败！");
      })
      .finally(async () => {
        fs.unlinkSync(file.filepath);
      });
  }
}

module.exports = UploadService;
