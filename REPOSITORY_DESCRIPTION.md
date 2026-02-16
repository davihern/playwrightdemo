# Repository Description: playwrightdemo

## Overview

This repository is a comprehensive demonstration and testing workspace for Playwright, a modern end-to-end testing framework. It showcases various testing patterns, configurations, and GitHub Copilot integrations for automated browser testing with TypeScript.

## Purpose

The repository serves multiple purposes:
- **Learning Resource**: Demonstrates Playwright testing best practices and patterns
- **Testing Playground**: Contains various test examples for different websites and applications
- **GitHub Copilot Integration**: Showcases custom chat modes, prompts, and instructions for AI-assisted development
- **Configuration Examples**: Provides configurations for both local and cloud-based testing with Microsoft Playwright Testing service

## Key Technologies

- **Playwright**: v1.54.1 - End-to-end testing framework
- **TypeScript**: For type-safe test development
- **Node.js**: Runtime environment
- **Azure Microsoft Playwright Testing**: Cloud-based testing service integration
- **Python**: Additional testing examples with pytest

## Directory Structure

### Root Level Files

#### Test Files
- **`tests/`** - Main test directory containing TypeScript test specifications
  - `demo-todo-app.spec.ts` - Comprehensive TODO MVC application tests (mostly commented out)
  - `VerifyMovie.spec.ts` - Movie details verification tests with screenshots
  - `movie-ratings.spec.ts` - Movie rating functionality tests
  - `VerifyTodoApp.spec.ts` - TODO application verification
  - `test-1.spec.ts`, `test-2.spec.ts` - Basic test examples
  - `fixedtest.spec.ts` - Fixed/corrected test examples
  - `MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts` - Microsoft.com navigation test
  - `DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts` - .NET Conf 2025 exploratory test (empty)
  - `movie-exploratory-test.spec.ts` - Movie app exploratory testing (empty)
  - `w2m-exploratory-test.spec.ts` - W2M exploratory testing (empty)

- **`e2e/`** - End-to-end test examples
  - `example.spec.ts` - Basic E2E test example

- **`tests-examples/`** - Additional test examples directory

#### Configuration Files
- **`playwright.config.ts`** - Main Playwright configuration
  - Test directory: `./tests`
  - Supports parallel execution
  - Configured for Chromium, Firefox, and WebKit browsers
  - HTML reporter enabled
  - Trace on first retry

- **`playwright.service.config.ts`** - Configuration for Azure Microsoft Playwright Testing service
  - Enables cloud-based testing with up to 80 workers
  - Connection string for West Europe region

- **`package.json`** - Node.js project configuration
  - Dependencies: @playwright/test, @azure/microsoft-playwright-testing, @types/node

#### Python Files
- **`math.py`** - Simple Python math module
- **`test_math.py`** - Python unit tests using pytest

#### Web Files
- **`pricing.html`** - HTML pricing page example
- **`pricing.css`** - Styling for pricing page
- **`browser-test.js`** - JavaScript browser test example

#### Other Root Files
- **`microsoft-navigation.spec.ts`** - Microsoft navigation test
- **`deadpool-wolverine-duration-test.spec.ts`** - Movie duration test
- **`workflow.yaml`** - GitHub Actions workflow configuration
- **`results.json`** - Test results storage
- **`playwright_test_analysis.ipynb`** - Jupyter notebook for test analysis
- **`screenshot.png`** - Sample screenshot output

### Documentation Files
- **`Readme.md`** - Main readme with service URL and test commands
- **`perfectreadme.md`** - Template for perfect readme structure
- **`structure.md`** - Workspace structure documentation

### `.github/` - GitHub Copilot Customizations

This directory contains extensive GitHub Copilot customizations for AI-assisted development:

#### **`chatmodes/`** - Custom Chat Modes
- `accesibility.chatmode.md` - Accessibility testing mode
- `CSharpExpertCodeSpaces.chatmode.md` - C# expert mode
- `MyPlaywrightMode.chatmode.md` - Custom Playwright testing mode
- Plus many more specialized modes for different technologies and purposes

#### **`prompts/`** - Custom Prompts
- `CreatePlayWright.prompt.md` - Prompt for creating Playwright tests
- `ExploratoryTesting.prompt.md` - Exploratory testing guidance
- `unittest.prompt.md` - Unit test generation prompt
- `CSharpBestPractice.prompt.md` - C# best practices
- `Figma.prompt.md` - Figma integration
- `CreateScript.prompt.md` - Script generation
- `my-issues.prompt.md` - Issue management
- `update-markdown-file-index.prompt.md` - Markdown file indexing
- `create-github-action-workflow-specification.prompt.md` - GitHub Actions workflow creation
- `CopilotSpaceAwesomeDoc.prompt.md` - Documentation generation

