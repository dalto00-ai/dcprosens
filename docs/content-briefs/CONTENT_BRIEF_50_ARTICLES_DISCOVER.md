# DCPROSENS — Content Brief: 50 Discover-Focused Articles

**Paste this whole file to the AI writing the articles.** It also needs `IMAGE_PROMPTS_50_ARTICLES_DISCOVER.md` (image generation — corrected to Discover-compliant dimensions this time) from the same folder.

All 50 articles are written in **English**. This is a second, deliberately different batch from `CONTENT_BRIEF_81_ARTICLES.md` — that batch was evergreen reference content (rank explainers, DPI calculators). **This batch exists specifically to perform in Google Discover**, which per Google's own guidance favors timely, current content and performs poorly with generic evergreen explainers. Every topic below is tied to a real, dated, sourced event from August 2026 — researched via live web search on 2026-08-25, not invented.

---

## 1. Why this batch is structured differently from the first 81

Google Discover eligibility research (done earlier the same day, see `HANDOFF_PROMPT_FOR_CONTENT_AI.md` in this folder for the full technical diagnosis) found three concrete blockers on the existing 200-post blog:

1. **Every post used `NewsArticle` schema on evergreen content** — wrong per Google's own structured data guidelines; fixed site-wide on 2026-08-25.
2. **Every blog image is 1024×1024px** — Discover requires ≥1200px width minimum, ideally 1600px at 16:9. **This batch's images MUST be generated at the corrected size** — see Section 2.4 and the image prompts file. Do not reuse the old 1024×1024 spec.
3. **`news-sitemap.xml` misuses the Google News protocol on evergreen content** — separate, still-open issue, not this batch's job to fix.

On top of the technical fixes, **topic selection itself changes** for this batch: instead of keyword-gap analysis (what the first 81 did), every one of these 50 topics is anchored to a real, recent, dated event — a patch, a tournament result, a hardware launch, a roster change. This is what Google Discover's own documentation says performs: timely content within a consistent topic area, not generic "what is X" reference pages.

## 2. Global requirements — apply to EVERY one of the 50 articles

### 2.1 Timeliness is the point — protect it
- **Every article must open by naming the real, dated event** in the first sentence (e.g., "CS2's August 19, 2026 update changed how player movement works against walls — here's what that means for your strafe timing."). This is different from the first 81 batch's "direct-answer paragraph" pattern — here the hook IS the news, not a definition.
- **Cite the real source** inline at least once (a link to the patch notes, tournament bracket, or announcement named in Section 4). Don't launder someone else's reporting without attribution.
- **Publish these promptly.** Discover's timeliness advantage decays fast — a "CS2 just changed movement" article is far more valuable in the days after 2026-08-19 than a month later. If there's a real gap between writing and publishing, note it in your delivery report so the site owner can prioritize deployment.
- **`dateModified` must reflect reality.** Unlike the first 81 batch (all evergreen, `dateModified` = `datePublished` was defensible), if you revise one of these after initial publish, update `dateModified` for real — Discover and Google's freshness signals both use it.

### 2.2 SEO / GEO / AEO (same baseline as the first 81 — repeated for completeness)
- **Title tag**: 50–60 characters. Lead with the specific, named thing that changed (game name, patch number, tournament name) — not a generic phrase.
- **Meta description**: 140–155 characters, states the real event + why it matters to the reader's settings.
- **URL slug**: kebab-case, matches the pattern in `src/lib/posts-data/*.ts`.
- **Schema: `Article`, never `NewsArticle`** — even though this content is timely, it is not published by a news organization in Google's sense, and the site already got flagged for this exact misuse once today. Follow the pattern now live in `src/app/blog/[slug]/page.tsx`.
- **FAQPage JSON-LD required** on all 50, same as the first 81 — use the FAQ questions given per article in Section 4.
- Internal linking: every article must link to the specific DCPROSENS tool relevant to the game/topic (e.g., the CS2 sens-finder page, the relevant crosshair tool) — same rule as the first batch.

