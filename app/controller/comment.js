"use strict";
const { Controller } = require("egg");
const Success = require("../../exceptions/Success");
const { ValidationCreateComment } = require("../validators/comment");
const ValidationPagination = require("../validators/pagination");

class CommentController extends Controller {
  async create() {
    const v = await new ValidationCreateComment().validate(this.ctx);
    await this.ctx.service.comment.create({
      content: v.get("body.content"),
      ownerId: v.get("body.ownerId"),
      type: v.get("body.type"),
      commentId: v.get("body.commentId"),
      toId: v.get("body.toId")
    });
    Success("发表成功！");
  }

  async guestbook() {
    await new ValidationPagination().validate(this.ctx);
    const result = await this.ctx.service.comment.findAllByGuestBook();
    Success(result);
  }
}

module.exports = CommentController;
