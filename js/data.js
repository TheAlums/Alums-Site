/* The Alums — Oregon ProDucks pipeline
   Seed data for v1. In production this comes from NFL APIs + a CMS. */

window.FLOCK = window.FLOCK || {};

FLOCK.meta = {
  brand: "The Alums",
  tagline: "Every Duck. Every Sunday.",
  school: "Oregon Ducks",
  schoolId: "oregon",
  season: 2026,
  week: 1,
  lastUpdated: "September 15, 2026",
  activeCount: 36,
  teamsRepresented: 24,
  firstRoundStreak: 7
};

/* Players now come from the canonical alumni file (data/alumni.json -> js/alumni-canonical.js,
   built by scripts/build-alumni.mjs). Same rows, same order as the old inline array. */
FLOCK.players = FLOCK.alumniView ? FLOCK.alumniView("data") : [];

FLOCK.news = [
  {
    id: "n1",
    tag: "Week 1",
    href: "https://www.espn.com/search/_/q/Sadiq%20scores%20on%20his%20first%20NFL%20series.%20Thieneman%20takes%20a%20game%20ball.",
    featured: true,
    title: "Sadiq scores on his first NFL series. Thieneman takes a game ball.",
    dek: "Two first-round Ducks from the 2026 draft announced themselves on Sunday. The Jets tight end punched in a rushing score before the game was five minutes old.",
    time: "Sep 15, 2026",
    author: "The Alums Desk",
    playerIds: ["sadiq", "thieneman"]
  },
  {
    id: "n2",
    tag: "Quarterbacks",
    href: "https://www.espn.com/search/_/q/Herbert's%20Chargers%20drop%20a%20stunner.%20Nix%20walks%20into%20a%20Kansas%20City%20buzzsaw.",
    featured: true,
    title: "Herbert's Chargers drop a stunner. Nix walks into a Kansas City buzzsaw.",
    dek: "The two Oregon starters on the slate both lost. Herbert went 17-of-27 for 209 and a score; Nix was sacked into a 10–31 hole in Denver.",
    time: "Sep 15, 2026",
    author: "The Alums Desk",
    playerIds: ["herbert", "nix"]
  },
  {
    id: "n3",
    tag: "Rookies",
    href: "https://www.espn.com/search/_/q/Boettcher%20posts%20seven%20tackles%20in%20his%20Colts%20debut.",
    featured: false,
    title: "Boettcher posts seven tackles in his Colts debut.",
    dek: "The fourth-round linebacker looked like a three-year starter on day one. Indianapolis has a Duck in the middle of the defense.",
    time: "Sep 14, 2026",
    author: "The Alums Desk",
    playerIds: ["boettcher"]
  },
  {
    id: "n4",
    tag: "Fantasy",
    href: "https://www.espn.com/search/_/q/Bucky%20Irving%20is%20the%20desk's%20RB1%20until%20further%20notice.",
    featured: false,
    title: "Bucky Irving is the desk's RB1 until further notice.",
    dek: "A receiving touchdown and the lead back role in Tampa keep Irving in every starting lineup. Franklin and Sadiq are the streaming questions.",
    time: "Sep 15, 2026",
    author: "The Alums Desk",
    playerIds: ["irving", "sadiq", "franklin"]
  },
  {
    id: "n5",
    tag: "Pipeline",
    href: "https://www.espn.com/search/_/q/36%20Ducks%20on%2053-man%20rosters.%20Oregon%20sits%208th%20nationally.",
    featured: false,
    title: "36 Ducks on 53-man rosters. Oregon sits 8th nationally.",
    dek: "Only the usual blue bloods — Ohio State, Alabama, Georgia, LSU, Notre Dame, Texas, Michigan — have more active alumni. Florida is tied.",
    time: "Sep 6, 2026",
    author: "The Alums Desk",
    playerIds: []
  },
  {
    id: "n6",
    tag: "O-Line",
    href: "https://www.espn.com/search/_/q/The%20factory%20is%20still%20open:%20Sewell,%20Conerly,%20Powers-Johnson%20start%20Week%201.",
    featured: false,
    title: "The factory is still open: Sewell, Conerly, Powers-Johnson start Week 1.",
    dek: "Three Oregon tackles/interior linemen opened as Week 1 starters. Pregnon and Harkey made the 53 as rookies.",
    time: "Sep 10, 2026",
    author: "The Alums Desk",
    playerIds: ["sewell", "conerly", "jpj"]
  },
  {
    id: "n7",
    tag: "Secondary",
    href: "https://www.espn.com/search/_/q/Gonzalez,%20Lenoir,%20Holland,%20Williams%20—%20the%20Duck%20secondary%20tree%20is%20blooming.",
    featured: false,
    title: "Gonzalez, Lenoir, Holland, Williams — the Duck secondary tree is blooming.",
    dek: "Four Oregon defensive backs opened as starters. Add Thieneman and the 2026 class and the pipeline is a DB factory now, too.",
    time: "Sep 12, 2026",
    author: "The Alums Desk",
    playerIds: ["gonzalez", "lenoir", "holland", "evanwilliams", "thieneman"]
  },
  {
    id: "n8",
    tag: "Injury",
    href: "https://www.espn.com/search/_/q/Dillon%20Gabriel%20opens%20the%20year%20on%20IR%20in%20Cleveland.",
    featured: false,
    title: "Dillon Gabriel opens the year on IR in Cleveland.",
    dek: "The former Duck quarterback will not be available for the Browns' early slate. Mariota remains the healthy veteran backup in Washington.",
    time: "Sep 1, 2026",
    author: "The Alums Desk",
    playerIds: ["mariota"]
  }
];

