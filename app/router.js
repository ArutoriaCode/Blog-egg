"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const v1 = router.namespace('/api/v1');
  v1.get("/", controller.home.index);
  v1.post("/createPost", controller.home.create);
};
