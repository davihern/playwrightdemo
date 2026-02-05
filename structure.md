--- IGNORE --- REPOSITORY OVERVIEW --- IGNORE ---
---
post_title: "Repository Overview"
author1: "davihern"
post_slug: "repository-overview"
microsoft_alias: "davihern"
featured_image: "https://example.com/featured-image.png"
categories: ["Documentation"]
tags: ["playwright", "testing", "repository-overview"]
ai_note: "Yes"
summary: "High-level explanation of the Playwright demo repository contents and how to run the included examples."
post_date: "2026-02-05"
---

## Purpose
This repository is a Playwright demo workspace that mixes web automation samples, exploratory tests, and a small Python math helper with accompanying tests.

## Key Contents
- `tests/`: Main Playwright specs covering movie ratings, Microsoft.com navigation, TODO app flows, and other exploratory scenarios that follow the repo's naming convention.
- `e2e/example.spec.ts` and `tests-examples/demo-todo-app.spec.ts`: Additional sample specs kept separate from the main suite.
- `playwright.config.ts`: Local Playwright configuration targeting chromium, firefox, and webkit with HTML reporting and trace capture on first retry.
- `playwright.service.config.ts`: Extends the base config to run against Azure-hosted browsers and emits list, service, and JSON reporters (outputs to `results.json`).
- `playwright-report/`, `test-results/`, `screenshots/`, and `results.json`: Generated artifacts from prior Playwright runs, including HTML reports, traces, and captured screenshots.
- `pricing.html` and `pricing.css`: Static landing-page example that references SVG assets stored in `images/`.
- `math.py` and `test_math.py`: Simple calculator helpers with pytest-based tests; pytest is not installed by default.
- `workflow.yaml`: Workflow definition for orchestrating chained Azure agents.
- `playwright_test_analysis.ipynb`: Notebook used for analyzing test behavior and results.
- `deadpool-wolverine-duration-test.spec.ts`, `microsoft-navigation.spec.ts`, and `browser-test.js`: Empty or placeholder spec files reserved for future scenarios.

## Running Checks
- Install Node dependencies: `npm ci`.
- Install Playwright browsers (required before running browser tests): `npx playwright install`.
- Run the Playwright suite locally: `npx playwright test --config=playwright.config.ts --workers=1`.
- Use the Playwright Testing service (cloud browsers) instead: `npx playwright test --config=playwright.service.config.ts --workers=20 --trace on`.
- Run Python checks for the math helpers: `pip install pytest` then `python -m pytest`.

## Current Test Status Notes
Playwright tests currently fail locally until browsers are installed (`npx playwright install`). Pytest is unavailable out of the box, so install it before running the Python suite.