#### **`instructions/`** - Development Instructions
- `Playwrighttypescript.instructions.md` - Playwright TypeScript standards
- `terraform.instructions.md` - Terraform conventions
- `terraform-azure.instructions.md` - Azure Terraform best practices
- `markdown.instructions.md` - Markdown content rules

#### **`agents/`** - Custom Agents
- `MyPlaywrightMode2.agent.md` - Custom Playwright agent configuration

### Additional Directories
- **`images/`** - Image assets
- **`screenshots/`** - Test screenshot outputs
- **`.playwright-mcp/`** - Playwright MCP configuration
- **`.vscode/`** - VS Code workspace settings

## Test Execution Commands

Based on the Readme.md, the following commands are available:

### Service Testing (Azure)
```bash
# Set service URL
export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/westeurope_acc3654d-81b9-47c1-a91b-4ebbed3764b1/browsers"

# Run all tests with 80 workers
npx playwright test --config=playwright.service.config.ts --workers=80

# Run all tests with trace
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on

# Run localhost tests
npx playwright test tests/test-2.spec.ts --config=playwright.service.config.ts --workers=20 --trace on
```

### Local Testing
```bash
# Run all tests
npx playwright test

# Run specific test
npx playwright test tests/test-1.spec.ts
```

## Key Features

### 1. Multi-Browser Testing
- Chromium (Desktop Chrome)
- Firefox
- WebKit (Safari)

### 2. Cloud Testing Integration
- Azure Microsoft Playwright Testing service integration
- Scalable parallel execution (up to 80 workers)
- Distributed testing across cloud infrastructure

### 3. Test Organization
- Separate directories for different test types (tests, e2e, tests-examples)
- Naming convention following pattern: `SCENARIO__ACTION__EXPECTEDRESULT.spec.ts`
- Examples include movie app testing, TODO app testing, and navigation tests

### 4. Advanced Features
- Screenshot capture and attachment
- Trace recording for debugging
- Aria snapshot matching for accessibility
- Parallel test execution
- HTML reporting

### 5. GitHub Copilot Enhancement
- Extensive custom chat modes for specialized development scenarios
- Custom prompts for test creation and code generation
- Instructions for maintaining coding standards
- Custom agent configurations for automated workflows

### 6. Mixed Language Support
- TypeScript for Playwright tests
- Python for unit testing examples
- JavaScript for browser testing
- HTML/CSS for test targets

## Testing Targets

The repository includes tests for various applications:
- **Movie Database Application**: `https://debs-obrien.github.io/playwright-movies-app`
- **TODO MVC Demo**: `https://demo.playwright.dev/todomvc`
- **Microsoft.com**: Navigation and functionality tests
- **.NET Conf 2025**: Exploratory testing (in development)
- **Custom HTML pages**: Local pricing page

## Development Workflow

1. **Test Creation**: Use GitHub Copilot prompts to generate new tests
2. **Local Testing**: Run tests locally with `playwright.config.ts`
3. **Cloud Testing**: Scale tests using `playwright.service.config.ts`
4. **Analysis**: Review results with HTML reports and Jupyter notebooks
5. **Documentation**: Maintain markdown documentation following instructions

## Notable Test Patterns

### Exploratory Testing
- Named tests for .NET Conf 2025 exploration
- Movie app exploratory testing structure
- W2M exploratory test patterns

### Structured Testing
- Movie verification with visual assertions
- TODO app CRUD operations
- Navigation flow testing
- Duration and metadata verification

### Testing Best Practices
- Screenshot attachment for visual verification
- Aria snapshot matching for accessibility
- Descriptive test naming conventions
- Test data constants for maintainability

## Version Control

- **Git Ignore**: Configured to exclude:
  - `node_modules/`
  - `/test-results/`
  - `/playwright-report/`
  - `/blob-report/`
  - `/playwright/.cache/`

## Summary

This repository is a comprehensive Playwright testing workspace that demonstrates:
- Modern end-to-end testing practices
- Cloud-scale testing capabilities
- AI-assisted test development with GitHub Copilot
- Multi-language testing examples
- Extensive customization and configuration options

It serves as both a learning resource and a practical testing framework for web application testing across multiple browsers and environments.
