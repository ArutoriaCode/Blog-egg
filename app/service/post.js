"use strict";
const { Service } = require("egg");
const { toSafeInteger } = require("lodash");
const Fail = require("../../exceptions/Fail");

class PostService extends Service {
  async get() {
    const ctx = this.ctx;
    const limit = toSafeInteger(ctx.query.limit) || 5;
    const currentPage = toSafeInteger(ctx.query.current) || 1;
    const offset = (currentPage - 1) <= 0 ? 0 : (currentPage - 1) * limit;
    const query = {
      offset,
      limit,
      attributes: {
        exclude: ["content"]
      }
    };

    const { count, rows } = await this.ctx.model.Post.findAndCountAll(query);
    return {
      data: rows,
      args: {
        total: count,
        current: currentPage,
        limit,
        pageSize: Math.ceil(count / limit)
      }
    };
  }

  async findOne(id) {
    const post = await this.ctx.model.Post.findOne({
      where: {
        id
      },
      include: this.ctx.model.User
    });

    if (post === null) {
      Fail("该文章不存在！");
    }

    return post;
  }

  async create({ file, title, content }) {
    const url = await this.ctx.service.upload.uploadFile(
      file,
      this.config.tencentCos.postsPath
    );

    try {
      const shortContent = this._sliceContent(content);
      await this.ctx.model.Post.create({
        img: url,
        title,
        content,
        shortContent,
        user_id: this.ctx.state.user.id
      });
    } catch (error) {
      console.error("Post CreateError", error);
      Fail("创建文章失败！");
    }
  }

  _sliceContent(content) {
    if (typeof content === 'string') {
      content = JSON.parse(content);
    }

    const paragraph = content.blocks.find(b => b.type === "paragraph");
    if (!paragraph) {
      return '';
    }

    const text = paragraph.data.text;
    if (text.length > 1) {
      return text.slice(0, 198);
    }
    return "";
  }
}

module.exports = PostService;
