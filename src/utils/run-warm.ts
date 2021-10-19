type Event = AWSLambda.APIGatewayEvent & {
  source?: string;
};
type LambdaFn = (event: AWSLambda.APIGatewayEvent, context: any, callback: any) => any;

const runWarm = (lambdaFunc: LambdaFn): AWSLambda.Handler<Event, unknown> => (event: Event, context, cb) => {
  if (event.source === 'serverless-plugin-warmup') {
    console.log('Function warmed up.');
    return 'pinged';
  }

  /* eslint-disable-next-line no-warning-comments */
  // TODO: Type this better
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
  return lambdaFunc(event, context, cb);
};

export default runWarm;
