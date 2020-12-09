"use strict";
const Fail = require("../../exceptions/Fail");
const ParameterException = require("../../exceptions/ParameterException");
const Success = require("../../exceptions/Success");
const ValidationPagination = require("../validators/pagination");
const { Controller } = require("egg");
const {
  ValidationCreateComment,
  ValidationCommentByPost
} = require("../validators/comment");
const { COMMENT_TYPE } = require("../../config/keys");

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
    const result = await this.ctx.service.comment.findAllByType(
      COMMENT_TYPE.COMMENT
    );
    Success(result);
  }

  async byPost() {
    const v = await new ValidationCommentByPost().validate(this.ctx);
    const result = await this.ctx.service.comment.findAllByType(
      COMMENT_TYPE.POST,
      { ownerId: v.get("query.id") }
    );
    Success(result);
  }

  async getReply() {
    const commentId = this.ctx.query.commentId;
    if (!commentId) {
      ParameterException("commentId 必须传递");
    }

    const has = await this.ctx.service.comment.get(commentId);
    if (!has) {
      Fail("该条评论不存在或已被删除！");
    }

    const replys = await this.ctx.service.comment.findReplyByCommentId(
      commentId
    );
    Success({
      data: replys
    });
  }
}

module.exports = CommentController;
