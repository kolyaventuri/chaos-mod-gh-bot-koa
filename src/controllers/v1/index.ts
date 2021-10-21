import Router from 'koa-router';

import hookHandler from '../../handlers/v1/hook';

const router = new Router();

router.get('/healthcheck', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'page ok';

  await next();
});

router.post('/hook', hookHandler);

export default router;
