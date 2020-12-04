"use strict";

const ParameterException = require("../../exceptions/ParameterException");
const Success = require("../../exceptions/Success");
const bytes = require("humanize-bytes");
const ValidationPagination = require("../validators/pagination");
const {
  ValidationCreatePost,
  ValidationGetDetail
} = require("../validators/post");

const Controller = require("egg").Controller;

class PostController extends Controller {
  async posts() {
    await new ValidationPagination().validate(this.ctx);
    const result = await this.ctx.service.post.get();
    Success(result);
  }

  async detail() {
    const v = await new ValidationGetDetail().validate(this.ctx);
    const post = await this.ctx.service.post.findOne(v.get("path.id"));

    Success({
      data: post.dataValues
    });
  }

  async create() {
    const files = this.ctx.request.files;
    if (files && files.length === 0) {
      ParameterException("文章头图必须上传！");
    }

    const file = files[0];
    if (file.size && bytes(file.size) <= 5120) {
      ParameterException("文章头图必须小于5M");
    }

    const v = await new ValidationCreatePost().validate(this.ctx);

    await this.ctx.service.post.create({
      title: v.get("body.title"),
      content: v.get("body.content"),
      file
    });

    Success("创建成功！");
  }
}

module.exports = PostController;
