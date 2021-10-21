import test from 'ava';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';
import {getIssueDetails as realIssueDetails} from '../../../src/utils/issue/details';
import {Issue, IssueStatus, IssueType} from '../../../src/utils/issue/types';

const getIssueProblems = stub().returns([]);
const {getIssueDetails} = proxyquire.noCallThru()<{
  getIssueDetails: typeof realIssueDetails;
}>('../../../src/utils/issue/details', {
  './problems': {getIssueProblems},
});

test('calls #getIssueProblems', (t) => {
  getIssueDetails({
    issue: {title: 'abc', body: '123', labels: []},
  } as unknown as Issue);

  t.true(
    getIssueProblems.calledWith({
      title: 'abc',
      body: '123',
      type: IssueType.UNKNOWN,
    }),
  );
});

test('returns the problems, and the status', (t) => {
  const result = getIssueDetails({
    issue: {title: 'abc', body: '123', labels: []},
  } as unknown as Issue);

  t.deepEqual(result, {
    type: IssueType.UNKNOWN,
    problems: [],
    status: IssueStatus.GOOD,
  });
});
