import process from 'process';
import {request} from '@octokit/request';
import {getMessage} from '../../utils/github/message';
import {getIssueDetails} from '../../utils/issue/details';
import {Issue, IssueStatus} from '../../utils/issue/types';

const doPostComment = async (data: Issue, body: string): Promise<void> => {
  const result = await request(
    'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      headers: {
        authorization: `token ${process.env.GH_ACCESS_TOKEN!}`,
      },
      owner: data.repository.owner.login,
      repo: data.repository.name,
      issue_number: data.issue.number,
      body,
    },
  );

  if (result.status !== 201) {
    throw new Error('Something went wrong posting the comment.');
  }
};

const handler = async (data: Issue): Promise<void> => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Loading dotenv...');
    // eslint-disable-next-line unicorn/prefer-module, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-call
    require('dotenv').config();
  }

  if (process.env.GH_ACCESS_TOKEN) {
    console.log(
      'Using token',
      (process.env.GH_ACCESS_TOKEN ?? 'null').slice(0, 12) + '...',
    );
  } else {
    throw new Error('Missing GH_ACCESS_TOKEN environment variable.');
  }

  const details = getIssueDetails(data);
  console.log('Issue status:', details.status);
  if (details.status === IssueStatus.BAD) {
    console.log('Generating comment...');
    const message = getMessage(details);
    console.log('Posting comment...');
    await doPostComment(data, message);
  }

  console.log('DONE');
};

export default handler;
