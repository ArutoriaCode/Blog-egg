"use strict";
const Fail = require("../../exceptions/Fail");
const domino = require("domino");
const { Controller } = require("egg");
const { validator } = require("../../validator/util");
const { getMetadata } = require("page-metadata-parser");

class LinkController extends Controller {
  async index() {
    const url = this.ctx.query.url;
    if (!validator.isUrl(url)) {
      Fail("错误的链接");
    }

    const result = await this.app.curl(this.ctx.query.url, {
      method: 'get',
      timeout: 30000,
      dataType: 'text'
    });

    const document = domino.createWindow(result.data).document;
    const meta = getMetadata(document, url);
    this.ctx.body = {
      success: 1,
      meta: {
        ...meta,
        image: {
          url: meta.image || meta.icon || ""
        }
      }
    };
  }
}

module.exports = LinkController;
