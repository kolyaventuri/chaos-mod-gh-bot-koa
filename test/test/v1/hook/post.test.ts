import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import {handleHook as realHandler} from '../../../src/v1/hook/post';
import pingEvent from '../../mock/events/ping.json';
import issueEvent from '../../mock/events/issue-opened.json';

const getFn = () => {
  const issueHandler = stub().resolves();
  const {handleHook} = proxyquire.noCallThru()<{handleHook: typeof realHandler}>('../../../src/v1/hook/post', {
    '../../handlers/v1/issue': issueHandler,
  });

  return {issueHandler, handleHook};
};

test('returns a 200 ok response for a ping event, and does NOT trigger the handler', async t => {
  const {issueHandler, handleHook} = getFn();

  const body = JSON.stringify(pingEvent);
  const result = await handleHook({body} as AWSLambda.APIGatewayEvent);

  t.false(issueHandler.calledWith(body));
  t.deepEqual(result, {
    statusCode: 200,
    body: 'ok',
  });
});

test('returns a 200 ok response for an issue event, and DOES trigger the handler', async t => {
  const {issueHandler, handleHook} = getFn();

  const body = JSON.stringify(issueEvent);
  const result = await handleHook({body} as AWSLambda.APIGatewayEvent);

  t.false(issueHandler.calledWith(body));
  t.deepEqual(result, {
    statusCode: 200,
    body: 'ok',
  });
});

test('returns a 400 bad request response for bad input', async t => {
  const {handleHook} = getFn();

  const body = 'not json';
  const result = await handleHook({body} as AWSLambda.APIGatewayEvent);

  t.deepEqual(result, {
    statusCode: 400,
    body: '400 bad request',
  });
});

test('returns a 500 server error if the issue handler fails', async t => {
  const {issueHandler, handleHook} = getFn();
  issueHandler.rejects();

  const body = JSON.stringify(issueEvent);
  const result = await handleHook({body} as AWSLambda.APIGatewayEvent);

  t.deepEqual(result, {
    statusCode: 500,
    body: '500 server error',
  });
});

