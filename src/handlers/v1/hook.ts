import {Next} from 'koa';
import {RouterContext} from 'koa-router';

import {Issue} from '../../utils/issue/types';
import issueHandler from './issue';

const hook = async (ctx: RouterContext, next: Next): Promise<void> => {
  const {body} = ctx.request as Record<string, any> & {body: Issue};

  if (typeof body !== 'object' || Object.keys(body).length === 0) {
    ctx.status = 400;
    ctx.body = '400 bad request';

    await next();
    return;
  }

  if (body.action === 'opened' && body.issue) {
    try {
      await issueHandler(body);
    } catch (error: unknown) {
      console.error(error);

      ctx.status = 500;
      ctx.body = '500 server error';

      await next();
      return;
    }
  }

  ctx.status = 200;
  ctx.body = 'ok';

  await next();
};

export default hook;
