import {getIssueProblems} from './problems';
import {getIssueType} from './type';
import {Issue, IssueDetails, IssueStatus} from './types';

export const getIssueDetails = (issue: Issue): IssueDetails => {
  const {
    issue: {title, body, labels},
  } = issue;
  const type = getIssueType(labels);
  const problems = getIssueProblems({title, body, type});

  let status: IssueStatus = IssueStatus.GOOD;
  if (problems.length > 0) {
    status = IssueStatus.BAD;
  }

  return {
    type,
    problems,
    status,
  };
};
