# 🎭 Playwright TypeScript Testing Demo

> A hands-on demo project showcasing end-to-end (E2E) test automation with
> [Playwright](https://playwright.dev/) and TypeScript, including integration with
> **Azure Playwright Testing** for scalable cloud-based browser execution.

![Playwright](https://img.shields.io/badge/Playwright-1.54.x-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?logo=python&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)
![Azure Playwright Testing](https://img.shields.io/badge/Azure%20Playwright%20Testing-enabled-0078D4?logo=microsoftazure&logoColor=white)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running Tests Locally](#running-tests-locally)
  - [TypeScript / Playwright Tests](#typescript--playwright-tests)
  - [Python Unit Tests](#python-unit-tests)
- [Azure Playwright Testing (Cloud)](#azure-playwright-testing-cloud)
- [Test Scenarios](#test-scenarios)
- [Configuration](#configuration)
- [Supporting Assets](#supporting-assets)
- [Azure AI Agents Workflow](#azure-ai-agents-workflow)
- [Contributing](#contributing)
- [License](#license)

---

## About

This repository is a **Playwright TypeScript demo** project designed to illustrate modern E2E
testing practices. It covers real-world test scenarios — from navigating public websites to
verifying dynamic UI content — and demonstrates how to run the same test suite both **locally**
(across Chromium, Firefox, and WebKit) and at scale in **Microsoft Azure Playwright Testing**
(cloud-hosted browsers with up to 80 parallel workers).

A lightweight **Python** component (`math.py` + `test_math.py`) is also included to demonstrate
pytest-based unit testing alongside the browser automation suite.

---

## Features

- ✅ **Cross-browser testing** — Chromium, Firefox, and WebKit out of the box
- ☁️ **Azure Playwright Testing** — cloud-hosted browser execution with parallel workers
- 🧪 **Diverse test scenarios** — navigation, ARIA snapshots, TodoMVC, movie ratings
- 📸 **Screenshot & trace capture** — automatic artefacts on retry; on-demand screenshots
- 🐍 **Python unit tests** — pytest suite for math utility functions
- 📊 **JSON test results** — `results.json` output via the service reporter
- 📓 **Jupyter Notebook** — `playwright_test_analysis.ipynb` for post-run analysis
- 🤖 **AI agent workflow** — `workflow.yaml` sequential Azure AI Agents pipeline

---

## Project Structure

```
playwrightdemo/
├── tests/                                        # Main Playwright test suite
│   ├── MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts   # Microsoft.com navigation & logo check
│   ├── VerifyMovie.spec.ts                       # Deadpool & Wolverine full detail + ARIA snapshot
│   ├── VerifyTodoApp.spec.ts                     # TodoMVC app smoke test
│   ├── demo-todo-app.spec.ts                     # Full TodoMVC test suite
│   ├── movie-ratings.spec.ts                     # Movie star-rating assertions
│   ├── test-1.spec.ts                            # TodoMVC new-item test
│   ├── test-2.spec.ts                            # Localhost Angular app smoke test
│   ├── fixedtest.spec.ts                         # Misc fixed regression test
│   └── DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts  # (exploratory placeholder)
├── e2e/
│   └── example.spec.ts                           # Playwright.dev title & navigation smoke test
├── tests-examples/
│   └── demo-todo-app.spec.ts                     # Reference TodoMVC examples from Playwright
├── math.py                                       # Python math utility (add, subtract, divide)
├── test_math.py                                  # pytest unit tests for math.py
├── playwright.config.ts                          # Local multi-browser config
├── playwright.service.config.ts                  # Azure Playwright Testing config
├── playwright_test_analysis.ipynb                # Jupyter notebook for result analysis
├── workflow.yaml                                 # Azure AI Agents sequential workflow
├── pricing.html / pricing.css                    # Static HTML/CSS pricing-page fixture
├── results.json                                  # Latest test-run JSON output
├── screenshots/                                  # Saved screenshots (e.g. microsoft-homepage.png)
└── package.json                                  # Node.js project manifest
```

---

## Getting Started

### Prerequisites

| Tool | Minimum version | Install guide |
|------|----------------|---------------|
| Node.js | 18 LTS | https://nodejs.org |
| npm | 9+ | bundled with Node.js |
| Python | 3.9+ | https://www.python.org (for Python tests) |
| pytest | latest | `pip install pytest` |

```bash
node --version   # v18.x or higher
npm --version    # 9.x or higher
python --version # 3.9.x or higher
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/davihern/playwrightdemo.git
   cd playwrightdemo
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Install Python dependencies** *(optional — only for Python tests)*
   ```bash
   pip install pytest
   ```

---

## Running Tests Locally

### TypeScript / Playwright Tests

All commands below use the default local configuration (`playwright.config.ts`) which targets
**Chromium**, **Firefox**, and **WebKit** in fully-parallel mode.

```bash
# Run the entire test suite
npx playwright test

# Run a specific test file
npx playwright test tests/MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts

# Run tests in a specific browser only
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run with trace enabled (saved on every test, useful for debugging)
npx playwright test --trace on

# Open the interactive HTML report after a run
npx playwright show-report

# Run tests in headed mode (watch the browser)
npx playwright test --headed

# Run the e2e smoke tests
npx playwright test e2e/
```

### Python Unit Tests

```bash
# Run all pytest tests
pytest test_math.py -v

# Run a specific test class
pytest test_math.py::TestAdd -v
pytest test_math.py::TestSubtract -v
pytest test_math.py::TestDivide -v

# Run with coverage (requires pytest-cov)
pip install pytest-cov
pytest test_math.py --cov=math --cov-report=term-missing
```

---

## Azure Playwright Testing (Cloud)

[Microsoft Azure Playwright Testing](https://aka.ms/mpt/docs) lets you run the same test suite
on **cloud-hosted browsers** with high parallelism. The service configuration is in
`playwright.service.config.ts`.

### Setup

1. Set the service endpoint environment variable:
   ```bash
   export PLAYWRIGHT_SERVICE_URL="wss://<region>.api.playwright.microsoft.com/accounts/<account-id>/browsers"
   ```

2. Authenticate (choose one method):
   ```bash
   # Option A — Azure CLI
   az login

   # Option B — Service Principal / Managed Identity (CI environments)
   # Set AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET
   ```

### Running on the Service

```bash
# Run all tests with 80 parallel workers (maximum throughput)
npx playwright test --config=playwright.service.config.ts --workers=80

# Run all tests with trace capture enabled
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on

# Run a specific test file via the service
npx playwright test tests/test-2.spec.ts --config=playwright.service.config.ts --workers=20 --trace on
```

**Service configuration highlights** (`playwright.service.config.ts`):

| Setting | Value |
|---------|-------|
| OS | Linux |
| Timeout | 30 000 ms |
| Cloud browsers | Enabled |
| Exposed network | `<loopback>` (for localhost testing) |
| Reporters | `list`, `@azure/microsoft-playwright-testing/reporter`, `json` → `results.json` |

---

## Test Scenarios

### 🌐 Microsoft.com Navigation
**File:** `tests/MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts`

Navigates to `https://www.microsoft.com`, asserts:
- Page title matches `/Microsoft/i`
- Microsoft logo link (`aria-label="Microsoft"`) is visible
- Full-page screenshot saved to `screenshots/microsoft-homepage.png`

---

### 🎬 Deadpool & Wolverine — Full Movie Details
**File:** `tests/VerifyMovie.spec.ts`

Opens the [Playwright Movies App](https://debs-obrien.github.io/playwright-movies-app), clicks
the Deadpool & Wolverine listing, and asserts:
- Duration label contains `128 min.`
- Full ARIA snapshot of the movie summary (title, tagline, rating, genres, synopsis, cast)
- Screenshot attached to the test report

---

### ✅ TodoMVC Smoke Test
**File:** `tests/VerifyTodoApp.spec.ts`

Quick verification of the [TodoMVC demo app](https://demo.playwright.dev/todomvc/):
- Creates a todo item (`Hello`)
- Marks it as complete
- Navigates to the **Completed** filter and asserts the item is visible

---

### 📝 TodoMVC Full Suite
**File:** `tests/demo-todo-app.spec.ts`

Comprehensive test suite (mirrored from the official Playwright template) covering item creation,
editing, deletion, filters, and persistence.

---

### ⭐ Movie Star Ratings
**File:** `tests/movie-ratings.spec.ts`

Navigates to the movies app homepage and validates the star-rating display for
*Deadpool & Wolverine* using multiple assertion strategies.

---

### �� Python Math Unit Tests
**File:** `test_math.py`

pytest suite covering `math.py` utility functions:

| Class | Tests |
|-------|-------|
| `TestAdd` | positive, negative, mixed, zero, floats, large numbers |
| `TestSubtract` | positive, negative, mixed, zero, floats, large, same |
| `TestDivide` | positive, negative, mixed, by-one, zero dividend, floats, fractions, divide-by-zero |

---

### 🔗 Additional Tests

| File | Description |
|------|-------------|
| `tests/test-1.spec.ts` | TodoMVC — add and verify a new item in Active filter |
| `tests/test-2.spec.ts` | Angular localhost app smoke test (`http://localhost:4200`) |
| `tests/fixedtest.spec.ts` | Regression baseline test |
| `e2e/example.spec.ts` | Playwright.dev title + "Get started" navigation check |

---

## Configuration

### `playwright.config.ts` — Local Config

| Option | Value |
|--------|-------|
| `testDir` | `./tests` |
| `fullyParallel` | `true` |
| `retries` | `2` on CI, `0` locally |
| `workers` | `1` on CI, auto locally |
| `reporter` | `html` |
| `trace` | `on-first-retry` |
| **Browsers** | Chromium, Firefox, WebKit |

### `playwright.service.config.ts` — Azure Service Config

Extends the local config and adds the Azure Playwright Testing service layer via
`getServiceConfig()`. Key overrides:

| Option | Value |
|--------|-------|
| `os` | `ServiceOS.LINUX` |
| `timeout` | `30 000 ms` |
| `exposeNetwork` | `<loopback>` |
| `useCloudHostedBrowsers` | `true` |
| `reporter` | list + Azure PT reporter + JSON |

---

## Supporting Assets

| File / Folder | Purpose |
|---------------|---------|
| `pricing.html` / `pricing.css` | Static mock pricing page for UI tests or demos |
| `aitour.jpg` | Conference / AI Tour banner image |
| `screenshots/` | Screenshots captured during test runs |
| `results.json` | JSON test results from the last Azure PT service run |
| `playwright_test_analysis.ipynb` | Jupyter notebook to parse and visualise `results.json` |

---

## Azure AI Agents Workflow

`workflow.yaml` defines a **sequential Azure AI Agents** pipeline (not GitHub Actions) with three
chained agents triggered on conversation start:

```
User message
    │
    ▼
IndraResearcher  →  IndraWriter  →  IndraReviewer
```

Each agent invokes the next in sequence, passing the latest message as input. This pipeline is
independent of the Playwright test suite and demonstrates how Azure AI Foundry Agent workflows
can be version-controlled alongside application code.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-new-test`
3. Add or update test files in `tests/`
4. Ensure all tests pass locally: `npx playwright test`
5. Commit your changes: `git commit -m 'feat: add my new test scenario'`
6. Push to your fork and open a Pull Request

---

## License

Distributed under the **ISC License**. See [`package.json`](package.json) for details.

---

<p align="center">
  Built with ❤️ using <a href="https://playwright.dev">Playwright</a> &amp;
  <a href="https://aka.ms/mpt/docs">Azure Playwright Testing</a>
</p>
