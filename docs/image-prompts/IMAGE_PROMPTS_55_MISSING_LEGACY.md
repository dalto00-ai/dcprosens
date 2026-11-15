# Image Prompts — 55 Missing Legacy Post Images

These are the **only 55 blog images still missing** from the entire site, verified by scanning all 250 posts against `public/blog/` on 2026-09-02. Everything else is covered: 195 posts already have their own image, all 79 gear photos exist, all 58 web-story images exist, and there are zero broken image references anywhere.

**Why these were invisible until now:** each of these posts declared a short legacy filename (`valorant-crosshair-placement.webp`) that never existed on disk, so `resolveBlogImage()` silently substituted a shared generic image. The `image` field of all 55 posts has now been renamed to match the post slug exactly, so **you just drop the file into `public/blog/` with the filename below and it goes live on the next build — no code change needed.**

## Specs (same as the Discover batch)

- **Size: 1600×900px (16:9 landscape).** Not square. Google Discover requires ≥1200px wide and crops into wide cards.
- **Format: `.webp`**, saved directly to `public/blog/`.
- **Filename: exactly as written below.** It matches the post slug; anything else falls back to a generic image again.
- **Visual identity:** dark cyberpunk/tech background, neon green (`#00FF9D`) and purple (`#7000FF`) accent lighting, photorealistic 3D render / product-shot style, dramatic rim lighting, shallow depth of field.
- **Text overlay:** 2–5 words in bold neon green, bottom-left or bottom-right corner.
- **Composition:** built for a wide frame — subject on one third, breathing room on the other.

Reference for colour/lighting mood only: `public/blog/8khz-wireless-mouse.webp`.

---

## Cluster A — Gear & Hardware (9)

**1. `60hz-vs-144hz-vs-360hz-gaming-monitor-fps-guide.webp`**
> Three gaming monitors receding in a row from left to right, each showing the same crosshair but with progressively sharper motion clarity — the leftmost heavily ghosted, the rightmost razor-sharp. Glowing green refresh-rate labels floating above each. Purple rim light along the bezels. Text overlay: "60 TO 540HZ".

**2. `best-mousepad-size-guide-2026.webp`**
> Top-down view of three mousepads of increasing size layered on a dark desk, edges glowing neon green, a translucent arc showing a 360° mouse sweep overflowing the smallest one. Text overlay: "SIZE MATTERS".

**3. `gaming-mouse-sensor-guide-optical-vs-laser-2026.webp`**
> Extreme macro of a mouse underside on the right two-thirds, sensor lens glowing green, with a split beam — a focused optical cone versus a scattered laser spray — projected onto the surface below. Text overlay: "OPTICAL VS LASER".

**4. `mouse-grip-style-guide-palm-claw-fingertip.webp`**
> Three stylised translucent hand silhouettes over identical mice, side profile, arranged left to right showing palm, claw and fingertip posture. Green contact-point highlights where fingers touch. Text overlay: "PALM CLAW TIP".

**5. `mouse-weight-guide-light-vs-heavy-fps-2026.webp`**
> A balance scale rendered in dark chrome, a skeletal ultralight mouse on the left pan and a dense solid mouse on the right, green glow under the lighter side. Text overlay: "GRAMS MATTER".

**6. `polling-rate-explained-1000hz-vs-4000hz-vs-8000hz.webp`**
> Three stacked horizontal signal traces of increasing density filling the right two-thirds, from coarse steps to a near-continuous green line, oscilloscope aesthetic. Text overlay: "1000 TO 8000HZ".

**7. `ptfe-mouse-skates-glass-guide-friction.webp`**
> Macro close-up of mouse feet gliding on a reflective surface, a green friction trail streaking behind, split composition contrasting a matte PTFE skate against a glass one. Text overlay: "PTFE VS GLASS".

**8. `speed-vs-control-mousepad-which-is-better.webp`**
> A single mousepad split diagonally: the left half smooth and fast with a long green motion streak, the right half textured and grippy with a short braked streak. Text overlay: "SPEED VS CONTROL".

