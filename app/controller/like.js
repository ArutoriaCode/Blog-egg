"use strict";
const Success = require("../../exceptions/Success");
const { ValidationLike } = require("../validators/like");

const Controller = require("egg").Controller;

class LikeController extends Controller {
  async all() {
    const likes = await this.ctx.service.like.all();
    Success({
      data: likes
    });
  }

  async index() {
    const v = await new ValidationLike().validate(this.ctx);
    await this.ctx.service.like.like({
      id: v.get("body.id"),
      type: v.get("body.type"),
      uid: this.ctx.state.user.id
    });

    Success('点赞成功');
  }

  async cancel() {
    const v = await new ValidationLike().validate(this.ctx);

    await this.ctx.service.like.cancel({
      id: v.get("body.id"),
      type: v.get("body.type"),
      uid: this.ctx.state.user.id
    });

    Success('取消点赞成功');
  }
}

module.exports = LikeController;
