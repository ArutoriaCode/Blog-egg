"use strict";
const { COMMENT_TYPE } = require("../../config/keys");
const { LinValidator, Rule } = require("../../validator/lin-validator");

class ValidationCreateComment extends LinValidator {
  constructor() {
    super();

    this.content = [
      new Rule("isLength", "评论的内容长度不能少于1字符且不能大于360个字符", {
        min: 1,
        max: 360
      })
    ];
    this.type = [new Rule("isInt", "评论所属类型不能为空")];
    this.ownerId = [new Rule("isOptional"), new Rule("isInt", "ownerId must be an Integer")];
    this.commentId = [new Rule("isOptional"), new Rule('isInt', "commentId must be an Integer")];
    this.toId = [new Rule("isOptional"), new Rule('isInt', "toId must be an Integer")];
  }

  async validateType(params) {
    const type = params.body.type;
    const types = Object.values(COMMENT_TYPE);
    if (!types.includes(type)) {
      throw Error("评论所属类型错误！");
    }
  }
}

module.exports = {
  ValidationCreateComment
};
