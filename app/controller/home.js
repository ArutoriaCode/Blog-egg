"use strict";

const Success = require("../../exceptions/Success");
const {
  ValidationCreatePost,
  ValidationGetPosts
} = require("../validators/post");

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async posts() {
    await new ValidationGetPosts().validate(this.ctx);
    const { count, rows } = await this.ctx.service.post.get();
    Success({
      data: rows,
      attributes: {
        total: count
      }
    });
  }

  async create() {
    const v = await new ValidationCreatePost().validate(this.ctx);
    await this.ctx.service.post.create(v.data.body);
    Success({
      data: v.data.body,
      msg: "创建成功！"
    });
  }
}

module.exports = HomeController;