FLOCK.positions = ["All", "QB", "RB", "WR", "TE", "OL", "OT", "DL", "OLB", "LB", "CB", "S", "DB"];

FLOCK.prospects = [
  {
    id: "moore",
    name: "Dante Moore",
    pos: "QB",
    class: 2027,
    status: "Watch list",
    ht: "6-3",
    wt: "215",
    forty: "—",
    shuttle: "—",
    vert: "—",
    broad: "—",
    bench: "—",
    note: "Projected first-round quarterback. Combine numbers land after the 2027 cycle."
  },
  {
    id: "jamari",
    name: "Jamari Johnson",
    pos: "TE",
    class: 2027,
    status: "Watch list",
    ht: "6-5",
    wt: "245",
    forty: "—",
    shuttle: "—",
    vert: "—",
    broad: "—",
    bench: "—",
    note: "Mismatch tight end. Pro day / combine board fills in spring 2027."
  },
  {
    id: "watch-ot",
    name: "Oregon OT board",
    pos: "OT",
    class: 2027,
    status: "Watch list",
    ht: "—",
    wt: "—",
    forty: "—",
    shuttle: "—",
    vert: "—",
    broad: "—",
    bench: "—",
    note: "Name locks after bowl season. Combine cells stay TBA until Indy."
  },
  {
    id: "watch-edge",
    name: "Oregon EDGE (TBA)",
    pos: "EDGE",
    class: 2027,
    status: "Measurables TBA",
    ht: "TBA", wt: "TBA", forty: "TBA", shuttle: "TBA", vert: "TBA", broad: "TBA", bench: "TBA",
    note: "Watch slot for a declared rusher."
  },
  {
    id: "watch-cb",
    name: "Oregon CB (TBA)",
    pos: "CB",
    class: 2027,
    status: "Measurables TBA",
    ht: "TBA", wt: "TBA", forty: "TBA", shuttle: "TBA", vert: "TBA", broad: "TBA", bench: "TBA",
    note: "Secondary pipeline. Official 40 after pro day."
  }
];

FLOCK.shopItems = [
  { id: "herbert-j", name: "Justin Herbert jersey", team: "Chargers", price: "From $149.99", href: "https://www.fanatics.com/nfl/los-angeles-chargers/justin-herbert/player-gear/o-2424+d-76997+z-89876-2370510473", art: "10" },
  { id: "nix-j", name: "Bo Nix jersey", team: "Broncos", price: "From $129.99", href: "https://www.fanatics.com/nfl/denver-broncos/bo-nix/player-gear/o-2422+d-76997+z-85732-2773512268", art: "10" },
  { id: "sewell-j", name: "Penei Sewell jersey", team: "Lions", price: "From $129.99", href: "https://www.fanatics.com/nfl/detroit-lions/penei-sewell/player-gear/o-2423+d-76997+z-90876-2160510373", art: "58" },
  { id: "irving-j", name: "Bucky Irving jersey", team: "Buccaneers", price: "From $129.99", href: "https://www.fanatics.com/nfl/tampa-bay-buccaneers", art: "7" }
];

FLOCK.schools = [
  { id: "oregon", name: "Oregon", channel: "ProDucks", href: "producks/index.html", live: true, topN: 5 },
  { id: "alabama", name: "Alabama", channel: "ProTide", href: null, live: false, topN: 5 },
  { id: "georgia", name: "Georgia", channel: "Dawgs", href: null, live: false, topN: 5 }
];

FLOCK.skillPositions = ["QB", "RB", "WR", "TE"];
