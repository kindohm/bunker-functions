Netlify functions for fancy Slack slash commands.

# Contributing

Install the Netlify CLI:

```sh
npm install netlify-cli -g
```

Functions are defined at `netlify/functions/`.

Create a folder and .mts file for your function name:

```txt
netlify/functions/foo/foo.mts
```

Write a function that looks like this in your .mts file:

```typescript
import { Context } from "@netlify/functions";

export default async (request: Request, context: Context) => {
  try {
    const raw = await request.text();
    const requestData = Object.fromEntries(new URLSearchParams(raw));
    const { user_name, text } = requestData; // data from Slack

    // refer to Slack API for response body options
    const responseBody = {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `echoing: ${text}`,
          },
        },
      ],
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  } catch (err) {
    // @ts-expect-error its ok
    console.error(err.message);
  }
};
```
