import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

import {APP_PORT} from './constants';
import controllers from './controllers';

const app = new Koa();

app.use(json());
app.use(bodyParser());
app.use(logger());

app.use(controllers.routes()).use(controllers.allowedMethods());

const server = app.listen(APP_PORT, () => {
  console.log('Server started');
});

export default server;
