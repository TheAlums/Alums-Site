# data/alumni.json — canonical alumni file

One list of every tracked alum (schema `thealums.alumni/v1`, top-level `asOf`). It replaces the four
hand-kept lists: `js/data.js` players, `js/alumni.js` extras, `js/dictionary.js` rows and the
`ROSTER` in `worker/boxbot.js`.

Consumers
- **Site**: `js/alumni-canonical.js` (generated) defines `FLOCK.alumniData`, `FLOCK.alumni` and
  `FLOCK.alumniView(view)`. `data.js`, `alumni.js` and `dictionary.js` still export the same
  `FLOCK.players` / `FLOCK.dictionary` rows, in the same order, via `alumniView("data" | "alumni" | "dictionary")`.
  Every page loads `js/alumni-canonical.js` right before `js/data.js`.
- **News bot / auditor**: read `data/alumni.json` (or `https://thealums.com/data/alumni.json` once merged).
  Key on `uid` (`espn:<ESPN athlete id>` when known, else `site:<key>`); `id` is the site key used by `js/weekN.js`.
  `site.profile.week1/season/fantasy` are the launch hand seed, not box-verified — never quote them as stats.
- **Box bot**: `node scripts/build-alumni.mjs` rewrites the `ROSTER` block (between the BEGIN/END ROSTER markers)
  from entries with `boxbotRoster: true`. `node scripts/build-alumni.mjs --check` exits 1 if
  `js/alumni-canonical.js` or the worker ROSTER is stale (use it in CI / before deploy).

Suggested next step for the worker (not done, not deployed): bundle the JSON directly
(`import alumni from "../data/alumni.json"` works with wrangler/esbuild) and match ESPN rows by
`athlete.id === espnId` first, falling back to the suffix-tolerant name match. That removes name
collisions and the need to regenerate ROSTER.

Edit flow: change `data/alumni.json` -> `node scripts/build-alumni.mjs` -> commit all three files.
