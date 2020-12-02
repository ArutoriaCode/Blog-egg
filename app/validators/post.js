"use strict";
const { LinValidator, Rule } = require("../../utils/lin-validator");

class ValidationCreatePost extends LinValidator {
  constructor() {
    super();

    this.title = [
      new Rule("isLength", "文章标题必须大于1以及小于60字符", {
        min: 1,
        max: 60
      })
    ];
    this.content = [new Rule("isLength", "文章内容不能为空", { min: 1 })];
  }
}

class ValidationGetDetail extends LinValidator {
  constructor() {
    super();

    this.id = [
      new Rule("isInt", "必须是整数")
    ];
  }
}

module.exports = {
  ValidationCreatePost,
  ValidationGetDetail
};