### 2.3 Brand voice — same as before, one addition
Direct, confident, data-first (see `CONTENT_BRIEF_81_ARTICLES.md` Section 2.5 for the full voice guide — it applies unchanged). The one addition for this batch: **write like someone who watched the patch notes / match / announcement themselves**, not like a wire-service rewrite. Specific numbers, specific hero/operator/map names, specific timestamps — vague timeliness ("recently, X changed") defeats the entire point of this batch.

### 2.4 Images — corrected size, read this before generating anything
The first 81 articles' images were generated at 1024×1024px — **below Google Discover's 1200px minimum width**. This batch corrects that. Every image for this batch must be **1600×900px (16:9 ratio)** — see `IMAGE_PROMPTS_50_ARTICLES_DISCOVER.md` for the full prompt list and style guide. Do not generate square images for this batch under any circumstance.

## 3. Confidence / sourcing tags used below

- **Verified** — real, dated event with a live source link, found via web search on 2026-08-25. Cite the source in the article.
- **Verified (ongoing)** — real and dated, but the situation is still developing as of 2026-08-25 (e.g., a product with no confirmed release date yet). Frame the article honestly as "here's what's known so far," not as a completed story.

Every single topic in this batch is one of these two — there is no "editorial extension" tier in this batch, unlike the first 81. If a fact in Section 4 can't be verified when you sit down to write, don't invent a substitute; flag it and skip to the next topic.

---

## 4. The 50 articles