**9. `wireless-vs-wired-gaming-mouse-fps-2026.webp`**
> Two identical mice facing each other, the left one tethered by a glowing green cable, the right one floating with a purple wireless signal arc. Latency numbers in small green HUD text between them. Text overlay: "WIRED VS WIRELESS".

## Cluster B — CS2 (7)

**10. `best-cs2-crosshair-settings-pro-codes-2026.webp`**
> A grid of six distinct crosshair reticle designs glowing green on a dark dust-map backdrop, one highlighted with a purple selection ring. Text overlay: "PRO CROSSHAIR CODES".

**11. `best-cs2-sensitivity-settings-2026.webp`**
> A CS2-style HUD sensitivity slider glowing green on the left third, with a rifle silhouette and a measured cm/360 arc sweeping across the right. Text overlay: "CS2 SENS DIALED".

**12. `counter-strafing-guide-cs2-2026.webp`**
> A player silhouette caught mid-direction-change, two opposing green motion arrows cancelling at the feet, a sharp crosshair locked dead still above. Purple ambient. Text overlay: "STOP THEN SHOOT".

**13. `cs2-peeking-guide-wide-swing-jiggle-2026.webp`**
> A dark corridor corner on the right, three overlapping translucent player silhouettes tracing wide-swing, shoulder-peek and jiggle paths in green. Text overlay: "PEEK LIKE A PRO".

**14. `cs2-practice-commands-guide-2026.webp`**
> A developer console window glowing green over a blurred practice-map background, lines of config text scrolling, a green cursor blinking. Text overlay: "PRACTICE CONFIG".

**15. `cs2-recoil-control-spray-transfer-guide.webp`**
> Two bullet-hole spray patterns on a concrete wall — one wild and scattered, one tight and controlled — with a green corrective arc transferring between two targets. Text overlay: "SPRAY TRANSFER".

**16. `cs2-spray-control-guide-ak47-m4.webp`**
> An AK-47 and an M4A4 silhouette crossed on the left third, their spray patterns rendered as glowing green traced curves filling the right two-thirds. Text overlay: "AK AND M4".

## Cluster C — Valorant (6)

**17. `best-valorant-crosshair-settings-2026.webp`**
> A crosshair-builder panel glowing green on the left, live preview of four reticle variants floating over a stylised Valorant-esque map corridor on the right. Text overlay: "CROSSHAIR CODES".

**18. `best-valorant-sensitivity-settings-2026.webp`**
> A glowing green sensitivity value readout on the left third with a fine mouse-movement arc sweeping right across a purple-lit tactical backdrop. Text overlay: "VALORANT SENS".

**19. `best-valorant-settings-by-agent-role.webp`**
> Four abstract agent-role glyphs (duelist, controller, initiator, sentinel) rendered as glowing green geometric emblems in a row, each with a small settings HUD beneath. Text overlay: "SETTINGS BY ROLE".

**20. `how-to-improve-aim-valorant-2026.webp`**
> A rising green accuracy graph on the right two-thirds, translucent target silhouettes being cleared left to right, a crosshair snapping between them with motion trails. Text overlay: "SHARPEN YOUR AIM".

**21. `valorant-crosshair-placement-guide-2026.webp`**
> A corridor with a head-level green guide line running along the wall at the correct crosshair height, reticle sitting precisely on it, a faded incorrect low placement ghosted below. Text overlay: "HEAD LEVEL".

**22. `cs2-to-valorant-sensitivity-converter-guide.webp`**
> Split frame: gritty CS2-style concrete on the left, clean stylised Valorant-style geometry on the right, a glowing green conversion arrow with a multiplier value crossing the seam. Text overlay: "CS2 TO VALORANT".

## Cluster D — Cross-Game Converters (7)

**23. `battlefield-2042-sensitivity-converter-guide.webp`**
> A wide battlefield vista with vehicle silhouettes on the horizon, a green conversion arc and sensitivity readout floating in the left third. Text overlay: "BATTLEFIELD SENS".

**24. `fortnite-to-cs2-sensitivity-converter.webp`**
> Split frame: bright stylised build-battle geometry on the left, dark tactical corridor on the right, a glowing green conversion arrow crossing the divide. Text overlay: "FORTNITE TO CS2".

