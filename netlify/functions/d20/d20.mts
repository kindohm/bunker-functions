import { Context } from "@netlify/functions";
import { randInt } from "../../util.js";

export default async (request: Request, context: Context) => {
  try {
    const raw = await request.text();
    const requestData = Object.fromEntries(new URLSearchParams(raw));
    const { user_name } = requestData;

    const roll = randInt(1, 20);
    const responseBody = {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${user_name} rolls the d20...`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `:d20: ${roll}`,
          },
        },
      ],
    };

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
