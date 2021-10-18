import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';

import {APP_PORT} from './constants';
import {router} from './router';
import v1Routes from './routes/v1';

const app = new Koa();

app.use(json());
app.use(logger());

v1Routes(router);

app.use(router.routes()).use(router.allowedMethods());

app.listen(APP_PORT, () => {
  console.log('Server started');
});
