# SATC: Heels Over Manhattan

A Flappy-style hypercasual game inspired by *Sex and the City*. Pick Carrie, Samantha,
Miranda or Charlotte and fly through the Manhattan skyline, collecting cupcakes (+1),
cosmos (+2) and Manolos (+3).

- **Play:** tap, click, Space or ↑ to flap. P pauses, M mutes.
- **Install:** open the site on your phone and use **Install on your phone** on the start
  screen (Android/Chrome), or in Safari tap Share → **Add to Home Screen** (iPhone).
  Once installed it runs full screen and works offline.
- **Quiz:** `quiz.html` — "Which Sex and the City girl are you today?"

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole game (no build step, no dependencies) |
| `quiz.html` | The personality quiz |
| `manifest.webmanifest`, `icons/` | App name and home-screen icons |
| `sw.js` | Service worker that caches the game for offline play |

## Hosting

It's a static site. With GitHub Pages: **Settings → Pages → Build and deployment →
Deploy from a branch**, pick the branch and `/ (root)`, then save. The game appears at
`https://<user>.github.io/satc/`.

To test locally: `python3 -m http.server` and open http://localhost:8000.
