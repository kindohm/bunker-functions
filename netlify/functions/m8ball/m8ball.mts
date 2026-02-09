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
  try {
    const raw = await request.text();
    const requestData = Object.fromEntries(new URLSearchParams(raw));
    const { user_name, text, response_url } = requestData;
    const answer = getRandItem(answers);

    const responseBody = {
      // response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${user_name} shakes the magic 8 ball and asks: ${text}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `:magic8ball: ${answer}`,
          },
        },
      ],
    };

    // sendDelayedResponse({
    //   response_url,
    //   responseBody,
    // });

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  } catch (err) {
    console.error("oh no");
    // @ts-expect-error its ok
    console.error(err.message);
  }
};
