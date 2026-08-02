# Civics

A practice app for the **2025 USCIS naturalization civics test**. One HTML file, no build step, no dependencies, no backend, no accounts. Everything you do stays in your browser's local storage.

**Live:** https://davidlundberg.github.io/civics/

## Which test this is

USCIS changed the civics test on **October 20, 2025**. Applications filed on or after that date take the 2025 test: **128 questions, 20 asked aloud, 12 correct to pass** (nine wrong ends it). Applications filed before then take the older 2008 test — 100 questions, 10 asked, 6 to pass. This app covers the current one.

All 128 questions and their accepted answers are transcribed verbatim from the official USCIS study document **M-1778 (09/25)**.

## Three modes

**Drill** — multiple choice, three lives, a 20-second clock, streaks and XP. Built for a spare five minutes.

**Exam** — the real format. The question appears alone, you answer out loud, then reveal the accepted answers and grade yourself. It stops exactly where a real interview stops: at 12 correct or 9 wrong. It is deliberately *not* multiple choice — recognising an answer in a list is far easier than recalling it, so a multiple-choice score would tell you that you'd pass when you might not.

**Study** — all 128 by category, with a mastery dot per question and a ★ on the twenty questions that make up the 65/20 short-form test.

## How it decides what to ask

Each question sits in a Leitner box from 0 to 5. A correct answer moves it up one; a wrong answer drops it to 0. Questions are drawn with weight `6 − box`, so something you keep missing comes back six times as often as something you've mastered. A question counts as mastered at box 4, and **decays one box after 30 days untouched** — so the mastery ring can go down. A number that only ever climbs isn't measuring anything.

## The story cards

42 of the 128 questions carry a short piece of history, shown only *after* you answer so it can never work as a hint. They cover the questions where the real story is more interesting than the official answer — why every state gets two senators, why the flag briefly had fifteen stripes, what actually happened to voting rights after 1870.

## Answers that go stale

Seven answers depend on who currently holds office or on where you live:

| | |
|---|---|
| Built in, verified against USCIS on **2026-08-02** | President, Vice President, Speaker of the House, Chief Justice |
| Set your own in **Settings** | Your U.S. senators, your U.S. representative, your governor, your state capital |

These change with elections and appointments. The app shows the date it was last verified rather than pretending its answer is permanent. **Before any of this matters officially, check [uscis.gov/citizenship/testupdates](https://www.uscis.gov/citizenship/find-study-materials-and-resources/check-for-test-updates).**

## Running it

Open `index.html` in any browser, or visit the live URL. On iPhone: open the link in Safari, then Share → **Add to Home Screen**. It works offline once installed.

## Tests

31 self-tests run on every page load — question-bank integrity, story integrity, Leitner transitions, exam stopping rules, and two checks that keep the multiple-choice distractors honest (no hand-written wrong answer may collide with an accepted one, and no borrowed wrong answer may cross answer types). Open the browser console, or read `window.civicsTests`.

## Disclaimer

Not affiliated with, endorsed by, or connected to USCIS or any government agency. This is a study aid, not legal or immigration advice. The question text is U.S. government work in the public domain; the story cards and the app are not.
