"use strict";
const { Service } = require("egg");
const { LIKE_TYPE } = require("../../config/keys");
const Fail = require("../../exceptions/Fail");

class LikeService extends Service {
  async _findByType(type, query) {
    const models = {
      [LIKE_TYPE.POST]: this.app.model.Post,
      [LIKE_TYPE.COMMENT]: this.app.model.Comment
    };

    return await models[type].findOne(query);
  }

  async _isLiked(id, type) {
    return await this.app.model.findOne({
      where: {
        id,
        type,
        uid: this.ctx.stale.user.id
      }
    });
  }

  async all() {
    // 获取当用户的所有点赞信息
    const likes = await this.app.model.Like.findAll({
      where: {
        uid: this.ctx.state.user.id
      }
    });

    // 前端只需要将当前post\comment的类型和id拼接然后判断该数组即可
    return likes.map(like => like.type + '-' + like.ownerId);
  }

  async like({ id, type, uid }) {
    const isLiked = await this._isLiked();
    if (isLiked) {
      Fail.error('你已点过赞');
    }

    const model = await this._findByType(type, {
      where: {
        id
      }
    });

    if (!model) {
      // 文章、评论不存在，点赞无效
      Fail("点赞失败，数据不存在！");
    }

    return this.app.model.transaction(async t => {
      await this.app.model.Like.create(
        {
          ownerId: id,
          type,
          uid
        },
        {
          transaction: t
        }
      );

      await model.increment("likeNum", {
        by: 1,
        transaction: t
      });
    });
  }

  async cancel({ id, type, uid }) {
    const isLiked = await this._isLiked();
    if (!isLiked) {
      Fail('取消点赞失败！');
    }

    const model = await this._findByType(type, {
      where: {
        ownerId: id,
        uid
      }
    });

    if (!model) {
      // 文章、评论不存在，点赞无效
      Fail("取消点赞失败！");
    }

    return this.app.model.transaction(async t => {
      await this.app.model.Like.destroy(
        {
          ownerId: id,
          type,
          uid
        },
        {
          transaction: t
        }
      );

      await model.decrement("likeNum", {
        by: 1,
        transaction: t
      });
    });
  }
}

module.exports = LikeService;
