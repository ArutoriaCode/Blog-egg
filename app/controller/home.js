"use strict";

const Success = require("../../exceptions/Success");
const { ValidationCreatePost } = require("../validate/post");

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    Success("也许这就是人生吧？");
  }

  async create() {
    const v = await new ValidationCreatePost().validate(this.ctx);
    Success({
      data: v.data.body,
      msg: "创建成功！"
    });
  }
}

module.exports = HomeController;
