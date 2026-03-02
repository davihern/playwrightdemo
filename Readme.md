# 🎭 Playwright TypeScript Test Automation Demo

A demonstration project for end-to-end test automation using **Playwright** and **TypeScript**, integrated
with **Azure Playwright Testing** for cloud-scale parallel test execution and enriched with
**GitHub Copilot** customizations for AI-assisted test authoring.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Test Naming Convention](#test-naming-convention)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests Locally](#running-tests-locally)
- [Running Tests on Azure Playwright Testing Service](#running-tests-on-azure-playwright-testing-service)
- [Configuration Reference](#configuration-reference)
- [Test Suite Summary](#test-suite-summary)
- [GitHub Copilot Customizations](#github-copilot-customizations)
- [Contributing](#contributing)

---

## Overview

This repository showcases how to build, run, and scale Playwright end-to-end tests with TypeScript.
It covers:

- Multi-browser local testing (Chromium, Firefox, WebKit)
- Cloud-hosted browser execution via **Azure Playwright Testing**
- Structured test naming for maximum readability
- AI-assisted test creation with **GitHub Copilot** chat modes, prompts, instructions, and custom agents

---

## Features

- **TypeScript** — full type safety for test code
- **Multi-browser** — Chromium, Firefox, and WebKit configured out of the box
- **Parallel execution** — `fullyParallel: true` locally; up to 80 workers on the Azure service
- **Traces & screenshots** — automatic trace capture on retry; screenshot attachment in tests
- **Azure Playwright Testing** — cloud-hosted browsers, rich reporting, and `results.json` output
- **Aria snapshot assertions** — accessibility-first locators in movie detail tests
- **GitHub Copilot customizations** — chat modes, reusable prompts, coding instructions, and
  custom agents to accelerate test authoring

---

## Project Structure

```text
playwrightdemo/
├── tests/                          # Main test suite (all *.spec.ts files here are run)
│   ├── MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts
│   ├── DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts
│   ├── VerifyMovie.spec.ts
│   ├── VerifyTodoApp.spec.ts
│   ├── demo-todo-app.spec.ts
│   ├── fixedtest.spec.ts
│   ├── movie-ratings.spec.ts
│   ├── movie-exploratory-test.spec.ts
│   ├── test-1.spec.ts
│   ├── test-2.spec.ts              # Requires local dev server on port 4200
│   └── w2m-exploratory-test.spec.ts
├── tests-examples/                 # Playwright scaffold example tests
├── .github/
│   ├── agents/                     # Custom Copilot agents
│   ├── chatmodes/                  # Copilot chat mode definitions
│   ├── instructions/               # Coding instructions for Copilot
│   ├── prompts/                    # Reusable Copilot prompt files
│   └── skills/                     # Copilot skill definitions
├── screenshots/                    # Test-captured screenshots
├── images/                         # Static image assets
├── playwright.config.ts            # Local test configuration
├── playwright.service.config.ts    # Azure Playwright Testing configuration
├── package.json                    # Node.js dependencies and metadata
├── results.json                    # JSON test results (generated on service runs)
├── pricing.html / pricing.css      # Sample HTML page (Figma-to-code demo)
├── math.py / test_math.py          # Python utility + unit tests (demo)
└── workflow.yaml                   # Azure AI Foundry multi-agent workflow
```

---

## Test Naming Convention

All spec files in `tests/` should follow this naming pattern:

```
SCENARIO__ACTION__EXPECTEDRESULT.spec.ts
```

- **SCENARIO** — the feature, page, or system under test (e.g., `MICROSOFTCOM`)
- **ACTION** — what the test does (e.g., `NAVIGATE`)
- **EXPECTEDRESULT** — the expected outcome (e.g., `SUCCESS`)
- Double underscores (`__`) are used as separators

**Examples:**

| File | Scenario | Action | Expected Result |
|---|---|---|---|
| `MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts` | Microsoft.com homepage | Navigate | Page loads successfully |
| `DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts` | .NET Conf 2025 site | Explore | Functionality verified |

Individual test names inside a spec file follow the same pattern:

```typescript
test('MICROSOFTCOM__NAVIGATE__SUCCESS', async ({ page }) => { ... });
```

---

## Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9
- Playwright browsers installed (see [Installation](#installation))
- For Azure Playwright Testing: an active Azure account and a Playwright Testing workspace

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-org>/playwrightdemo.git
cd playwrightdemo

# 2. Install Node.js dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

---

## Running Tests Locally

Use `playwright.config.ts` for all local runs. Tests in the `tests/` directory are executed
across Chromium, Firefox, and WebKit in full parallel mode.

```bash
# Run all tests (all browsers)
npx playwright test

# Run a specific spec file
npx playwright test tests/MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts

# Run with headed browsers (visible UI)
npx playwright test --headed

# Run with traces enabled
npx playwright test --trace on

# Open the HTML test report after a run
npx playwright show-report
```

> **Note:** `tests/test-2.spec.ts` targets `http://localhost:4200` and requires a local
> development server to be running before the test is executed.

---

## Running Tests on Azure Playwright Testing Service

`playwright.service.config.ts` extends the local config and connects to the
[Azure Playwright Testing](https://aka.ms/mpt/config) service for cloud-hosted parallel execution,
rich reporting, and trace storage.

### 1. Set Environment Variables

| Variable | Description |
|---|---|
| `PLAYWRIGHT_SERVICE_URL` | WebSocket endpoint for your Azure Playwright Testing workspace |
| `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` | Authentication token for the service |

```bash
export PLAYWRIGHT_SERVICE_URL="wss://<region>.api.playwright.microsoft.com/accounts/<account-id>/browsers"
export PLAYWRIGHT_SERVICE_ACCESS_TOKEN="<your-access-token>"
```

### 2. Run Tests Against the Service

```bash
# Run all tests with cloud browsers (80 parallel workers)
npx playwright test --config=playwright.service.config.ts --workers=80

# Run all tests with traces
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on

# Run a specific spec against the service
npx playwright test tests/test-2.spec.ts --config=playwright.service.config.ts --workers=20 --trace on
```

### Service Configuration Details

The service config (`playwright.service.config.ts`) applies these settings on top of the local config:

| Setting | Value | Description |
|---|---|---|
| `os` | `ServiceOS.LINUX` | Cloud browser OS |
| `timeout` | `30000` ms | Service-level timeout |
| `useCloudHostedBrowsers` | `true` | Use Azure-hosted browsers |
| `exposeNetwork` | `<loopback>` | Expose localhost to cloud browsers |
| Reporters | `list`, `@azure/microsoft-playwright-testing/reporter`, `json` | Console + service + JSON output |

---

## Configuration Reference

### `playwright.config.ts` (Local)

| Setting | Value | Notes |
|---|---|---|
| `testDir` | `./tests` | Test discovery root |
| `fullyParallel` | `true` | All tests run in parallel |
| `forbidOnly` | `true` on CI | Prevents accidental `test.only` |
| `retries` | `2` on CI, `0` locally | Auto-retry on CI |
| `workers` | `1` on CI, auto locally | Parallel workers |
| `reporter` | `html` | Generates `playwright-report/` |
| `trace` | `on-first-retry` | Trace captured on first retry |
| Browsers | Chromium, Firefox, WebKit | Desktop viewport, no mobile by default |

### Environment Variables

| Variable | Required For | Description |
|---|---|---|
| `CI` | CI/CD pipelines | Enables stricter CI settings (retries, single worker) |
| `PLAYWRIGHT_SERVICE_URL` | Azure service runs | WebSocket URL for Azure Playwright Testing |
| `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` | Azure service runs | Auth token for Azure Playwright Testing |

---

## Test Suite Summary

| File | Target URL | What It Tests |
|---|---|---|
| `MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts` | microsoft.com | Page title, Microsoft logo visibility, full-page screenshot |
| `DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts` | *(scaffolded)* | .NET Conf 2025 — exploratory test template |
| `VerifyMovie.spec.ts` | playwright-movies-app | Deadpool & Wolverine details, duration, cast, aria snapshot |
| `VerifyTodoApp.spec.ts` | demo.playwright.dev/todomvc | Add todo, mark complete, verify in Completed view |
| `demo-todo-app.spec.ts` | demo.playwright.dev/todomvc | Add todo item (additional patterns, mostly commented) |
| `fixedtest.spec.ts` | playwright-movies-app | Movie star-rating count (Copilot-generated) |
| `movie-ratings.spec.ts` | playwright-movies-app | Deadpool & Wolverine 5-star rating verification |
| `movie-exploratory-test.spec.ts` | *(scaffolded)* | Exploratory test template |
| `test-1.spec.ts` | demo.playwright.dev/todomvc | Add item, check Active/Completed filter |
| `test-2.spec.ts` | localhost:4200 | Local Angular/Java app greeting message |
| `w2m-exploratory-test.spec.ts` | *(scaffolded)* | Exploratory test template |

---

## GitHub Copilot Customizations

The `.github/` directory contains a full set of GitHub Copilot customizations to accelerate
test authoring and development:

### Chat Modes (`.github/chatmodes/`)

| File | Description |
|---|---|
| `MyPlaywrightMode.chatmode.md` | Playwright test specialist — explore, generate, fix, and document tests using Playwright MCP. Uses Claude Sonnet. |
| `accesibility.chatmode.md` | Accessibility-focused mode enforcing WCAG 2.1 guidelines; runs pa11y and axe-core on every change. |
| `CSharpExpertCodeSpaces.chatmode.md` | C# expert mode using GitHub MCP tools. |

### Instructions (`.github/instructions/`)

| File | Applies To | Description |
|---|---|---|
| `Playwrighttypescript.instructions.md` | Test files | Naming convention (`NAME__INPUT__EXPECTEDOUTPUT`), heading comment, description, structure, screenshots |
| `markdown.instructions.md` | `**/*.md` | Markdown formatting standards (headings, lists, code blocks, line length) |
| `terraform.instructions.md` | Terraform files | General Terraform best practices |
| `terraform-azure.instructions.md` | Terraform files | Azure-specific Terraform guidance |

### Prompts (`.github/prompts/`)

| File | Description |
|---|---|
| `CreatePlayWright.prompt.md` | Generate a Playwright test from a GitHub issue using `MyPlaywrightMode` |
| `ExploratoryTesting.prompt.md` | Execute exploratory testing via Playwright MCP and auto-generate a spec |
| `CreateScript.prompt.md` | Save previously executed MCP actions as a new dated spec file |
| `unittest.prompt.md` | Unit test authoring guidelines (XUnit for .NET, AAA pattern) |
| `Figma.prompt.md` | Convert a Figma design URL to responsive HTML/CSS |
| `create-github-action-workflow-specification.prompt.md` | Generate a specification for an existing workflow file |
| `my-issues.prompt.md` | List open GitHub issues assigned to the current user with prioritisation |
| `update-markdown-file-index.prompt.md` | Auto-update a markdown file with an index of files from a folder |
| `CSharpBestPractice.prompt.md` | C# best practices via Copilot Space MCP |

### Custom Agents (`.github/agents/`)

| File | Description |
|---|---|
| `MyPlaywrightMode2.agent.md` | Full-capability Playwright agent with GitHub MCP and Playwright MCP tool access |
| `readmewriter.agent.md` | README authoring agent — creates and updates README.md based on repo state |

### Skills (`.github/skills/`)

| Skill | Description |
|---|---|
| `azure-sql-best-practices` | Azure SQL best-practice rules: indexing, parameterisation, connection pooling, security |
| `image-manipulation-image-magick` | Image processing with ImageMagick — resize, convert, batch operations |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-new-test`
3. Follow the [test naming convention](#test-naming-convention)
4. Use the `MyPlaywrightMode` chat mode or `CreatePlayWright` prompt to generate tests
5. Commit with a clear message and open a Pull Request

---

## License

This project is for demonstration purposes. See repository settings for license details.