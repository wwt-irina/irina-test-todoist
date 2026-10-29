# Testing Guide

This document provides comprehensive information about testing the Todoist clone application.

## Overview

The project uses:
- **Testing Framework**: Jest (via react-scripts)
- **Testing Library**: @testing-library/react v10.3.0
- **Test Location**: `src/__tests__/` directory
- **Coverage Requirements**: 90% branches, functions, lines, and statements

## Test Files

The test suite includes the following test files:
- `App.spec.js` - Tests the main App component with dark mode functionality
- `Header.spec.js` - Tests the header component including dark mode toggle and quick add task
- `Sidebar.spec.js` - Tests the sidebar navigation component
- `Tasks.spec.js` - Tests the tasks display component with project filtering
- `Checkbox.spec.js` - Tests the checkbox component
- `AddTask.spec.js` - Tests the add task functionality
- `AddProject.spec.js` - Tests the add project functionality
- `Projects.spec.js` - Tests the projects list component
- `ProjectOverlay.spec.js` - Tests the project overlay UI
- `IndividualProject.spec.js` - Tests individual project display

## Local Testing

### Non-Watch Mode (Recommended for CI/Smoke Tests)

```bash
# Run all tests once without watch mode
npm test -- --watchAll=false

# Run with custom timeout (e.g., 30 seconds per test)
npm test -- --watchAll=false --testTimeout=30000

# Run with coverage report
npm test -- --watchAll=false --coverage

# Run specific test file
npm test -- --watchAll=false App.spec.js
```

### Watch Mode (Default - For Development)

```bash
# Run tests in watch mode (default behavior)
npm test
```

**Note**: The default `npm test` script in package.json runs with `--watchAll` flag, which is designed for interactive development and will not exit automatically.

## CI/Deployment Testing

For CI pipelines and deployment smoke tests, always use non-watch mode:

```bash
npm test -- --watchAll=false --testTimeout=30000
```

This ensures:
- Tests run once and exit with appropriate exit code
- Longer timeout prevents flaky test failures in slower CI environments
- Pipeline can proceed or fail based on test results

## Legacy Dependencies & Caveats

### Known Installation Issues

⚠️ **CRITICAL**: This project uses legacy dependencies that may cause extended installation times or timeouts:

1. **react-scripts 3.4.1** - An older version of Create React App tooling
2. **node-sass 4.14.1** - Deprecated in favor of `sass` or `sass-embedded`
3. **React 16.13.1** - Not the latest version; uses legacy Context API patterns
4. **firebase 7.15.2** - Older Firebase SDK version

### Installation Warnings

During `npm install`, you will see numerous deprecation warnings for:
- `node-sass` (no longer supported)
- `babel-eslint` (replaced by `@babel/eslint-parser`)
- `eslint-loader` (replaced by `eslint-webpack-plugin`)
- `core-js@2.x` and `core-js@3.6.5` (outdated polyfill versions)
- Multiple deprecated `@babel/plugin-proposal-*` packages (merged into ECMAScript standard)
- `request` and related packages (deprecated HTTP library)
- Various deprecated internal dependencies

### Installation Timeout Issues

**Problem**: `npm install` may time out (5+ minutes) due to:
- Large dependency tree with 2000+ packages
- Deprecated packages with slow mirrors
- node-sass native compilation requirements
- Nested dependency resolution conflicts

**Workaround**: If installation times out:
1. The project may still be partially functional with incomplete dependencies
2. Test execution requires fully installed `react-scripts` binary
3. Consider running in environment with faster network and more resources
4. Alternative: Use `yarn install` which may have better caching

### Node.js Version Compatibility

This project was built with Node.js 12-14 era tooling. Recommended Node.js versions:
- **Minimum**: Node.js 10.x
- **Recommended**: Node.js 12.x or 14.x
- **May work**: Node.js 16.x (with warnings)
- **Not recommended**: Node.js 18+ (native dependencies may fail)

### Cannot Run Tests

If tests cannot run due to installation failures:
1. Verify `node_modules/.bin/react-scripts` exists
2. Check if `npm install` completed successfully (no timeout)
3. Try clearing cache: `npm cache clean --force`
4. Delete `node_modules` and `package-lock.json`, then retry installation
5. Consider using Docker with Node.js 14 for consistent environment

## Test Structure

Tests follow a consistent pattern:

```javascript
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ComponentName } from '../path/to/component';

// Mock external dependencies
jest.mock('../context', () => ({ /* mocks */ }));
jest.mock('../hooks', () => ({ /* mocks */ }));

beforeEach(cleanup);

describe('<ComponentName />', () => {
  it('test description', () => {
    const { queryByTestId } = render(<ComponentName />);
    expect(queryByTestId('test-id')).toBeTruthy();
  });
});
```

## Coverage Reports

After running tests with `--coverage` flag, view the coverage report:

```bash
# Generate coverage report
npm test -- --watchAll=false --coverage

# Open HTML coverage report (generated in coverage/index.html)
open coverage/index.html
```

Coverage thresholds are enforced at 90% for:
- Branch coverage
- Function coverage
- Line coverage
- Statement coverage

Excluded from coverage:
- `src/index.js`
- `src/firebase.prod.js`
- All files in `src/hooks/`
- All files in `src/context/`

## Troubleshooting

### Tests Won't Start
- Ensure all dependencies are installed: `npm install`
- Check Node.js version compatibility
- Clear Jest cache: `npm test -- --clearCache`

### Tests Timeout
- Increase timeout: `npm test -- --watchAll=false --testTimeout=60000`
- Check for infinite loops or unresolved promises in tests

### Module Not Found Errors
- Verify file paths in import statements
- Ensure Firebase configuration file exists (see firebase.js.example)
- Check that mocked modules match actual module structure

### Installation Never Completes
- This is a known issue with legacy dependencies
- Try alternative package manager: `yarn install`
- Consider containerized environment with guaranteed resources
- May require manual intervention or extended timeouts (10+ minutes)

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Create React App Testing](https://create-react-app.dev/docs/running-tests/)
