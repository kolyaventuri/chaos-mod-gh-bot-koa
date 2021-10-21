import {Server} from 'http';
import anyTest, {TestInterface} from 'ava';
import proxyquire from 'proxyquire';
import request from 'supertest';
import getPort from 'get-port';
import {stub} from 'sinon';
import {Context, Next} from 'koa';

interface ContextType {
  app: any;
  port: number;
}
const test = anyTest as TestInterface<ContextType>;

const hookHandler = stub().callsFake(
  async (_: Context, next: Next): Promise<void> => {
    await next();
  },
);
test.before(async (t) => {
  const port = await getPort();
  console.log(`Using port ${port} for testing...`);

  process.env.PORT = `${port}`;
  const stubs = {
    './handlers/v1/hook': {
      default: hookHandler,
      '@global': true,
    },
  };
  const app = proxyquire<{default: Server}>('../../../src', stubs).default;

  t.context.app = app;
  t.context.port = port;
});

test.after.always((t) => {
  const {app, port} = t.context;
  console.log('Closing server, freeing port', port);
  app.close();
});

test('a call to /v1/healthcheck returns a 200', async (t) => {
  const result = await request(t.context.app).get('/v1/healthcheck');

  t.is(result.status, 200);
  t.is(result.text, 'page ok');
});

test('a POST to /v1/hook calls the hook handler', async (t) => {
  const data = {mockData: true};
  await request(t.context.app).post('/v1/hook').send(data);

  t.true(hookHandler.called);
  t.deepEqual(hookHandler.lastCall.args[0].request.body, data);
});
