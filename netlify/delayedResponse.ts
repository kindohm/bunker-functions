// import axios from "axios";
// import { delayTime } from "./config";

interface IDelayedResponseArgs {
  response_url: string;
  responseBody: any;

  // how long to wait to post back to the Slack channel
  delay?: number;

  // if true, this will allow the user's slash command message
  // to be displayed in the Slack conversation.
  // if false, the user's slash command will only
  // be visible to themselves.
  showOriginalMessage: boolean;
}

export const sendDelayedResponse = (
  delayedResponseArgs: IDelayedResponseArgs
) => {
  const { response_url, responseBody, delay, showOriginalMessage } =
    delayedResponseArgs;

  const time = delay || 500;

  if (response_url) {
    // must send empty response immediately
    if (showOriginalMessage) {
      Response.json({ response_type: "in_channel" }, { status: 200 });
    } else {
      Response.json({}, { status: 200 });
    }
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
    Response.json(responseBody);
  }
};
