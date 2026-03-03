# PMD Copy-Paste Detector (CPD) Usage Guide

## What is PMD CPD?

PMD's Copy-Paste Detector (CPD) is a tool that finds duplicated code in your codebase. It works by analyzing the structure of your code (tokens) rather than just text, making it more accurate at finding semantic duplications.

## Installation

### Option 1: Download Binary (Used in this analysis)

```bash
# Download PMD
cd /tmp
wget https://github.com/pmd/pmd/releases/download/pmd_releases%2F7.9.0/pmd-dist-7.9.0-bin.zip
unzip pmd-dist-7.9.0-bin.zip

# PMD will be available at /tmp/pmd-bin-7.9.0/bin/pmd
```

### Option 2: Using npm (Alternative)

```bash
npm install -g @pmd/cpd
```

## Basic Usage

### Analyze TypeScript Files

```bash
/tmp/pmd-bin-7.9.0/bin/pmd cpd \
  --minimum-tokens 50 \
  --language typescript \
  --dir . \
  --no-fail-on-error \
  --format text
```

### Analyze JavaScript Files

```bash
/tmp/pmd-bin-7.9.0/bin/pmd cpd \
  --minimum-tokens 50 \
  --language ecmascript \
  --dir . \
  --no-fail-on-error \
  --format text
```

## Command Line Options

| Option | Description | Example |
|--------|-------------|---------|
| `--minimum-tokens` | Minimum number of duplicate tokens to report | `--minimum-tokens 50` |
| `--language` | Programming language to analyze | `--language typescript` |
| `--dir` | Directory to scan | `--dir .` or `--dir src/` |
| `--no-fail-on-error` | Don't exit with error code on issues | `--no-fail-on-error` |
| `--format` | Output format | `--format text` (text, xml, csv) |
| `--exclude` | Exclude patterns | `--exclude "node_modules/**"` |

## Supported Languages

PMD CPD supports many languages including:
- TypeScript (`typescript`)
- JavaScript (`ecmascript`)
- Java (`java`)
- Python (`python`)
- C/C++ (`cpp`)
- C# (`cs`)
- Go (`go`)
- Kotlin (`kotlin`)
- Swift (`swift`)
- And many more...

## Understanding Token Counts

**What is a token?**
A token is a meaningful unit of code (keywords, identifiers, operators, etc.). For example:

```typescript
const foo = 42;
```

This line contains approximately 5 tokens: `const`, `foo`, `=`, `42`, `;`

**Recommended Token Thresholds:**
- **30-50 tokens**: Find most duplications, including small code blocks
- **50-100 tokens**: Balance between finding duplications and noise
- **100+ tokens**: Find only significant duplications

## Output Formats

### Text Format (Human-readable)

```bash
--format text
```

Example output:
```
Found a 5 line (74 tokens) duplication in the following files:
Starting at line 210 of /path/to/file1.ts
Starting at line 250 of /path/to/file2.ts

  [duplicate code snippet]
```

### XML Format (Machine-readable)

```bash
--format xml
```

Good for parsing and integration with CI/CD tools.

### CSV Format (Spreadsheet-friendly)

```bash
--format csv
```

Can be imported into Excel or Google Sheets for analysis.

## Integrating with CI/CD

### GitHub Actions Example

```yaml
name: Check for Duplicate Code

on: [push, pull_request]

jobs:
  cpd-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Download PMD
        run: |
          wget https://github.com/pmd/pmd/releases/download/pmd_releases%2F7.9.0/pmd-dist-7.9.0-bin.zip
          unzip pmd-dist-7.9.0-bin.zip
      
      - name: Run CPD
        run: |
          ./pmd-bin-7.9.0/bin/pmd cpd \
            --minimum-tokens 100 \
            --language typescript \
            --dir . \
            --format text
      
      - name: Upload Report
        uses: actions/upload-artifact@v2
        with:
          name: cpd-report
          path: cpd-report.txt
```

## Best Practices

1. **Start with higher token thresholds** (100+) to find major duplications first
2. **Gradually lower the threshold** to find smaller duplications
3. **Exclude generated code and dependencies** using `--exclude`
4. **Run regularly** as part of code review process
5. **Don't aim for zero duplications** - some duplication is acceptable and expected

## Common Exclusions

```bash
--exclude "node_modules/**" \
--exclude "dist/**" \
--exclude "build/**" \
--exclude "*.spec.ts" \      # If test duplications are acceptable
--exclude "**/__tests__/**"
```

## Interpreting Results

### What to Refactor

✅ **High Priority:**
- Complete file duplications
- Large code blocks (100+ tokens) used in multiple places
- Business logic duplications
- Complex algorithms duplicated

✅ **Medium Priority:**
- Test setup code duplications (consider fixtures)
- Utility function duplications (consider shared modules)
- Medium code blocks (50-100 tokens)

❌ **Low Priority / Acceptable:**
- Small code blocks (< 30 tokens)
- Boilerplate code
- Configuration patterns
- Test assertion patterns in comprehensive tests

## Troubleshooting

### Issue: "No duplications found" but I know they exist

**Solution:** Lower the `--minimum-tokens` threshold or check the language is correct.

### Issue: Too many false positives

**Solution:** Increase the `--minimum-tokens` threshold or add exclusions.

### Issue: Performance is slow

**Solution:** 
- Exclude large directories (node_modules, etc.)
- Run on specific directories only
- Increase token threshold

## Additional Resources

- [PMD Official Documentation](https://pmd.github.io/)
- [PMD CPD Documentation](https://pmd.github.io/latest/pmd_userdocs_cpd.html)
- [PMD GitHub Repository](https://github.com/pmd/pmd)

## Example: Quick Analysis Script

Create a file `check-duplicates.sh`:

```bash
#!/bin/bash

# Configuration
PMD_PATH="/tmp/pmd-bin-7.9.0/bin/pmd"
MIN_TOKENS=50
LANGUAGE="typescript"
OUTPUT_FILE="cpd-report.txt"

# Run CPD
$PMD_PATH cpd \
  --minimum-tokens $MIN_TOKENS \
  --language $LANGUAGE \
  --dir . \
  --no-fail-on-error \
  --format text \
  --exclude "node_modules/**" \
  --exclude "dist/**" > $OUTPUT_FILE

# Display summary
echo "CPD Analysis Complete!"
echo "Report saved to: $OUTPUT_FILE"
echo ""
echo "Summary:"
grep -c "Found a" $OUTPUT_FILE || echo "0"
echo "duplications found"
```

Make it executable:
```bash
chmod +x check-duplicates.sh
./check-duplicates.sh
```

---

**Last Updated:** 2026-02-03  
**PMD Version:** 7.9.0
