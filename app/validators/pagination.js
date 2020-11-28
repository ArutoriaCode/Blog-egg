"use strict";

const { LinValidator, Rule } = require("../../validator/lin-validator");

class ValidationPagination extends LinValidator {
  constructor() {
    super();

    this.pageSize = [new Rule("isOptional"), new Rule("isInt", "必须是整数")];
    this.current = [new Rule("isOptional"), new Rule("isInt", "必须是整数")];
  }
}

module.exports = ValidationPagination;
