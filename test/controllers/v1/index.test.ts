import {Server} from 'http';
import test from 'ava';
import proxyquire from 'proxyquire';
// import request from 'supertest';
import getPort from 'get-port';

let app: Server;
test.before(async () => {
  const port = await getPort();

  process.env.PORT = `${port}`;
  app = proxyquire<{default: Server}>('../../../src', {}).default;
});

test.after.always(() => {
  app.close();
});

test('test', t => {
  t.pass();
});
