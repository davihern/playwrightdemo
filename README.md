--- IGNORE --- THIS IS A MARKDOWN FILE FOLLOWING ALL RULES DEFINED IN THE INSTRUCTIONS --- IGNORE ---

---
post_title: "Playwright Demo — E2E Tests with Azure Playwright Testing"
author1: "Development Team"
post_slug: "playwright-demo-azure-testing"
microsoft_alias: "playwrightdemo"
featured_image: "https://raw.githubusercontent.com/playwrightdemo/playwrightdemo/main/aitour.jpg"
categories: ["Testing", "Azure", "DevOps"]
tags: ["Playwright", "TypeScript", "Azure Playwright Testing", "E2E", "Automation"]
ai_note: "Yes"
summary: >
  End-to-end test demonstration project with Microsoft Playwright and Azure
  Playwright Testing service. Includes local and cloud execution, exploratory
  tests for .NET Conf 2025, integration with Microsoft.com, and support for
  multiple browsers.
post_date: "2025-07-10"
---

## Project Overview

This repository is an **end-to-end (E2E)** test suite built with
[Microsoft Playwright](https://playwright.dev/) and TypeScript. It is designed
to run both locally and on the cloud via
[Azure Playwright Testing](https://aka.ms/mpt/docs), which enables massive
parallel test execution and centralised reporting.

The project includes:

- Navigation and validation tests for public websites (Microsoft.com).
- Exploratory tests dedicated to **.NET Conf 2025**.
- Tests for demo applications (TodoMVC, movies app).
- Native integration with Azure Playwright Testing for large-scale parallel runs.
- Report generation in HTML and JSON formats.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Test Naming Convention](#test-naming-convention)
- [Running Tests](#running-tests)
  - [Local Execution](#local-execution)
  - [Azure Playwright Testing Execution](#azure-playwright-testing-execution)
- [Azure Playwright Testing Service](#azure-playwright-testing-service)
- [Exploratory Tests — .NET Conf 2025](#exploratory-tests--net-conf-2025)
- [Available Test Suite](#available-test-suite)
- [Configuration](#configuration)
- [Technologies](#technologies)

---

## Prerequisites

Make sure the following are installed before you start:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- Access to an **Azure Playwright Testing** account (for cloud execution)

```bash
node --version
npm --version
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/playwrightdemo/playwrightdemo.git
   cd playwrightdemo
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Install the browsers required by Playwright:

   ```bash
   npx playwright install
   ```

---

## Project Structure

```
playwrightdemo/
├── tests/                            # Main E2E test suite
│   ├── MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts
│   ├── DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts
│   ├── VerifyMovie.spec.ts
│   ├── VerifyTodoApp.spec.ts
│   ├── movie-exploratory-test.spec.ts
│   ├── movie-ratings.spec.ts
│   ├── w2m-exploratory-test.spec.ts
│   ├── fixedtest.spec.ts
│   ├── demo-todo-app.spec.ts
│   ├── test-1.spec.ts
│   └── test-2.spec.ts
├── tests-examples/                   # Playwright example tests
├── e2e/                              # Additional full-flow tests
├── screenshots/                      # Generated screenshots
├── playwright.config.ts              # Local Playwright configuration
├── playwright.service.config.ts      # Azure Playwright Testing configuration
├── package.json                      # Dependencies and project metadata
├── workflow.yaml                     # AI agent workflow definition
└── README.md                         # Project documentation
```

---

## Test Naming Convention

Primary test files follow the double-underscore convention:

```
SCENARIO__ACTION__EXPECTEDRESULT.spec.ts
```

**Examples:**

| File | Scenario | Action | Expected Result |
|---|---|---|---|
| `MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts` | Microsoft.com | Navigate | Success |
| `DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts` | .NET Conf 2025 | Explore | Functionality |

This convention makes it immediately clear what each test does without opening the file.

---

## Running Tests

### Local Execution

Run all tests locally using the standard configuration:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts
```

Open the HTML report after execution:

```bash
npx playwright show-report
```

Run tests in UI Mode:

```bash
npx playwright test --ui
```

### Azure Playwright Testing Execution

#### Step 1 — Set the service environment variable

Export the Azure Playwright Testing service URL before running:

```bash
export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/<your-account-id>/browsers"
```

#### Step 2 — Run all tests in parallel

Run the full suite with up to 80 parallel workers:

```bash
npx playwright test --config=playwright.service.config.ts --workers=80
```

#### Step 3 — Run with traces enabled

Enable trace capture for failure diagnostics:

```bash
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on
```

#### Step 4 — Run a local test against the service

Test a spec that targets `localhost` through the service:

```bash
npx playwright test tests/test-2.spec.ts \
  --config=playwright.service.config.ts \
  --workers=20 \
  --trace on
```

---

## Azure Playwright Testing Service

The project is integrated with
[Azure Playwright Testing](https://aka.ms/mpt/docs), Microsoft's managed
service for running Playwright tests in the cloud with high parallelisation.

### Service Details

| Parameter | Value |
|---|---|
| **Region** | West Europe |
| **Operating System** | Linux |
| **Timeout per test** | 30 000 ms |
| **Cloud-hosted browsers** | Enabled (`useCloudHostedBrowsers: true`) |
| **Exposed network** | `<loopback>` |

### Endpoint URL

```
wss://westeurope.api.playwright.microsoft.com/accounts/<your-account-id>/browsers
```

### Service Configuration (`playwright.service.config.ts`)

The `playwright.service.config.ts` file extends the local configuration and
automatically adds the following reporters:

- **`list`** — Line-by-line console output.
- **`@azure/microsoft-playwright-testing/reporter`** — Built-in report in the
  Azure Playwright Testing portal.
- **`json`** — Report saved to `results.json` for pipeline integration.

> 🔧 TODO: Configure Azure credentials (Service Principal or Managed Identity)
> in your CI/CD pipeline before running in production.

---

## Exploratory Tests — .NET Conf 2025

The file `tests/DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts` contains the
exploratory test suite designed specifically for
**[.NET Conf 2025](https://www.dotnetconf.net/)**.

### Goal

Verify and explore the functionality of the site and tools presented during
.NET Conf 2025, including navigation, content loading, and validation of key
UI elements.

### Applied Convention

```
DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts
│              │       │
│              │       └─ Expected result: FUNCTIONALITY (functionality verified)
│              └─────── Action:  EXPLORE (site exploration)
└──────────────────── Scenario: DOTNETCONF2025
```

### How to Run Only This Test

```bash
# Local execution
npx playwright test tests/DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts

# Azure Playwright Testing execution
export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/<your-account-id>/browsers"
npx playwright test tests/DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts \
  --config=playwright.service.config.ts \
  --workers=10 \
  --trace on
```

---

## Available Test Suite

The following tests are included in the `tests/` directory:

| File | Description |
|---|---|
| `MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts` | Verifies the loading of Microsoft.com, page title, and logo visibility. Captures a full-page screenshot. |
| `DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts` | Exploratory tests dedicated to .NET Conf 2025. |
| `VerifyMovie.spec.ts` | Validates *Deadpool & Wolverine* details in the demo movies app using `matchAriaSnapshot`. |
| `movie-ratings.spec.ts` | Verifies star ratings for movies in the demo app. |
| `movie-exploratory-test.spec.ts` | Exploratory test for the movies application. |
| `VerifyTodoApp.spec.ts` | Tests the basic flow of the TodoMVC application (add and complete tasks). |
| `demo-todo-app.spec.ts` | Full TodoMVC test suite covering multiple scenarios. |
| `test-1.spec.ts` | Basic item-creation test in TodoMVC. |
| `test-2.spec.ts` | Integration test against a local app running on `localhost:4200`. |
| `w2m-exploratory-test.spec.ts` | Additional exploratory test. |
| `fixedtest.spec.ts` | Movie ratings test with applied fixes. |

---

## Configuration

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PLAYWRIGHT_SERVICE_URL` | WebSocket URL for Azure Playwright Testing | `wss://westeurope.api.playwright.microsoft.com/...` |
| `CI` | Indicates whether the run is in a continuous integration environment | `true` |

### Local Configuration (`playwright.config.ts`)

| Parameter | Value |
|---|---|
| **Tests directory** | `./tests` |
| **Parallel execution** | Enabled (`fullyParallel: true`) |
| **Retries in CI** | 2 retries |
| **Workers in CI** | 1 (sequential) |
| **Reporter** | `html` |
| **Traces** | `on-first-retry` |
| **Browsers** | Chromium, Firefox, WebKit (Desktop) |

---

## Technologies

- **[Microsoft Playwright](https://playwright.dev/)** `^1.54.1` —
  Cross-platform E2E test automation framework.
- **[Azure Playwright Testing](https://aka.ms/mpt/docs)**
  `@azure/microsoft-playwright-testing ^1.0.0-beta.7` —
  Cloud service for parallel execution and centralised reporting.
- **[TypeScript](https://www.typescriptlang.org/)** with
  `@types/node ^22.15.3` — Static typing for more robust code.
- **[Node.js](https://nodejs.org/)** — JavaScript runtime environment.

---

## Contributing

1. Fork the repository.
2. Create a branch for your feature:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Make your changes and commit:

   ```bash
   git commit -m "feat: add new exploratory test"
   ```

4. Push your changes and open a Pull Request:

   ```bash
   git push origin feature/new-feature
   ```

---

## License

Distributed under the **ISC** license. See `package.json` for details.
