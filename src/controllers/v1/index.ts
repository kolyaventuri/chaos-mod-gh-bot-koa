import Router from 'koa-router';

const router = new Router();

router.get('/healthcheck', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'page ok';

  await next();
});

export default router;