**25. `halo-infinite-sensitivity-converter-guide.webp`**
> A sci-fi ring-world horizon curving across the background, an angular green reticle and a conversion value HUD on the left third. Text overlay: "HALO SENS".

**26. `hunt-showdown-sensitivity-converter-guide.webp`**
> A misty bayou at dusk, lantern-lit, a long-barrel rifle silhouette on the right, a green sensitivity arc cutting through the fog on the left. Text overlay: "HUNT SENS".

**27. `overwatch-2-sensitivity-converter-guide.webp`**
> Bright futuristic payload corridor, a green conversion arrow with a numeric multiplier arcing from a generic FPS HUD into an OW-style one. Text overlay: "OW2 CONVERTED".

**28. `pubg-sensitivity-converter-guide.webp`**
> A scoped view vignette on the right two-thirds overlooking open terrain, with separate green ADS-multiplier readouts stacked on the left. Text overlay: "PUBG SENS".

**29. `rainbow-six-siege-sensitivity-converter.webp`**
> A breached reinforced wall with drone-cam framing, a green conversion HUD and sensitivity value glowing in the left third. Text overlay: "SIEGE SENS".

**30. `the-finals-sensitivity-settings-2026.webp`**
> A collapsing high-rise arena with debris frozen mid-fall, a glowing green crosshair steady in the chaos on the left third. Text overlay: "THE FINALS SENS".

**31. `valorant-to-apex-sensitivity-converter.webp`**
> Split frame: crisp tactical geometry on the left, rugged Apex-style outland terrain on the right, green conversion arrow with multiplier crossing the seam. Text overlay: "VALORANT TO APEX".

**32. `warzone-sensitivity-converter-guide.webp`**
> A wide urban warzone skyline at dusk, helicopter silhouette, green ADS and hip-fire sensitivity readouts stacked in the left third. Text overlay: "WARZONE SENS".

**33. `xdefiant-sensitivity-settings-converter-2026.webp`**
> A fast arcade-shooter corridor with motion-blurred neon signage, a sharp green reticle and sensitivity HUD anchored left. Text overlay: "XDEFIANT SENS".

**34. `minecraft-pvp-sensitivity-guide-2026.webp`**
> Voxel/blocky terrain rendered in a dark cinematic style with neon green edge lighting, a crosshair centred over a blocky arena, purple sky glow. Text overlay: "MC PVP SENS".

## Cluster E — Apex & Overwatch (4)

**35. `apex-legends-controller-vs-mouse-keyboard-2026.webp`**
> A controller on the left and a mouse-and-keyboard on the right, both rim-lit, a green aim-assist cone emanating from the controller versus a precise green flick arc from the mouse. Text overlay: "CONTROLLER VS MNK".

**36. `apex-legends-ranked-tier-list-2026-meta.webp`**
> A vertical S–D tier ladder glowing green on the left third, abstract legend silhouettes slotted into tiers, purple ambient on the right. Text overlay: "RANKED META".

**37. `best-apex-legends-sensitivity-settings-2026.webp`**
> An outlands ridge backdrop, a green sensitivity slider HUD on the left, separate ADS-per-scope multiplier chips floating in a column. Text overlay: "APEX SENS".

**38. `overwatch-2-best-sensitivity-settings-2026.webp`**
> Three abstract role glyphs (tank, damage, support) in a row, each with its own glowing green sensitivity readout beneath, bright futuristic corridor behind. Text overlay: "SENS BY ROLE".

## Cluster F — Aim Training & Improvement (9)

**39. `aim-guide-beginners-fps-2026.webp`**
> A simple glowing green target grid on the right two-thirds with a first clean hit marker, a beginner-friendly step-numbered path leading into it from the left. Text overlay: "START HERE".

**40. `aim-lab-kovaks-sensitivity-guide.webp`**
> A clean training-arena void with floating spherical targets, a green flick trail connecting three of them, performance HUD numbers in the corner. Text overlay: "TRAIN THE RIGHT SENS".

