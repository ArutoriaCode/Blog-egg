"use strict";
const { Controller } = require("egg");
const Fail = require("../../exceptions/Fail");
const Success = require("../../exceptions/Success");

class UploadController extends Controller {
  async upload() {
    const file = await this.ctx.getFileStream();
    if (!file) {
      Fail("请上传图片！");
    }

    const url = await this.ctx.service.upload.uploadFile(file, this.config.tencentCos.avatarPath);
    Success({
      data: {
        url,
        filename: file.filename
      }
    });
  }

  async uploadFiles() {
    const parts = this.ctx.multipart();

    const result = [];
    let part = null;
    while ((part = await parts()) != null) {
      const url = await this.ctx.service.upload.uploadFile(part);
      result.push({
        url,
        filename: part.filename
      });
    }

    Success({
      data: result
    });
  }
}

module.exports = UploadController;
