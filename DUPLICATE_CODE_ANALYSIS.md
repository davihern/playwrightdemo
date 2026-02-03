# PMD Duplicate Code Analysis Report

**Analysis Date:** 2026-02-03  
**Tool Used:** PMD Copy-Paste Detector (CPD) v7.9.0  
**Language:** TypeScript  
**Minimum Tokens Threshold:** 30 tokens  

## Executive Summary

PMD's Copy-Paste Detector has identified significant code duplication in the Playwright test repository. The analysis found **multiple instances of duplicate code** across test files, ranging from small snippets (30 tokens) to larger blocks (74+ tokens).

## Analysis Methodology

```bash
# PMD CPD Command Used
/tmp/pmd-bin-7.9.0/bin/pmd cpd \
  --minimum-tokens 30 \
  --language typescript \
  --dir . \
  --no-fail-on-error \
  --format text
```

## Key Findings

### 1. **CRITICAL: Complete File Duplication**

**Files Affected:**
- `/tests/demo-todo-app.spec.ts` (437 lines - COMMENTED OUT)
- `/tests-examples/demo-todo-app.spec.ts` (437 lines - ACTIVE)

**Issue:** The same test file exists in two locations. The version in `/tests/` is entirely commented out, while the version in `/tests-examples/` is active. This represents **100% duplication** of approximately 437 lines of code.

**Impact:** 
- Maintenance burden: Changes need to be made in two places
- Risk of inconsistency if one file is updated and the other is not
- Confusion about which version is canonical
- Unnecessarily increases repository size

**Recommendation:** 
- Remove the commented-out version in `/tests/demo-todo-app.spec.ts`
- OR uncomment it if needed
- Keep only one canonical version

### 2. **Moderate Duplications in demo-todo-app.spec.ts**

**Duplication #1:** (74 tokens, 5 lines)
```typescript
test('should save edits on blur', async ({ page }) => {
  const todoItems = page.getByTestId('todo-item');
  await todoItems.nth(1).dblclick();
  await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
  await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).dispatchEvent('blur');
```
- Lines 210 and 250 of `/tests-examples/demo-todo-app.spec.ts`
- This test logic appears twice within the same file

**Duplication #2:** (66 tokens, 12 lines)
```typescript
test('should allow me to mark items as complete', async ({ page }) => {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  // Create two items.
  for (const item of TODO_ITEMS.slice(0, 2)) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }

  // Check first item.
  const firstTodo = page.getByTestId('todo-item').nth(0);
```
- Lines 124 and 149 of `/tests-examples/demo-todo-app.spec.ts`
- Test setup code duplicated

### 3. **Test Setup Pattern Duplication (59 tokens)**

**Files Affected:**
- `/tests/fixedtest.spec.ts` (line 2)
- `/tests/movie-ratings.spec.ts` (line 1)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Movie Ratings Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the movies app before each test
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
    
    // Wait for the page to load
    await expect(page.locator('main')).toBeVisible();
  });

test('verify movie rating_MADEBYCOPILOT', async ({ page }) => {
```

**Impact:** Multiple test files use nearly identical setup code. This could be extracted into a shared test fixture or helper function.

### 4. **VerifyMovie.spec.ts Structural Duplications**

The file `/tests/VerifyMovie.spec.ts` contains numerous small duplications (30-62 tokens) of similar link assertion patterns. These appear to be part of a comprehensive snapshot test and are likely acceptable given the nature of the test (verifying a large list of movie cast members).

Examples:
- Actor link patterns repeated multiple times
- Genre link patterns repeated
- Navigation patterns repeated

**Note:** These are somewhat expected in snapshot/comprehensive verification tests and may not require refactoring.

### 5. **Helper Function Duplications (30 tokens)**

```typescript
async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['react-todos']).length === e;
```

Similar patterns found in helper functions within the same file (lines 421 and 427 of demo-todo-app.spec.ts).

## Summary Statistics

| Category | Count |
|----------|-------|
| **Total Duplications Found** | 100+ instances |
| **Files with Duplications** | 5+ files |
| **Largest Duplication** | 74 tokens (5 lines) |
| **Most Critical Issue** | Complete file duplication (437 lines) |
| **Files Requiring Attention** | 3 (demo-todo-app, fixedtest, movie-ratings) |

## Recommendations

### High Priority

1. **Resolve demo-todo-app.spec.ts duplication**
   - Decision needed: Keep tests/ or tests-examples/ version?
   - Remove or uncomment the appropriate version
   - This will eliminate ~437 lines of duplicate code

### Medium Priority

2. **Extract common test setup patterns**
   - Create shared fixtures for movie app navigation
   - Example: Create a `movieAppFixture.ts` with common setup
   ```typescript
   // fixtures/movieApp.ts
   export const movieAppFixture = {
     beforeEach: async ({ page }) => {
       await page.goto('https://debs-obrien.github.io/playwright-movies-app');
       await expect(page.locator('main')).toBeVisible();
     }
   };
   ```

3. **Refactor repeated test logic**
   - Extract common test patterns into helper functions
   - Create reusable test utilities for common operations

### Low Priority

4. **Review VerifyMovie.spec.ts duplications**
   - Consider if the snapshot test approach is optimal
   - Potentially acceptable as-is given the comprehensive nature of the test

## Tools and Artifacts

- **PMD Installation:** `/tmp/pmd-bin-7.9.0/`
- **Full CPD Report:** `/tmp/cpd-typescript.txt` (922 lines)
- **Major Duplicates Report:** Available for review

## Reproduction Instructions

To reproduce this analysis:

```bash
# Download PMD
cd /tmp
wget https://github.com/pmd/pmd/releases/download/pmd_releases%2F7.9.0/pmd-dist-7.9.0-bin.zip
unzip -q pmd-dist-7.9.0-bin.zip

# Run CPD Analysis
cd /home/runner/work/playwrightdemo/playwrightdemo
/tmp/pmd-bin-7.9.0/bin/pmd cpd \
  --minimum-tokens 30 \
  --language typescript \
  --dir . \
  --no-fail-on-error \
  --format text
```

## Next Steps

1. Review this report with the team
2. Make a decision on the demo-todo-app.spec.ts duplication
3. Prioritize refactoring based on maintenance impact
4. Consider establishing PMD CPD as part of CI/CD pipeline to prevent future duplications

---

**Report Generated By:** PMD Copy-Paste Detector  
**Repository:** davihern/playwrightdemo  
**Branch:** copilot/check-duplicate-code-pmd
