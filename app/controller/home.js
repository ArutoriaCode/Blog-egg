"use strict";

const Success = require("../../exceptions/Success");
const ValidationPagination = require("../validators/pagination");
const {
  ValidationCreatePost,
  ValidationGetDetail
} = require("../validators/post");

const Controller = require("egg").Controller;

class HomeController extends Controller {
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
    const v = await new ValidationCreatePost().validate(this.ctx);
    await this.ctx.service.post.create({
      title: v.get("body.title"),
      content: v.get("body.content"),
      img: v.get("body.img"),
      user_id: this.ctx.state.user.id
    });

    Success("创建成功！");
  }
}

module.exports = HomeController;
