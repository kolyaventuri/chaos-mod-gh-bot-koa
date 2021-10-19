import {IssueType, Label} from './types';

const labelMap: Record<string, IssueType> = {
  'effect suggestion': IssueType.EFFECT,
  'feature request': IssueType.FEATURE,
  bug: IssueType.BUG,
};

export const getIssueType = (labels: Label[]): IssueType => {
  for (const label of labels) {
    const name = label.name.toLowerCase();
    const type = labelMap[name];

    if (type) {
      return type;
    }
  }

  return IssueType.UNKNOWN;
};
