"use strict";
const { Service } = require("egg");
const { toSafeInteger } = require("lodash");
const Fail = require("../../exceptions/Fail");

class PostService extends Service {
  async get() {
    const ctx = this.ctx;
    const offset = toSafeInteger(ctx.query.cuurent) || 0
    const limit = toSafeInteger(ctx.query.pageSize) || 8
    const query = {
      offset,
      limit,
      attributes: {
        exclude: ['content']
      }
    };

    const { count, rows } = await this.ctx.model.Post.findAndCountAll(query);
    return {
      total: count,
      data: rows,
      current: offset,
      pageSize: limit
    };
  }

  async findOne(id) {
    const post = await this.ctx.model.Post.findOne({
      where: {
        id
      }
    });

    if (post === null) {
      Fail('该文章不存在！');
    }

    return post;
  }

  async create(post) {
    try {
      await this.ctx.model.Post.create(post);
    } catch (error) {
      Fail("创建文章失败！");
    }
  }
}

module.exports = PostService;
