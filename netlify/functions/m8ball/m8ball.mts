import { Context } from "@netlify/functions";
import { getRandItem } from "../../util.js";
import { sendDelayedResponse } from "../../delayedResponse.js";

// sourced from https://en.wikipedia.org/wiki/Magic_8-ball
export const answers: Array<string> = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",

  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",

  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",

  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful. ",
];

export default async (request: Request, context: Context) => {
  const requestData = await request.json();
  const { response_url } = requestData;

  const answer = getRandItem(answers);

  const responseBody = {
    response_type: "in_channel",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:magic8ball: ${answer}`,
        },
      },
    ],
  };

  sendDelayedResponse({
    response_url,
    responseBody,
  });

  return {
    body: JSON.stringify({ response_type: "in_channel" }),
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  };
};
