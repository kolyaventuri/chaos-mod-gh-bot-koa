import test from 'ava';

import {healthcheck} from '../../../src/v1/healthcheck/get';

test('returns a 200 ok response', async t => {
  const result = await healthcheck({} as AWSLambda.APIGatewayProxyEvent);

  t.deepEqual(result, {
    statusCode: 200,
    body: 'page ok',
  });
});
