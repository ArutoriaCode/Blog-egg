"use strict";

const { LinValidator, Rule } = require("../../utils/lin-validator");

class ValidationPagination extends LinValidator {
  constructor() {
    super();

    this.limit = [new Rule("isOptional"), new Rule("isInt", "必须是整数", { min: 5, max: 20 })];
    this.current = [new Rule("isOptional"), new Rule("isInt", "必须是整数", { min: 1 })];
  }
}

module.exports = ValidationPagination;
