import test from 'ava';
import {getIssueType} from '../../../src/utils/issue/type';
import {IssueType, Label} from '../../../src/utils/issue/types';
import issueJson from '../../mock/events/issue-opened.json';

const withLabel = (label: string) => {
  const labels: Label[] = [...issueJson.issue.labels];
  labels[0].name = label;

  return labels;
};

test('when the issue has an Effect Suggestion label, categorize as EFFECT', t => {
  const labels = withLabel('Effect Suggestion');
  const result = getIssueType(labels);

  t.is(result, IssueType.EFFECT);
});

test('when the issue has a Bug label, categorize as BUG', t => {
  const labels = withLabel('bug');
  const result = getIssueType(labels);

  t.is(result, IssueType.BUG);
});

test('when the issue has a Feature Request label, categorize as FEATURE', t => {
  const labels = withLabel('Feature Request');
  const result = getIssueType(labels);

  t.is(result, IssueType.FEATURE);
});

test('when the issue has no known label, categorize as UNKNOWN', t => {
  const labels = withLabel('Blah');
  const result = getIssueType(labels);

  t.is(result, IssueType.UNKNOWN);
});
