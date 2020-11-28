"use strict";
const { Service } = require("egg");
const { toSafeInteger } = require("lodash");
const { COMMENT_TYPE } = require("../../config/keys");
const { Op } = require("sequelize");
const Fail = require("../../exceptions/Fail");

class CommentService extends Service {
  async get(id) {
    const comment = await this.ctx.model.Comment.findOne({ where: { id } });
    if (!comment) {
      Fail("没有找到该条评论");
    }

    return comment;
  }

  async findAllByGuestBook() {
    const ctx = this.ctx;
    const offset = toSafeInteger(ctx.query.cuurent) || 0;
    const limit = toSafeInteger(ctx.query.pageSize) || 8;
    const query = {
      offset,
      limit,
      where: {
        type: COMMENT_TYPE.COMMENT,
        commentId: {
          [Op.is]: null
        },
        toId: {
          [Op.is]: null
        }
      }
    };

    const { count, rows } = await this.ctx.model.Comment.findAndCountAll(query);
    return {
      total: count,
      data: rows,
      current: offset,
      pageSize: limit
    };
  }

  async create({ content, ownerId, type, commentId, toId }) {
    const createComment = {
      content,
      type,
      fromId: this.ctx.state.user.id,
      fromName: this.ctx.state.user.username
    };

    let PostModel = null;
    let CommentModel = null;

    // 在留言页面进行留言、非回复其他评论的，直接创建
    if (type === COMMENT_TYPE.COMMENT && !ownerId && !commentId) {
      return await this.app.model.Comment.create(createComment);
    }

    // 如果该评论是属于文章下的，那么还需要将其的评论数+1
    if (type === COMMENT_TYPE.POST) {
      PostModel = await this.app.model.Post.findOne({ where: { id: ownerId } });
      createComment.ownerId = ownerId;
    }

    // 如果是在某父评论下回复另外一条回复，那么就需要父评论的id和另外一条回复的用户id
    if (commentId && toId) {
      // 找出父级评论，后续需要将其的回复数加1
      CommentModel = await this.get(commentId);
      createComment.commentId = commentId;

      // 先查找被回复的用户是否存在
      const toUser = await this.ctx.service.user.get(toId);
      createComment.toId = toUser.id;
      createComment.toName = toUser.username;
    }

    return await this.app.model.transaction(async t => {
      await this.app.model.Comment.create(createComment, {
        transaction: t
      });

      if (PostModel) {
        await PostModel.increment("commentNum", {
          by: 1,
          transaction: t
        });
      }

      if (CommentModel) {
        await CommentModel.increment("commentReplayNum", {
          by: 1,
          transaction: t
        });
      }
    });
  }
}

module.exports = CommentService;
