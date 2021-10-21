import {getString} from '../i18n';
import {IssueDetails} from '../issue/types';

const defaultString = getString('submission');

export const getMessage = (details: IssueDetails): string => {
  const headerKey =
    details.problems.length > 1 ? 'messageBaseMultiple' : 'messageBase';
  const typeString = getString(`issueType.${details.type}`);
  console.log(details);
  let result = `${getString(headerKey, {type: typeString || defaultString})}\n`;

  const problemList = details.problems.map((problem) => {
    const key = `issues.${problem}`;
    return `- ${getString(key)}`;
  });

  result += problemList.join('\n') + '\n\n';
  result += getString('messageFooter');

  return result;
};
