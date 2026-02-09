import { Context } from "@netlify/functions";
import { getRandItem } from "../../util.js";

const nope = ":wat:";

const emojiList: string[] = [
  "awwyiss",
  "notsureif",
  "awyeah",
  "blah",
  "chefkiss",
  "confuse",
  "duckhunt",
  "elmofire",
  "excellent2",
  "hansolo",
  "itsatrap",
  "notbad",
  "orly",
  "rip",
  "tapping-head",
  "youdontsay",
];

const oobIt = (phrase: string): string => {
  if (!phrase.trim()) {
    return nope;
  }

  return phrase.replace(/[aeiouAEIOU]/g, "oob");
};

const getRandomEmoji = (): string => {
  return getRandItem(emojiList);
};

export default async (request: Request, context: Context) => {
  try {
    const raw = await request.text();
    const requestData = Object.fromEntries(new URLSearchParams(raw));
    const { text } = requestData;

    const result = oobIt(text);
    const randomEmoji = getRandomEmoji();

    const final = result === nope ? result : `:${randomEmoji}: ${result}`;

    const responseBody = {
      response_type: "in_channel",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${final}`,
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
