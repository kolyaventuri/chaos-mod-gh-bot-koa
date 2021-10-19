import test from 'ava';

import {getMessage} from '../../../src/utils/github/message';
import {getString} from '../../../src/utils/i18n';
import {
  IssueDetails,
  IssueProblem,
  IssueStatus,
  IssueType,
} from '../../../src/utils/issue/types';

test('generates a message for a singular problem', (t) => {
  const issue: IssueDetails = {
    type: IssueType.EFFECT,
    problems: [IssueProblem.MISSING_TAG],
    status: IssueStatus.BAD,
  };

  const result = getMessage(issue);
  const type = getString('issueType.EFFECT');
  const expected = `${getString('messageBase', {type})}\n- ${getString(
    'issues.MISSING_TAG',
  )}\n\n${getString('messageFooter')}`;

  t.is(result, expected);
});

test('generates a message for a list of problems', (t) => {
  const issue: IssueDetails = {
    type: IssueType.EFFECT,
    problems: [IssueProblem.MISSING_TAG, IssueProblem.CONTENT_CREATOR],
    status: IssueStatus.BAD,
  };

  const result = getMessage(issue);
  const type = getString('issueType.EFFECT');
  const expected = `${getString('messageBaseMultiple', {type})}\n- ${getString(
    'issues.MISSING_TAG',
  )}\n- ${getString('issues.CONTENT_CREATOR')}\n\n${getString(
    'messageFooter',
  )}`;

  t.is(result, expected);
});

test('generates a message for a singular problem, for a different type', (t) => {
  const issue: IssueDetails = {
    type: IssueType.FEATURE,
    problems: [IssueProblem.MISSING_TAG],
    status: IssueStatus.BAD,
  };

  const result = getMessage(issue);
  const type = getString('issueType.FEATURE');
  const expected = `${getString('messageBase', {type})}\n- ${getString(
    'issues.MISSING_TAG',
  )}\n\n${getString('messageFooter')}`;

  t.is(result, expected);
});
