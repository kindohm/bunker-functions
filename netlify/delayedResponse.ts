interface IDelayedResponseArgs {
  response_url: string;
  responseBody: any;

  // how long to wait to post back to the Slack channel
  delay?: number;
}

export const sendDelayedResponse = (
  delayedResponseArgs: IDelayedResponseArgs,
) => {
  const { response_url, responseBody, delay } = delayedResponseArgs;

  const time = delay || 500;

  if (response_url) {
    // send actual Magic 8 Ball answer in the future
    setTimeout(async () => {
      try {
        await fetch(response_url, responseBody);
      } catch (err) {
        console.error("error posting to response_url", response_url);
        console.error("attempted esponse body", responseBody);
        console.error(err);
      }
    }, time);
  } else {
    console.warn("there was no response_url");
  }
};
