import Router from 'koa-router';

const routeCreator = (router: Router): void => {
  router.get('/v1/healthcheck', async (ctx, next) => {
    ctx.status = 200;
    ctx.body = 'page ok';

    await next();
  });
};

export default routeCreator;