**41. `aim-training-routine-fps-games-2026.webp`**
> A weekly routine grid glowing green on the left third, target spheres and a warm-up timer ring on the right. Text overlay: "DAILY ROUTINE".

**42. `best-fps-games-to-improve-aim-2026.webp`**
> Several stylised game-window panels fanned across the frame like cards, each with a glowing green crosshair, one pulled forward and highlighted. Text overlay: "TRAIN IN GAME".

**43. `how-to-improve-reaction-time-fps-gaming.webp`**
> A millisecond stopwatch readout glowing green on the left, a stimulus flash and a neural-spark motif arcing to a trigger finger silhouette on the right. Text overlay: "MILLISECONDS".

**44. `low-sensitivity-vs-high-sensitivity-aim-better.webp`**
> One desk, two overlaid mouse-sweep arcs — a long wide low-sens arc and a tight short high-sens arc — rendered in green and purple. Text overlay: "LOW VS HIGH".

**45. `why-you-are-not-improving-at-aiming-sensitivity-plateau.webp`**
> A progress curve that rises then flattens into a long plateau, glowing green, with a purple break-point marker where it should climb again. Text overlay: "THE PLATEAU".

**46. `wrist-aiming-vs-arm-aiming-guide.webp`**
> Side-profile arm silhouette shown twice: a tight wrist-pivot arc in green on the left, a wide full-arm sweep arc in purple on the right. Text overlay: "WRIST VS ARM".

**47. `how-to-escape-elo-hell-valorant-cs2-2026.webp`**
> A rank ladder emerging upward out of a dark pit, the lower rungs dim red-purple and the upper rungs glowing green, a figure climbing. Text overlay: "CLIMB OUT".

## Cluster G — Settings, Setup & Mental (8)

**48. `best-fov-settings-valorant-cs2-apex-2026.webp`**
> The same corridor rendered three times at widening field-of-view, stacked or fanned, green FOV degree markers labelling each. Text overlay: "FIND YOUR FOV".

**49. `best-fortnite-sensitivity-settings-2026.webp`**
> A build-battle structure mid-construction, a green sensitivity HUD with separate build and edit multipliers on the left third. Text overlay: "FORTNITE SENS".

**50. `best-keyboard-keybinds-fps-games-2026.webp`**
> Top-down keyboard, most keys dark, the optimal FPS binds lit neon green with small floating action labels, purple underglow. Text overlay: "BIND SMARTER".

**51. `colorblind-mode-settings-valorant-cs2-2026.webp`**
> One game scene shown twice side by side — standard palette on the left, high-contrast colourblind-safe palette on the right — enemy outlines far clearer on the right. Text overlay: "SEE THEM CLEARLY".

**52. `dpi-for-monitor-resolution-1080p-1440p-4k.webp`**
> Three nested monitor frames (1080p, 1440p, 4K) receding into depth, each labelled with a glowing green DPI recommendation. Text overlay: "DPI BY RESOLUTION".

**53. `gaming-ergonomics-setup-guide-aim-posture.webp`**
> Side-profile of a seated player at a desk with green alignment guide lines marking elbow angle, wrist plane and monitor height. Text overlay: "AIM POSTURE".

**54. `how-to-boost-fps-valorant-cs2-low-end-pc-2026.webp`**
> A frame-rate counter climbing from a low red number to a high green one, GPU/CPU silhouettes with cooling glow behind, settings sliders dropping on the left. Text overlay: "MORE FPS".

**55. `how-to-stop-tilting-fps-games-mental-guide.webp`**
> A head silhouette in profile with a chaotic red-purple storm inside resolving into a calm ordered green geometric pattern toward the front. Text overlay: "STAY LEVEL".

---

## After you generate them

Drop all 55 `.webp` files into `public/blog/`, then run:

```bash
npm run build
```

`prebuild` runs `scripts/sync-blog-images.mjs`, which re-reads `public/blog/` and rewrites the `AVAILABLE` set in `src/utils/blogImageResolver.ts` automatically. That is the step that was previously done by hand and forgotten — it is why 50 correct images sat unused. You no longer need to touch that file.

To check coverage at any time without a full build:

```bash
node scripts/check-blog-images.mjs
```
