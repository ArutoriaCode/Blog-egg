"use strict";
const { Service } = require("egg");
const { toSafeInteger } = require("lodash");
const Fail = require("../../exceptions/Fail");

class PostService extends Service {
  async get() {
    const ctx = this.ctx;
    const query = {
      offset: toSafeInteger(ctx.query.cuurent) || 0,
      limit: toSafeInteger(ctx.query.pageSize) || 8,
      attributes: {
        exclude: ['content']
      }
    };

    return await this.ctx.model.Post.findAndCountAll(query);
  }

  async create(post) {
    try {
      await this.ctx.model.Post.create(post);
    } catch (error) {
      console.warn("PostService -> create -> error", error);
      Fail("创建文章失败！");
    }
  }
}

module.exports = PostService;
