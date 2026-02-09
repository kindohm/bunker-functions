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
    console.log("m8ball!");

    const raw = await request.text();
    console.log("rawwww", raw);

    const requestData = Object.fromEntries(new URLSearchParams(raw));

    const { response_url } = requestData;
    console.log("response_url", response_url);

    const answer = getRandItem(answers);
    console.log("answer", answer);

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

    console.log("setting up delayed response");
    sendDelayedResponse({
      response_url,
      responseBody,
    });

    console.log("sending final response");
    return new Response(JSON.stringify({ response_type: "in_channel" }), {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  } catch (err) {
    console.error("oh no");

    // @ts-expect-error its ok
    console.error(err.message);

    console.error(err);
  }
};
