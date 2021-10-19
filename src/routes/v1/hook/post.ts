/* import issueHandler from '../../../handlers/v1/issue';
import {Issue} from '../../../utils/issue/types';

export const handleHook = async (event: AWSLambda.APIGatewayEvent): Promise<AWSLambda.APIGatewayProxyResult> => {
  const {body} = event;
  let parseResult: Issue;

  try {
    parseResult = JSON.parse(body ?? '') as Issue;
  } catch (error: unknown) {
    console.error(error);

    return {
      statusCode: 400,
      body: '400 bad request',
    };
  }

  if (parseResult.action === 'opened' && parseResult.issue) {
    try {
      await issueHandler(parseResult);
    } catch (error: unknown) {
      console.error(error);

      return {
        statusCode: 500,
        body: '500 server error',
      };
    }
  }

  return {
    statusCode: 200,
    body: 'ok',
  };
};

export const handler = runWarm(handleHook); */

export {};
