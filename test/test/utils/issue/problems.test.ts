import test from 'ava';

import {getIssueProblems} from '../../../src/utils/issue/problems';
import {IssueProblem, IssueType} from '../../../src/utils/issue/types';

const creators = [
  'darkviperau',
  'dark viper au',
  'dark viperau',
  'darkviper au',
  'matt',
  'matto',
  'callmekevin',
  'callme kevin',
  'call mekevin',
  'call me kevin',
];

const overUsedEffects = ['cougar', 'cougars'];

test('with a good title, body, and type, returns empty array', t => {
  const result = getIssueProblems({
    title: '[Effect Suggestion] Test Effect',
    body: 'some body without overused',
    type: IssueType.EFFECT,
  });
  t.deepEqual(result, []);
});

test('if the effect title was not changed, adds DEFAULT_TITLE', t => {
  const result = getIssueProblems({
    title: '[Effect Suggestion] My Super Cool Effect Idea',
    body: 'body',
    type: IssueType.EFFECT,
  });
  t.deepEqual(result, [IssueProblem.DEFAULT_TITLE]);
});

test('if the feature title was not changed, adds DEFAULT_TITLE', t => {
  const result = getIssueProblems({
    title: '[Feature Suggestion] My Neat Feature',
    body: 'body',
    type: IssueType.FEATURE,
  });
  t.deepEqual(result, [IssueProblem.DEFAULT_TITLE]);
});

test('if the bug title was not changed, adds DEFAULT_TITLE', t => {
  const result = getIssueProblems({
    title: '[Bug] My Nasty Bug',
    body: 'body',
    type: IssueType.BUG,
  });
  t.deepEqual(result, [IssueProblem.DEFAULT_TITLE]);
});

test('if the effect references something in the overused effects list, add OVERUSED_EFFECT to the status', t => {
  for (const item of overUsedEffects) {
    const result = getIssueProblems({
      title: '[Effect Suggestion] Some name',
      body: `an effect with ${item}`,
      type: IssueType.EFFECT,
    });
    t.deepEqual(result, [IssueProblem.OVERUSED_EFFECT], `Failed for "${item}". Did not return OVERUSED_EFFECT.`);
  }
});

test('if the effect is missing the [Type] tag, adds MISSING_TAG', t => {
  const result = getIssueProblems({
    title: 'Some idea',
    body: 'Some body',
    type: IssueType.EFFECT,
  });

  t.deepEqual(result, [IssueProblem.MISSING_TAG]);
});

test('if the effect has the wrong tag, adds BAD_TAG', t => {
  const result = getIssueProblems({
    title: '[Effect Suggestion] Some effect',
    body: 'Some body',
    type: IssueType.FEATURE,
  });

  t.deepEqual(result, [IssueProblem.BAD_TAG]);
});

test('if the effect has a random or malformed tag, adds BAD_TAG', t => {
  const result = getIssueProblems({
    title: '[Effect] Some effect',
    body: 'Some body',
    type: IssueType.EFFECT,
  });

  t.deepEqual(result, [IssueProblem.BAD_TAG]);
});

test('if the type is EFFECT and the body contains a known content creator, adds CONTENT_CREATOR', t => {
  for (const creator of creators) {
    const result = getIssueProblems({
      title: '[Effect Suggestion] Test Effect',
      body: `some effect for ${creator}`,
      type: IssueType.EFFECT,
    });

    t.deepEqual(result, [IssueProblem.CONTENT_CREATOR], `Did not add CONTENT_CREATOR for "${creator}"`);
  }
});

test('if the type is EFFECT and the title contains a known content creator, adds CONTENT_CREATOR', t => {
  for (const creator of creators) {
    const result = getIssueProblems({
      title: `[Effect Suggestion] Test Effect ${creator}`,
      body: 'some body',
      type: IssueType.EFFECT,
    });

    t.deepEqual(result, [IssueProblem.CONTENT_CREATOR], `Did not add CONTENT_CREATOR for "${creator}"`);
  }
});

test('if the type is FEATURE and the body contains a known content creator, does NOT add CONTENT_CREATOR', t => {
  for (const creator of creators) {
    const result = getIssueProblems({
      title: '[Feature Suggestion] Test Effect',
      body: `some effect for ${creator}`,
      type: IssueType.FEATURE,
    });

    t.deepEqual(result, [], `Added CONTENT_CREATOR for "${creator}" but the type is FEATURE`);
  }
});

test('if the type is BUG and the body contains a known content creator, does NOT add CONTENT_CREATOR', t => {
  for (const creator of creators) {
    const result = getIssueProblems({
      title: '[Bug] Test Effect',
      body: `some effect for ${creator}`,
      type: IssueType.BUG,
    });

    t.deepEqual(result, [], `Added CONTENT_CREATOR for "${creator}" but the type is BUG`);
  }
});

test('if the type is FEATURE and the title contains a known content creator, does NOT add CONTENT_CREATOR', t => {
  for (const creator of creators) {
    const result = getIssueProblems({
      title: `[Feature Suggestion] Test Effect for ${creator}`,
      body: 'body',
      type: IssueType.FEATURE,
    });

    t.deepEqual(result, [], `Added CONTENT_CREATOR for "${creator}" but the type is FEATURE`);
  }
});

test('if the type is BUG and the title contains a known content creator, does NOT add CONTENT_CREATOR', t => {
  for (const creator of creators) {
    const result = getIssueProblems({
      title: `[Bug] Test Effect for ${creator}`,
      body: 'body',
      type: IssueType.BUG,
    });

    t.deepEqual(result, [], `Added CONTENT_CREATOR for "${creator}" but the type is BUG`);
  }
});

test('if the title has a tag, but the rest of the title is empty, adds EMPTY_TITLE', t => {
  const result = getIssueProblems({
    title: '[Effect Suggestion]',
    body: 'some valid body',
    type: IssueType.EFFECT,
  });

  t.deepEqual(result, [IssueProblem.EMPTY_TITLE]);
});
