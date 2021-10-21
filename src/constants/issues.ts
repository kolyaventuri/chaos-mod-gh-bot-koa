export const defaultTitles = [
  '[Effect Suggestion] My Super Cool Effect Idea',
  '[Feature Suggestion] My Neat Feature',
  '[Bug] My Nasty Bug',
].map((s) => s.toLowerCase());

export const effectsRegex = /cougars?/gim;

const creatorsRegexString = [
  'darkviper(au)?',
  'matto?',
  'call(me)?kevin',
  'kevin',
].join('|');

export const creatorsRegex = new RegExp(creatorsRegexString, 'gim');
