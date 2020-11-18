"use strict";

const Success = require("../../exceptions/Success");

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    Success("成功调用");
  }
}

module.exports = HomeController;
