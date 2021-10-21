import test from 'ava';

import strings from '../../../src/utils/i18n/strings.json';
import {getString} from '../../../src/utils/i18n';

test('can get a string one-level deep', (t) => {
  const result = getString('messageBase');

  t.is(result, strings.messageBase);
});

test('can get a string multiple levels deep', (t) => {
  const result = getString('issues.DEFAULT_TITLE');

  t.is(result, strings.issues.DEFAULT_TITLE);
});

test('can replace placeholders in a string', (t) => {
  const result = getString('messageBase', {type: 'foobar'});

  t.is(result, 'Hi there! It looks like your foobar has a problem.');
});

test('returns an empty string if given a bad key', (t) => {
  const result = getString('foobar');

  t.is(result, '');
});
