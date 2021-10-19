import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import pingEvent from '../../mock/events/ping.json';
import issueEvent from '../../mock/events/issue-opened.json';

const next = async () => Promise.resolve();
const getFn = () => {
  const issueHandler = stub().resolves();
  const handleHook = proxyquire.noCallThru()('../../../src/handlers/v1/hook', {
    '../../handlers/v1/issue': issueHandler,
  }).default;

  return {issueHandler, handleHook};
};

test('returns a 200 ok response for a ping event, and does NOT trigger the handler', async (t) => {
  const {issueHandler, handleHook} = getFn();

  const context: Record<string, any> = {request: {body: pingEvent}};
  await handleHook(context, next);
  delete context.request;

  t.false(issueHandler.calledWith(pingEvent));
  t.deepEqual(context, {
    status: 200,
    body: 'ok',
  });
});

test('returns a 200 ok response for an issue event, and DOES trigger the handler', async (t) => {
  const {issueHandler, handleHook} = getFn();

  const context: Record<string, any> = {request: {body: issueEvent}};
  await handleHook(context, next);
  delete context.request;

  t.true(issueHandler.calledWith(issueEvent));
  t.deepEqual(context, {
    status: 200,
    body: 'ok',
  });
});

test('returns a 400 bad request response for bad input', async (t) => {
  const {handleHook} = getFn();

  const body = 'not json';
  const context: Record<string, any> = {request: {body}};
  await handleHook(context, next);
  delete context.request;

  t.deepEqual(context, {
    status: 400,
    body: '400 bad request',
  });
});

test('returns a 500 server error if the issue handler fails', async (t) => {
  const {issueHandler, handleHook} = getFn();
  issueHandler.rejects();

  const context: Record<string, any> = {request: {body: issueEvent}};
  await handleHook(context, next);
  delete context.request;

  t.deepEqual(context, {
    status: 500,
    body: '500 server error',
  });
});
