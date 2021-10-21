export const enum IssueProblem {
  DEFAULT_TITLE = 'DEFAULT_TITLE',
  MISSING_TAG = 'MISSING_TAG',
  BAD_TAG = 'BAD_TAG',
  OVERUSED_EFFECT = 'OVERUSED_EFFECT',
  CONTENT_CREATOR = 'CONTENT_CREATOR',
  EMPTY_TITLE = 'EMPTY_TITLE',
}

export const enum IssueStatus {
  GOOD = 'GOOD',
  BAD = 'BAD',
}

export const enum IssueType {
  BUG = 'BUG',
  EFFECT = 'EFFECT',
  FEATURE = 'FEATURE',
  UNKNOWN = 'UNKNOWN',
}

export interface IssueDetails {
  type: IssueType;
  problems: IssueProblem[];
  status: IssueStatus;
}

export interface Label {
  id: number;
  node_id: string;
  url: string;
  color: string;
  default: boolean;
  name: string;
  description: string;
}

export interface Issue {
  [key: string]: any;
  action: string;
  issue: {
    [key: string]: any;
    number: number;
    title: string;
    body: string;
    labels: Label[];
  };
  repository: {
    [key: string]: unknown;
    name: string;
    owner: {
      [key: string]: unknown;
      login: string;
    };
  };
}
