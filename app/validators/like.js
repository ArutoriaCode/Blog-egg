"use strict";
const { LinValidator, Rule } = require("../../validator/lin-validator");

class ValidationLike extends LinValidator {
  constructor() {
    super();

    this.id = [new Rule("isInt")];
    this.type = [new Rule("isInt")];
  }
}

module.exports = {
  ValidationLike
};
