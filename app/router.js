"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const v1 = router.namespace('/api/v1');
  v1.get("/posts", controller.home.posts);
  v1.get("/posts/:id", controller.home.detail);
  v1.post("/posts/create", app.jwt, controller.home.create);
  v1.post("/user/register", controller.user.create);
  v1.post("/user/token", controller.user.token);
};