### Cluster A — CS2 (7 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 1 | CS2's August 2026 Movement Patch Changed Wall Collisions — Here's What It Means for Your Strafes | Build 1.41.7.6, Aug 19 2026, fixes player speed on wall/geometry collision ([CS2News.gg](https://cs2news.gg/cs2-update/cs2-update-2026-08-19-665978)) | Explain the exact mechanical change + whether counter-strafe timing needs adjustment | "Does the CS2 movement patch affect counter-strafing?" · "Do I need to change my sensitivity after this update?" |
| 2 | de_boulder Is CS2's Newest Competitive Map — Best Crosshair & Sens for Its Vertical Corridors | de_boulder added to Competitive/Casual pool, Aug 19 2026 art pass ([ESportPort](https://esportport.com/cs2-update-patch-notes-august-2026-movement-fixes-map-changes/), [Bo3.gg map guide](https://bo3.gg/articles/cs2-boulder-map-guide-overview-bomb-sites-and-strategy)) | Map-specific crosshair/sens advice tied to its verticality | "Is de_boulder in competitive matchmaking now?" · "What crosshair size works best on de_boulder's tight corridors?" |
| 3 | CS2's Skin Market Just Hit a $7 Billion All-Time High — What It Says About the Game's Health | CS2 market cap ATH mid-August 2026, coinciding with Cologne Major shop ([SteamAnalyst](https://www.steamanalyst.com/guides/cs2-market-report-2026), [PorchDrinking](https://porchdrinking.com/cs2-skin-market-2026-economy-trends-and-trading-hubs-worth-a-round/)) | Market/community-health angle, not a settings piece — broad-appeal Discover bait | "Why did CS2's skin market hit an all-time high in 2026?" · "Is the CS2 skin economy still growing?" |
| 4 | Valve's New VACNet Video Review Program: What It Means for CS2's Anti-Cheat | Valve invites players to a video-review anti-cheat program, Aug 2026 ([PCGuide](https://www.pcguide.com/news/valve-is-bringing-overwatch-back-to-counter-strike-as-players-invited-to-new-vacnet-video-review-program/)) | Explain the program, how to get invited, why it matters for legit players | "How do I get invited to CS2's video review program?" · "Does this replace VAC or work alongside it?" |
| 5 | Team Spirit Won the Esports World Cup 2026 CS2 Final — The Settings Behind the $2M Run | Team Spirit beat FUT Esports, EWC 2026 Paris, Aug 20 2026 ([Sortiraparis results](https://www.sortiraparis.com/en/what-to-do-in-paris/gaming/articles/348970-esports-world-cup-2026-discover-the-results-and-champions-of-all-the-finals)) | Champion-team settings deep-dive, tied to a real, dated result | "What crosshair does Team Spirit's lineup use?" · "Did Team Spirit's settings change for the EWC final?" |
| 6 | ZywOo Heads Into BLAST Open Porto 2026 — His Current CS2 Settings Explained | BLAST Open Porto, Aug 26–Sep 6 2026, ZywOo/Vitality competing ([HLTV](https://www.hltv.org/news/45384/blast-open-porto-teams-format-schedule-prizes-talent-fantasy)) | Pre-tournament settings preview, published ahead of the event for timeliness | "What DPI and sensitivity does ZywOo use in 2026?" · "When does BLAST Open Porto start?" |
| 7 | Is donk's New ZOWIE Mouse Ever Coming Out? What We Know as of August 2026 | ZOWIE x donk 65g prototype, no release date as of Aug 2026 ([VPEsports](https://vpesports.com/games/cs-go/zowie-donk-mouse-for-cs2), [Farmskins](https://farmskins.com/news/donk-switches-to-a-new-wireless-zowie-mouse-without-side-buttons)) | **Verified (ongoing)** — frame honestly as unresolved, not a launch announcement | "Has ZOWIE announced a release date for donk's mouse?" · "What are the known specs of donk's ZOWIE prototype?" |

### Cluster B — Valorant (4 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 8 | Valorant Patch 13.04 Brings Back Abyss for Act 5 — Adjust Your Crosshair for Its Verticality | Patch 13.04, Aug 18 2026, Breeze rotated out, Abyss back in Competitive/Deathmatch ([Dexerto](https://www.dexerto.com/valorant/valorant-13-04-update-patch-notes-bring-act-5-with-agent-bug-fixes-3399618/)) | Map-rotation-specific crosshair/sens guide | "Is Abyss in Valorant's competitive map pool for Act 5?" · "What crosshair works best on Abyss's vertical angles?" |
| 9 | Karmine Corp Just Beat Enterprise Esports 2-0 in VCT EMEA Stage 2 — Their Current Settings | Karmine Corp 2-0 win, VCT 2026 EMEA Stage 2, Aug 20–21 2026 ([VLR.gg](https://www.vlr.gg/event/matches/2976/vct-2026-emea-stage-2/?series_id=5776)) | Result-reaction piece with settings angle | "What agents did Karmine Corp play against Enterprise?" · "What sensitivity does Karmine Corp's roster use?" |
| 10 | FURIA Advances in VCT Americas Stage 2 Playoffs — The Crosshair Codes Behind Their Run | FURIA advances, VCT 2026 Americas Stage 2, Aug 13–14 2026 ([VLR.gg](https://www.vlr.gg/event/matches/2977/vct-2026-americas-stage-2/?series_id=5780)) | Result-reaction + crosshair codes | "Who is on FURIA's current VCT Americas roster?" · "How do I copy a pro's exact crosshair code?" |
| 11 | Tarik Steps Away From Valorant Watch Parties After 4 Years — What Happens to the Community Now | Tarik announces break, Aug 14 2026 ([Dot Esports](https://dotesports.com/valorant/news/tarik-steps-away-from-valorant-watch-parties), [The Spike](https://www.thespike.gg/valorant/news/tarik-announces-break-from-valorant-watch-parties/8566)) | Community-culture piece, broad Discover appeal, light-touch on gear | "Why did Tarik stop hosting Valorant watch parties?" · "Who else covers VCT watch parties now?" |

### Cluster C — Apex Legends (4 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 12 | Apex Legends Season 30 Reworked Bloodhound Completely — New Sens Settings for the Allfather's Cloak Ult | Season 30 "Marked," Aug 4 2026, Bloodhound rework ([Sportskeeda](https://www.sportskeeda.com/esports/apex-legends-season-30-patch-notes-bloodhound-rework-corrupted-attachments-looting-overhaul)) | Hero-rework-specific settings guide | "What does Bloodhound's new ultimate do in Season 30?" · "Should I change my ADS sensitivity for the new Bloodhound?" |
| 13 | Loba and Rampart Just Got Buffed in Apex Season 30 — Here's What Changed for Your Aim | Same Season 30 patch, Loba/Rampart buffs ([Sportskeeda](https://www.sportskeeda.com/esports/apex-legends-season-30-patch-notes-bloodhound-rework-corrupted-attachments-looting-overhaul)) | Second angle on the same patch, different heroes — legitimate split, not duplicate | "What changed for Loba in Apex Season 30?" · "Are Rampart's buffs enough to make her viable?" |
| 14 | ALGS Split 2 Pro League Kicked Off — 120 Teams, 40 Spots, and the Road to Sapporo | ALGS Split 2 Pro League begins, Aug 21 2026, $500K prize pool ([ALGS official](https://algs.ea.com/en/news/year-6-is-here)) | Competitive calendar/preview piece | "How many teams are competing in ALGS Split 2?" · "Where is the ALGS Championship being held in 2026?" |
| 15 | UNLIMIT Won Apex's Esports World Cup 2026 Title — Their Settings Breakdown | UNLIMIT (Oblivion) wins AALGS 2026 championship, EWC ([Esports World Cup official](https://esportsworldcup.com/en/news/oblivion-wins-aalgs-2026-championship)) | Champion settings piece tied to a real, dated win | "Who won the Apex Legends title at EWC 2026?" · "What controller/mouse settings does UNLIMIT's roster use?" |

### Cluster D — Overwatch 2 (3 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 16 | D.Mon Just Joined Overwatch 2 — Best Sensitivity Settings for the New MEKA Squad Tank | D.Mon hero launch, Season 4 "Heroes of Busan," Aug 11 2026 ([Blizzard forums](https://us.forums.blizzard.com/en/overwatch/t/overwatch-retail-patch-notes-%E2%80%93-august-11-2026/1032368), [esports.gg](https://esports.gg/news/overwatch/overwatch-confirms-dmon-hero-trailer-release-date-lore-and-meka-squad-details/)) | New-hero settings guide, tied to launch date | "When did D.Mon release in Overwatch 2?" · "What sensitivity works best for D.Mon's kit?" |
| 17 | Overwatch World Cup 2026 Group Stage Wrapped in Busan — What It Means for the DPS Meta | OWWC 2026 Busan group stage, Aug 20–23 2026, 16 teams, final at BlizzCon Anaheim in September ([Dot Esports](https://dotesports.com/overwatch/news/overwatch-world-cup-2026-results)) | Tournament-recap piece with meta implications | "When is the Overwatch World Cup 2026 final?" · "Which teams advanced from the Busan group stage?" |
| 18 | Nexon Is Building a Grassroots Overwatch Esports Ecosystem — What It Means for Aspiring Players | Nexon partnership announced around OWWC qualifiers, Aug 2026 ([InvenGlobal](https://www.invenglobal.com/articles/25032/nexon-to-build-grassroots-overwatch-esports-ecosystem)) | Industry/opportunity angle for competitive-minded readers | "What is Nexon's grassroots Overwatch esports program?" · "How can amateur players get involved?" |

### Cluster E — Marvel Rivals & Rainbow Six Siege (4 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 19 | Marvel Rivals Season 9.5 Added The Hood — Crosshair & Sens Settings for the New Vanguard | Season 9.5 launch, Aug 7 2026, The Hood added ([Marvel Rivals official](https://www.marvelrivals.com/20260805/41525_1310120.html), [FandomWire](https://fandomwire.com/marvel-rivals-season-9-5-balance-changes-explained/)) | New-hero settings guide | "What role does The Hood play in Marvel Rivals?" · "Best crosshair settings for Vanguard heroes?" |
| 20 | Peni Parker's Complete Rework in Marvel Rivals 9.5 — How to Adjust Your Aim | Same patch, Peni Parker full rework, Aug 7 2026 ([FandomWire](https://fandomwire.com/marvel-rivals-season-9-5-balance-changes-explained/)) | Second angle on same patch, different hero — legitimate split | "What changed in Peni Parker's rework?" · "Is Peni Parker still viable after the Season 9.5 changes?" |
| 21 | Rainbow Six Siege's New Operator Noor Burns Shield Users — Settings for the Horus Lance Launcher | Noor revealed ~Aug 17 2026, Operation Split Fire, launches Sep 1 2026 ([Ubisoft News](https://news.ubisoft.com/en-us/article/4qqpGJZSWrrS3Ko2hYvviK/rainbow-six-siege-operation-split-fire-new-operator-noor-3v3-arcade-mode-wasteland-circuit-event-and-more)) | New-operator preview ahead of launch — publish before Sep 1 for maximum timeliness | "When does Noor release in Rainbow Six Siege?" · "What does Noor's Horus Lance Launcher do against shields?" |
| 22 | FaZe Clan Won R6 Siege's Esports World Cup 2026 Title — The Settings Behind Their 3-1 Win | FaZe Clan beats FURIA 3-1, EWC 2026, Aug 15 2026 ([esports.gg](https://esports.gg/news/rainbow-six-siege/r6-finals-ewc-2026-winners-overview/)) | Champion settings piece | "Who is on FaZe's championship-winning R6 roster?" · "What operators did FaZe favor in the EWC final?" |

### Cluster F — Deadlock (2 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 23 | Valve Nerfed Celeste in Deadlock — Does Your Aim Sensitivity Need to Change? | Celeste-focused nerf patch, Aug 22 2026 ([PCGamesN](https://www.pcgamesn.com/deadlock/update-august-22-celeste-nerf)) | Single-hero nerf reaction piece | "What exactly got nerfed on Celeste in Deadlock?" · "Do hero nerfs in Deadlock affect mouse sensitivity directly?" |
| 24 | 13 Heroes Changed in One Deadlock Patch — The Post-Update Settings Guide | Aug 12 2026 balance patch touching 13 heroes ([SteamDB patch notes](https://steamdb.info/patchnotes/24847734/)) | Broad patch-reaction roundup | "Which 13 heroes were rebalanced in Deadlock's August patch?" · "Should I relearn my sensitivity after a big balance patch?" |

### Cluster G — Fortnite (3 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 25 | Fortnite Chapter 7 Season 4 "Override" Just Launched — Sens & Edit Settings for the New Map | Chapter 7 Season 4 launch, Aug 20 2026 ([Beebom roadmap](https://beebom.com/fortnite-roadmap-2026/)) | Season-launch settings guide | "What's new in Fortnite Chapter 7 Season 4?" · "Do edit sensitivity settings need to change every season?" |
| 26 | FNCS Global Championship Just Got a New Date — Everything About the $10M Antwerp Event | FNCS Global Championship rescheduled to Sep 26–27 2026, Antwerp, Last Chance Qualifier started Aug 3 2026 ([Fortnite official](https://www.fortnite.com/competitive/fncs-2026-overview)) | Competitive-calendar piece | "When is the FNCS Global Championship in 2026?" · "How do teams qualify for FNCS Antwerp?" |
| 27 | FNCS Major 3 Set the Final 10 Duos Going to Antwerp — Who Made It | Major 3 "Last Chance," Aug 3 2026 ([esports.gg](https://esports.gg/news/fortnite/fortnite-fncs-2026/)) | Results/qualifier-recap piece | "Which duos qualified for the FNCS Global Championship?" · "What is the prize pool for FNCS Antwerp?" |

### Cluster H — Newer/emerging FPS titles (7 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 28 | Delta Force's Coliseum Map Is Its Tightest PvP Arena Yet — Best Crosshair for Close Quarters | Season 10 "Meltdown" mid-season update, Aug 8 2026, new map Coliseum ([Bittopup](https://news.bittopup.com/news/delta-force-wipe-2026-complete-reset-guide-what-you-keep)) | Map-specific settings guide, complements the existing Delta Force converter post from Batch 1 | "What is the Coliseum map in Delta Force?" · "Best crosshair for tight-quarters combat in Delta Force?" |
| 29 | Arc Raiders' Live Update 1.42.0 Changed the Event Loop — Adjusting Your Settings for Phantom Targets Part 2 | Live Update 1.42.0, Aug 18–21 2026, Phantom Targets event pt. 2 + Subway collab ([Arc Raiders official](https://arcraiders.com/news/live-update-1-42-0)) | Update-reaction piece | "What is the Phantom Targets event in Arc Raiders?" · "Did Arc Raiders' aim mechanics change in update 1.42?" |
| 30 | FragPunk's Blitz Ballet Mode Is Back — Why Your Sensitivity Needs to Be Different in It | Blitz Ballet limited mode returns, Aug 7–20 2026 ([FragPunk official](https://www.fragpunk.com/news/)) | Limited-mode-specific settings guide | "What is Blitz Ballet in FragPunk?" · "Should I use a different sensitivity for high-mobility modes?" |
| 31 | Splitgate: Arena Reloaded Just Ran a Public Playtest — Is It Worth Configuring Your Sens For? | Public playtest with feedback-driven changes, Aug 2026 ([PC Gamer](https://www.pcgamer.com/games/fps/after-its-make-fps-great-again-controversy-splitgate-2-is-relaunching-with-a-humbler-tone-the-goal-is-to-grow-over-time-not-aim-for-a-massive-splash-on-day-1/)) | Comeback/relaunch piece, honest framing (game had a rocky prior launch) | "Is Splitgate 2 relaunching in 2026?" · "What changed in Splitgate's public playtest?" |
| 32 | Escape from Tarkov's New Seasonal Wipe System Explained — What Changes for Your Settings | Patch 1.1.0 "Kord Breach," Aug 3 2026, first official seasonal wipe system ([Forbes](https://www.forbes.com/sites/mikestubbs/2026/07/28/escape-from-tarkov-seasons-update-and-wipe-delayed-until-august/), [AllKeyShop](https://www.allkeyshop.com/blog/escape-from-tarkov-patch-1-1-0-downtime-wipe-news-d/)) | Structural-change explainer | "What is Tarkov's new seasonal wipe system?" · "Does a wipe reset my sensitivity settings?" |
| 33 | Rust's "Power Trip" Update Overhauled Monument Power — A Settings Guide for the New Wipe | Rust "Power Trip," Aug 6 2026, Heavy Fuses + electric monuments + satellite event ([CorrosionHour](https://www.corrosionhour.com/rust-august-2026-update-preview/), [BisectHosting](https://www.bisecthosting.com/blog/rust-august-2026-wipe-release-date-patch-notes-features-heavy-fuze-electric-control-panel)) | Wipe-day settings guide | "What is Power Trip in Rust's August 2026 update?" · "Do I need to reconfigure my sensitivity every wipe?" |
| 34 | PUBG's New RPD LMG Changed the Meta — Should You Adjust Your Sensitivity? | Update 42.3, Aug 11 2026, new RPD LMG + PUBG Playgrounds mode ([pubg.com](https://pubg.com/en/news/10885)) | Weapon-meta-reaction piece | "What is the RPD LMG in PUBG?" · "Does a new weapon meta usually require a sensitivity change?" |

### Cluster I — Call of Duty ecosystem (4 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 35 | Warzone's Special Delivery Drones Just Landed — Best Aim Settings for the New Event | Season 05 Reloaded, Aug 20 2026, Special Delivery drone event ([Call of Duty official](https://www.callofduty.com/blog/2026/08/call-of-duty-black-ops-7-warzone-season-05-reloaded-announcement)) | Event-specific settings guide | "What is the Special Delivery event in Warzone?" · "Do limited-time events need different aim settings?" |
| 36 | Warzone's Juggernaut Now Scales With Squad Size — How to Adjust Your Crosshair for the Fight | Season 05 patch, Aug 12 2026, Juggernaut HP scaling by squad size ([Call of Duty patch notes](https://www.callofduty.com/patchnotes/2026/07/call-of-duty-bo7-warzone-season-05-patch-notes)) | Mechanic-change settings guide | "How much HP does the Warzone Juggernaut have now?" · "Best crosshair for fighting a Juggernaut?" |
| 37 | Modern Warfare 4's Open Beta Introduced Warzone's New Zodiac Map — Early Sensitivity Impressions | MW4 open beta, Aug 2026, Zodiac Resurgence map ([Call of Duty official](https://www.callofduty.com/blog/2026/08/call-of-duty-modern-warfare-4-open-beta-everything-you-need-to-know)) | Early-access first-impressions piece | "What is the Zodiac map in the MW4 beta?" · "Will MW4 use the same sensitivity formula as prior CoD titles?" |
| 38 | OpTic Gaming Defends Its Title at CoD's Esports World Cup 2026 — What's Behind Their Consistency | OpTic at EWC 2026, Aug 5–9 2026, defending champions ([Esports World Cup](https://esportsworldcup.com/en/news/call-of-duty-black-ops-7-at-ewc-26-survival-guide)) | Champion-consistency piece | "Did OpTic Gaming win CoD's Esports World Cup 2026?" · "What settings does OpTic's roster favor?" |

### Cluster J — Halo & mobile (2 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 39 | Halo: Campaign Evolved's Latest Update Adds a Chromatic Aberration Toggle — Should You Turn It Off? | Campaign Evolved update, Aug 17–21 2026, visual toggles added ([Pure Xbox](https://www.purexbox.com/news/2026/08/halo-studios-reveals-five-main-highlights-in-campaign-evolveds-latest-update)) | Visual-settings-for-visibility piece | "What visual settings did Halo: Campaign Evolved just add?" · "Does chromatic aberration affect target visibility?" |
| 40 | Call of Duty Mobile's Terminator Crossover Season Just Landed — Mobile Sens Settings for the New Season | CoD Mobile Season 7 "Terminated," Aug 5 2026, Terminator 2 collab ([Call of Duty official](https://www.callofduty.com/blog/2026/07/call-of-duty-mobile-season-7-terminated)) | Mobile-specific settings piece, cross-links to the site's mobile converter tools | "What's in CoD Mobile's Terminator crossover season?" · "How is mobile sensitivity different from PC/console?" |

### Cluster K — Hardware & Gamescom 2026 (10 articles)

| # | Title | Real event (source) | Angle | FAQs |
|---|---|---|---|---|
| 41 | ASUS Unveiled the First OLED Monitor Built Specifically for Esports — Does It Change How You Should Calibrate Sens? | ROG Strix OLED XG259QWPG Ace, Gamescom 2026 ([ROG/Asus](https://rog.asus.com/articles/gaming/new-esports-oled-gaming-monitors-the-rog-gladius-returns-and-more-see-the-rog-gear-from-gamescom-2026/)) | Product-launch settings-implications piece | "What makes the ROG Strix XG259QWPG different from other OLED monitors?" · "Does an esports-specific monitor change my ideal sensitivity?" |
| 42 | ViewSonic's New Monitor Has a 24.5-Inch Esports Mode Inside a 27-Inch Screen — Here's What That Means for FOV | ViewSonic XG2738-2K-OLED, Aug 2026 ([ViewSonic](https://www.viewsonic.com/library/gaming/best-oled-240hz-monitors-for-gaming/)) | FOV/settings-implications piece, links to the site's monitor simulator tool | "What is Esports Mode on the ViewSonic XG2738?" · "Does switching screen size mid-monitor change my FOV settings?" |
| 43 | Finalmouse Is Building Its Own Factory in 2026 — What It Means for Starlight and Ultralight Owners | Finalmouse announces in-house factory, 2026 ([TechPowerUp](https://www.techpowerup.com/340402/finalmouse-announces-fully-integrated-mouse-factory-for-2026)) | Brand/manufacturing-news piece with owner-relevant implications | "Is Finalmouse changing how its mice are made?" · "Will this affect existing Finalmouse Starlight/Ultralight models?" |
| 44 | Zowie's ZA-12DW Is the Line's First Update Since 2021 — Best DPI & Sens Settings | Zowie ZA-12DW launch, 53g, 2026 (various coverage) | New-product settings guide | "What changed in the Zowie ZA-12DW compared to older ZA mice?" · "Best DPI for the ZA-12DW in competitive FPS?" |
| 45 | SteelSeries' $45 Rival 3 Gen 2 Has a Sensor That Used to Cost Triple — Is It Actually Worth It? | SteelSeries Rival 3 Gen 2, 8500 DPI TrueMove Core sensor, sub-$45, Aug 2026 | Budget-value analysis piece | "What sensor is in the SteelSeries Rival 3 Gen 2?" · "Can a budget mouse compete with flagship models for FPS?" |
| 46 | HyperX Brought an Open-Back Headset and a 47g Wireless Mouse to Gamescom 2026 — First Look | HyperX Cloud Alpha Air + Pulsefire Haste 3 Pro, Gamescom 2026, Aug 26–30 ([Absolute Geeks](https://www.absolutegeeks.com/games/gaming-news/hyperx-brings-cloud-alpha-air-and-haste-3-pro-to-gamescom/)) | Gamescom-preview piece | "What's new about HyperX's Pulsefire Haste 3 Pro?" · "Is an open-back headset good for competitive FPS?" |
| 47 | Gamescom 2026's Wildest Gear Reveals for Competitive FPS Players | Roundup of Gamescom 2026 hardware (ASUS OLED, ViewSonic, HyperX, others from Clusters K) | Roundup/listicle piece — strong Discover format (visual, broad appeal), publish during/just after Gamescom (Aug 26-30) | "When is Gamescom 2026?" · "What competitive-FPS-relevant gear was shown at Gamescom 2026?" |
| 48 | PUBG Global Series 9 Just Finished Its Grand Finals — Full Results and What's Next Before PGC Istanbul | PGS9 Grand Finals, Aug 23–24 2026 ([PUBG Esports](https://pubgesports.com/en/news)) | Results-recap piece, timely (finals just wrapped as of article research date) | "Who won PUBG Global Series 9?" · "When and where is the next PUBG Global Championship?" |
| 49 | EA's $55 Billion Privatization Just Closed — What It Could Mean for Apex Legends' Future | EA acquisition by PIF/Silver Lake/Affinity Partners completes, Aug 4 2026 ([EA official](https://www.ea.com/news/ea-announces-completion-of-acquisition)) | Industry-news piece with player-relevant speculation, broad Discover appeal | "Who owns EA after the 2026 acquisition?" · "Will Apex Legends change under EA's new ownership?" |
| 50 | Valve's VACNet Video Review Program and the Bigger Picture: Is CS2 Anti-Cheat Finally Catching Up? | Same VACNet story as #4, but framed as an industry-wide anti-cheat analysis rather than a straight news piece — legitimate second angle since the audiences and search intent differ (news-seekers vs. broader "is anti-cheat working" discourse readers) | Opinion/analysis piece, broadest Discover appeal of the anti-cheat cluster | "How does VACNet's video review program actually work?" · "Is CS2 anti-cheat better than other major FPS titles in 2026?" |

---

## 5. Delivery checklist (per article) — same as the first 81, plus one item

- [ ] Title, H1, meta title, meta description present and within length limits
- [ ] Opens with the named, dated real event (not a generic definition)
- [ ] Real source cited inline at least once
- [ ] FAQPage JSON-LD with the exact FAQ questions from Section 4
- [ ] `Article` schema (never `NewsArticle`) — verify against the live template, don't assume
- [ ] At least 2 internal links to DCPROSENS tools relevant to the specific game/topic
- [ ] Hero image generated at **1600×900px (16:9)** from `IMAGE_PROMPTS_50_ARTICLES_DISCOVER.md` — reject anything generated square
- [ ] No fabricated facts beyond what's sourced in Section 4 — if research turns up something that contradicts this brief, trust the fresh research and flag the discrepancy in your delivery report

## 6. After all 50 are written

Same final QC pass as the first batch (see `HANDOFF_PROMPT_FOR_CONTENT_AI.md` Section 3) — code, security, SEO, GEO/AEO, sitemap, images — before deploying. Additionally confirm: every image is actually ≥1200px wide (not just named correctly), and spot-check 3-4 live pages' rendered JSON-LD to confirm `Article` (not `NewsArticle`) actually shipped.
