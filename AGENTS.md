# Playwright Demo Repository - AI Agent Instructions

## Repository Overview

This repository contains a comprehensive Playwright testing demonstration project that showcases modern web testing practices with TypeScript, Azure integration, and exploratory testing methodologies. The project is specifically configured for DOTNET CONF 2025 with custom testing patterns and conventions.

## Project Structure

```
/
├── tests/                          # Test specifications
├── playwright.config.ts            # Local Playwright configuration
├── playwright.service.config.ts    # Azure Microsoft Playwright Testing config
├── .github/                        # GitHub automation and AI instructions
│   ├── copilot-instructions.md     # TypeScript test file instructions
│   └── instructions/
│       └── readme.instructions.md  # Markdown file instructions
├── screenshots/                    # Test artifacts and documentation
└── package.json                   # Project dependencies
```

## Testing Framework and Configuration

### Core Technologies
- **Playwright**: End-to-end testing framework (v1.52.0+)
- **TypeScript**: Primary language for test development
- **Azure Microsoft Playwright Testing**: Cloud-hosted browser execution
- **Node.js**: Runtime environment

### Test Configurations
- **Local Testing**: Uses `playwright.config.ts` for development
- **Cloud Testing**: Uses `playwright.service.config.ts` for Azure integration
- **Browser Coverage**: Chromium, Firefox, WebKit
- **Parallel Execution**: Configurable workers (up to 80 for cloud)

## Testing Patterns and Conventions

### Naming Conventions
Test files and test cases should follow the pattern:
```
NAME__INPUT__EXPECTEDOUTPUT.spec.ts
```

Examples:
- `MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts`
- `TODOAPP__ADDITEM__ITEMADDED.spec.ts`

### Test Structure Requirements
All test files must include:
```typescript
// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025

/**
 * Description:
 * Brief description of the test purpose and scope
 */

import { test, expect } from '@playwright/test';

test.describe('Test Group Name', () => {
  test('TEST_NAME__INPUT__EXPECTEDOUTPUT', async ({ page }) => {
    // Test implementation
  });
});
```

### Documentation and Artifacts
- **Screenshots**: Capture full-page screenshots for documentation
- **Videos**: Automatic video recording for failed tests
- **Aria Snapshots**: Use `toMatchAriaSnapshot()` for accessibility testing
- **Test Attachments**: Attach screenshots to test results using `testInfo.attach()`

## Supported Test Types

### 1. Website Navigation Tests
- Verify page loads and basic functionality
- Check for presence of key UI elements
- Validate page titles and content

### 2. Application Testing
- TodoMVC application interactions
- Movie database browsing and details
- Form submissions and user workflows

### 3. Exploratory Testing
- Custom DOTNET CONF 2025 patterns
- Screenshot and video documentation
- Accessibility validation
- Cross-browser compatibility

### 4. Cloud Integration Tests
- Azure Microsoft Playwright Testing service
- Network exposure testing with `<loopback>`
- Scalable execution with cloud browsers

## Development Guidelines

### File Creation
When creating new test files:
1. Use the standardized naming convention
2. Include the DOTNET CONF 2025 header comment
3. Provide descriptive test documentation
4. Organize tests within `test.describe()` blocks
5. Capture screenshots for visual validation

### Test Data and URLs
Common test targets include:
- `https://demo.playwright.dev/todomvc/#/` - TodoMVC application
- `https://www.microsoft.com` - Microsoft homepage
- `https://debs-obrien.github.io/playwright-movies-app` - Movie database
- `http://localhost:4200/` - Local development server

### Azure Cloud Testing
For cloud execution, use:
```bash
export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/westeurope_acc3654d-81b9-47c1-a91b-4ebbed3764b1/browsers"
npx playwright test --config=playwright.service.config.ts --workers=80
```

## AI Assistant Context

### Language Preferences
- **Test Files**: English for code and comments
- **Documentation**: Spanish as specified in repository instructions
- **Comments**: Match existing code style and patterns

### Code Patterns
- Follow existing TypeScript conventions
- Use Playwright's modern API patterns
- Implement proper error handling and assertions
- Maintain consistency with existing test structure

### Testing Focus
- Prioritize exploratory testing approaches
- Document unexpected behaviors with screenshots
- Validate both functionality and accessibility
- Ensure cross-browser compatibility

## Integration Points

### GitHub Copilot Configuration
The repository includes specific instructions for AI assistants:
- TypeScript files: Follow exploratory testing patterns
- Markdown files: Use Spanish language
- Test naming: Use structured naming conventions

### Continuous Integration
Tests are designed to run in CI/CD pipelines with:
- Configurable retry strategies
- Parallel execution optimization
- Cloud browser provisioning
- Artifact collection and reporting

## Best Practices

### Test Maintenance
- Keep tests focused and atomic
- Use descriptive test names and descriptions
- Implement proper wait strategies
- Handle dynamic content appropriately

### Documentation
- Capture screenshots for visual regression
- Document test scenarios thoroughly
- Maintain clear test organization
- Update configurations as needed

### Performance
- Optimize for parallel execution
- Use cloud browsers for scalability
- Implement efficient test data management
- Monitor test execution metrics

## Getting Started

### Local Development
```bash
npm install
npx playwright install
npx playwright test
```

### Cloud Testing
```bash
npx playwright test --config=playwright.service.config.ts --workers=20
```

### Debug Mode
```bash
npx playwright test --debug
npx playwright test --trace on
```

This repository serves as a comprehensive example of modern Playwright testing practices with cloud integration and exploratory testing methodologies, specifically tailored for DOTNET CONF 2025 demonstrations.