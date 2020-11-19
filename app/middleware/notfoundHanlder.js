'use strict';
module.exports = () => {
  return async function NotfoundHanlder(ctx, next) {
    await next();
    const path = `${ctx.request.method} ${ctx.request.url}`;
    if (ctx.status === 404 && !ctx.body) {
      ctx.body = { msg: "Not Found", code: 1404, request: path };
    }
  };
};
