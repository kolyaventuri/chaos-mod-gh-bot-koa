import test from 'ava';
import proxyquire from 'proxyquire';
import {spy, stub} from 'sinon';

import {getMessage as realGetMessage} from '../../../src/utils/github/message';
import {getIssueDetails as realGetDetails} from '../../../src/utils/issue/details';
import realHandler from '../../../src/handlers/v1/issue';

import issueJson from '../../mock/events/issue-opened.json';

const oldEnv = process.env.NODE_ENV;
process.env.GH_ACCESS_TOKEN = 'foobar';

test.before(() => {
  process.env.NODE_ENV = 'production';
  process.env.GH_ACCESS_TOKEN = 'foobar';
});

test.after(() => {
  process.env.NODE_ENV = oldEnv;
});

const getFn = () => {
  const request = stub().resolves({status: 201});
  const getMessage = spy(realGetMessage);
  const getIssueDetails = spy(realGetDetails);
  const {default: handler} = proxyquire.noCallThru()<{default: typeof realHandler}>('../../../src/handlers/v1/issue', {
    '@octokit/request': {request},
    '../../utils/issue/details': {getIssueDetails},
    '../../utils/github/message': {getMessage},
  });

  return {request, handler, getMessage, getIssueDetails};
};

test('calls #getIssueDetails', async t => {
  const {handler, getIssueDetails} = getFn();
  const issue = {...issueJson};
  issue.issue.title = '[Effect Suggestion] Foobar'; // Ensure it is mimicked properly

  await handler(issue);
  t.true(getIssueDetails.calledWith(issue));
});

test('if the issue is fine, does NOT call github', async t => {
  const {request, handler} = getFn();
  const issue = {...issueJson};
  issue.issue.title = '[Effect Suggestion] Foobar'; // Ensure it is mimicked properly

  await handler(issue);
  t.false(request.called);
});

test('if the issue has problems, calls #getMessage', async t => {
  const {handler, getMessage} = getFn();
  const issue = {...issueJson};
  issue.issue.title = '[Effect Suggestion]'; // Missing title

  await handler(issue);

  const details = realGetDetails(issue);
  t.true(getMessage.calledWith(details));
});

test('if the issue has problems, calls github to post the message', async t => {
  const {request, handler} = getFn();
  const issue = {...issueJson};
  issue.issue.title = '[Effect Suggestion]'; // Missing title

  await handler(issue);
  const body = realGetMessage(realGetDetails(issue));

  t.true(request.calledWith(
    'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      headers: {
        authorization: 'token foobar',
      },
      owner: issue.repository.owner.login,
      repo: issue.repository.name,
      issue_number: issue.issue.number,
      body,
    },
  ));
});
