# Box bot — turn it on

This Worker reads ESPN week box scores and returns JSON the site can use.

## What you click in Cloudflare

1. Workers & Pages → Create → Worker.
2. Name it `thealums-boxbot`.
3. Connect the GitHub repo `TheAlums/Alums-Site`.
4. Set production branch to `preview`.
5. Build command: leave blank.
6. Deploy command:
   `npx wrangler deploy --config wrangler.boxbot.jsonc`
7. After it deploys, open:
   `https://thealums-boxbot.<your-account>.workers.dev/api/week/2`

You should see JSON with `matched` and a `players` object.

If the deploy screen will not take a custom wrangler file, paste `worker/boxbot.js` as the Worker script and ignore assets.

## How the site uses it

`js/box-feed.js` asks that URL after the page loads. If the bot is down, the hand sheet in `js/week2.js` stays on screen. Nothing goes blank.

Cron runs at 6:00am Pacific (13:00 UTC) on Friday, Monday, and Tuesday.
- Friday: Thursday night games
- Monday: Sunday slate
- Tuesday: Monday night leftovers

## Rule the bot follows

Only names on the roster list inside `worker/boxbot.js` are stamped. No snap in the ESPN box means no line.
