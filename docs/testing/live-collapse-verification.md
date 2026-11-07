# Live Collapse Verification Guide

This document provides a comprehensive overview of the repository structure and safe local verification commands for testing both applications without modifying application behavior.

## Repository Overview

This repository contains two distinct React applications demonstrating different complexity levels and React patterns:

### 1. Main Todoist Clone Application (Root Directory)

A production-ready task management application showcasing advanced React patterns with Firebase integration.

**Location**: `/` (root directory)

**Key Directories**:
```
.
├── src/
│   ├── components/          # React components
│   │   ├── layout/          # Header, Sidebar, Content
│   │   ├── AddTask.js       # Task creation with date picker
│   │   ├── AddProject.js    # Project creation modal
│   │   ├── Tasks.js         # Task list display
│   │   ├── Checkbox.js      # Task completion checkbox
│   │   ├── Projects.js      # Project list in sidebar
│   │   ├── IndividualProject.js  # Single project item
│   │   ├── ProjectOverlay.js     # Project selection overlay
│   │   └── TaskDate.js      # Date picker component
│   ├── __tests__/           # Test files (*.spec.js)
│   ├── context/             # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── helpers/             # Utility functions
│   ├── constants/           # App constants
│   ├── App.js               # Root component
│   ├── App.scss             # Global styles
│   └── firebase.js.example  # Firebase config template
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── .eslintrc.json           # ESLint configuration (Airbnb + Prettier)
├── .prettierrc.json         # Prettier configuration
└── yarn.lock                # Dependency lock file
```

**Tech Stack**:
- React 16.13.1 (Hooks, Context API)
- Firebase 7.15.2 (Firestore)
- SCSS (node-sass 4.14.1)
- Moment.js 2.27.0
- React Testing Library 10.3.0
- Jest (90% coverage threshold)

**Features**:
- Task management (create, complete, archive)
- Project organization
- Smart views (Inbox, Today, Next 7 Days)
- Dark mode toggle
- Date selection
- Real-time Firebase sync

### 2. Simple React App (`simple-app/` Directory)

A beginner-friendly application demonstrating fundamental React concepts without external dependencies.

**Location**: `/simple-app`

**Key Directories**:
```
simple-app/
├── src/
│   ├── components/
│   │   ├── Counter.js       # Interactive counter
│   │   ├── Counter.css
│   │   ├── TodoList.js      # Todo list with CRUD
│   │   ├── TodoList.css
│   │   ├── UserGreeting.js  # Time-based greeting
│   │   └── UserGreeting.css
│   ├── App.js               # Main container
│   ├── App.css
│   ├── index.js             # Entry point
│   └── index.css
├── public/
│   └── index.html
└── package.json             # Dependencies and scripts
```

**Tech Stack**:
- React 18.2.0 (Hooks)
- React Scripts 5.0.1
- PropTypes
- CSS3 (no preprocessor)

**Features**:
- User authentication (login/logout)
- Interactive counter
- Todo list with CRUD operations
- Input validation
- Responsive design

## Safe Local Verification Commands

These commands allow you to inspect and verify both applications without changing their behavior.

### Repository-Level Inspection

```bash
# View current git status
git status --short

# List all files in root directory
ls -la

# View main package.json
cat package.json

# View README
cat README.md

# Check ESLint configuration
cat .eslintrc.json

# Check Prettier configuration
cat .prettierrc.json

# View .gitignore rules
cat .gitignore

# View environment variables template
cat .env
```

### Main Todoist App Verification

#### Source Code Inspection

```bash
# List source directory structure
ls -la src/

# List all components
ls -la src/components/

# List layout components
ls -la src/components/layout/

# List test files
ls -la src/__tests__/

# View test coverage configuration
cat package.json | grep -A 15 '"jest"'

# View Firebase configuration template
cat src/firebase.js.example

# View main App component
cat src/App.js

# View constants
cat src/constants/index.js

# View hooks implementation
cat src/hooks/index.js

# View context providers
ls -la src/context/
```

#### Running Tests (Non-Destructive)

```bash
# Install dependencies (if not already installed)
npm install

# Run all tests in watch mode (default behavior)
npm test

# Run tests once without watch mode
CI=true npm test

# Run tests with coverage report
CI=true npm test -- --coverage

# Run specific test file
npm test -- AddTask.spec.js

# Run tests matching a pattern
npm test -- --testNamePattern="Header"
```

#### Build Verification

```bash
# Build production bundle (outputs to build/)
npm run build

# Check bundle size
ls -lh build/static/js/*.js
ls -lh build/static/css/*.css

# Start development server (localhost:3000)
npm start
```

#### Code Quality Checks

```bash
# Run ESLint on all source files
npx eslint src/**/*.js

# Run ESLint with auto-fix (safe)
npx eslint src/**/*.js --fix

# Check Prettier formatting
npx prettier --check "src/**/*.js"

# Format code with Prettier
npx prettier --write "src/**/*.js"
```

#### Dependency Inspection

```bash
# List all dependencies
npm list --depth=0

# Check for outdated packages
npm outdated

# Audit for security vulnerabilities
npm audit

# View specific package details
npm view react version
npm view firebase version
```

### Simple React App Verification

All commands should be run from the `simple-app/` directory:

```bash
cd simple-app
```

#### Source Code Inspection

```bash
# List source directory structure
ls -la src/

# List all components
ls -la src/components/

# View main App component
cat src/App.js

# View Counter component
cat src/components/Counter.js

# View TodoList component
cat src/components/TodoList.js

# View UserGreeting component
cat src/components/UserGreeting.js

# View package.json
cat package.json

# View README
cat README.md
```

#### Running Tests

```bash
# Install dependencies (if not already installed)
npm install

# Run tests (if test files exist)
npm test
```

#### Build Verification

```bash
# Build production bundle
npm run build

# Check bundle size
ls -lh build/static/js/*.js
ls -lh build/static/css/*.css

# Start development server (localhost:3000)
npm start
```

#### Dependency Inspection

```bash
# List all dependencies
npm list --depth=0

# Check for outdated packages
npm outdated

# Audit for security vulnerabilities
npm audit
```

## Testing Strategy

### Main Todoist App Testing

The main application has comprehensive test coverage with a 90% threshold enforced across:
- Branches
- Functions
- Lines
- Statements

**Test Files Location**: `src/__tests__/`

**Coverage Exclusions**:
- `src/index.js` (entry point)
- `src/firebase.prod.js` (production config)
- `src/hooks/*.js` (custom hooks)
- `src/context/*.js` (context providers)

**Test Components**:
1. `App.spec.js` - Main app rendering
2. `Header.spec.js` - Header with dark mode
3. `Sidebar.spec.js` - Sidebar navigation
4. `Tasks.spec.js` - Task list display
5. `AddTask.spec.js` - Task creation flow
6. `AddProject.spec.js` - Project creation
7. `Checkbox.spec.js` - Task completion
8. `Projects.spec.js` - Project list
9. `IndividualProject.spec.js` - Project item
10. `ProjectOverlay.spec.js` - Project selector

**Running Specific Tests**:
```bash
# Run single test file
npm test -- AddTask.spec.js

# Run tests with coverage
CI=true npm test -- --coverage

# Run tests for specific component
npm test -- --testNamePattern="AddTask"

# Run tests in watch mode (development)
npm test
```

### Simple App Testing

The simple app currently does not include test files but follows testing-ready patterns:

**Testable Components**:
1. `Counter.js` - State management and events
2. `TodoList.js` - CRUD operations
3. `UserGreeting.js` - Conditional rendering
4. `App.js` - Authentication flow

**Future Test Implementation**:
```bash
cd simple-app

# Install testing libraries (when needed)
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Create test files following pattern:
# src/components/__tests__/Counter.test.js
# src/components/__tests__/TodoList.test.js
```

## Local Development Workflow

### Main Todoist App

```bash
# 1. Clone and install
npm install

# 2. Set up Firebase (optional for testing UI)
cp src/firebase.js.example src/firebase.js
# Edit src/firebase.js with your Firebase credentials

# 3. Start development server
npm start

# 4. Run tests in another terminal
npm test

# 5. Build for production
npm run build

# 6. Run linting
npx eslint src/**/*.js --fix

# 7. Format code
npx prettier --write "src/**/*.js"
```

### Simple React App

```bash
# 1. Navigate to simple-app
cd simple-app

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Build for production
npm run build
```

## Verification Checklist

Use this checklist to verify both applications work correctly:

### Main Todoist App
- [ ] `npm install` completes without errors
- [ ] `npm start` starts development server on port 3000
- [ ] `CI=true npm test` passes all tests
- [ ] `CI=true npm test -- --coverage` meets 90% threshold
- [ ] `npm run build` creates production bundle
- [ ] `npx eslint src/**/*.js` shows no errors
- [ ] Dark mode toggle works (pizza icon)
- [ ] Task creation works (without Firebase)
- [ ] Projects sidebar renders

### Simple React App
- [ ] `cd simple-app && npm install` completes
- [ ] `npm start` starts development server on port 3000
- [ ] Counter increment/decrement works
- [ ] Todo list add/delete works
- [ ] Login/logout validation works
- [ ] `npm run build` creates production bundle
- [ ] UI is responsive on mobile

## Common Issues and Solutions

### Main Todoist App

**Issue**: Tests fail due to missing Firebase configuration
**Solution**: Tests should mock Firebase. Check test files use mock implementations.

**Issue**: `npm start` fails to start
**Solution**: Check port 3000 is not in use. Try `PORT=3001 npm start`

**Issue**: ESLint errors on fresh checkout
**Solution**: Run `npx eslint src/**/*.js --fix` to auto-fix formatting

**Issue**: Node-sass build fails
**Solution**: May need to rebuild: `npm rebuild node-sass`

### Simple React App

**Issue**: Port 3000 already in use
**Solution**: Stop main app or use `PORT=3001 npm start`

**Issue**: Components don't render
**Solution**: Check browser console for JavaScript errors

## Firebase Setup (Optional for Main App)

The main Todoist app requires Firebase for full functionality, but can run without it for UI testing:

```bash
# 1. Copy example config
cp src/firebase.js.example src/firebase.js

# 2. Create Firebase project at https://console.firebase.google.com

# 3. Enable Firestore Database

# 4. Get config from Project Settings > General > Your Apps

# 5. Update src/firebase.js with your credentials:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

# 6. Create Firestore collections:
#    - tasks (with userId, task, date, projectId fields)
#    - projects (with userId, name fields)
```

## Performance Considerations

### Main Todoist App
- Production build uses code splitting
- React Context providers for state management
- Firebase real-time listeners (can be optimized)
- SCSS compiled to CSS in build

### Simple React App
- Minimal dependencies (React only)
- No state persistence (data lost on refresh)
- CSS-only styling (no preprocessor)
- Suitable for learning, not production

## Architecture Patterns

### Main Todoist App
- **Context API**: Global state for projects and selected project
- **Custom Hooks**: `useTasks` and `useProjects` for data fetching
- **Component Composition**: Layout, feature, and UI components
- **SCSS Modules**: Component-scoped styling
- **Firebase Integration**: Real-time Firestore subscriptions

### Simple React App
- **Functional Components**: All components use function syntax
- **useState Hook**: Local state management only
- **Props**: Parent-to-child data flow
- **Event Handlers**: User interaction handling
- **CSS Classes**: Traditional CSS styling

## Git Workflow Verification

```bash
# Check current branch
git branch

# View recent commits
git log --oneline -10

# Check for uncommitted changes
git status

# View file differences
git diff

# View staged differences
git diff --staged

# Check remote status
git remote -v

# View commit history for specific file
git log --follow -- src/App.js
```

## Additional Resources

### Main Todoist App
- **Firebase Docs**: https://firebase.google.com/docs/firestore
- **React Context**: https://react.dev/reference/react/useContext
- **React Testing Library**: https://testing-library.com/react
- **Moment.js**: https://momentjs.com/

### Simple React App
- **React Docs**: https://react.dev/
- **React Hooks**: https://react.dev/reference/react/hooks
- **PropTypes**: https://react.dev/reference/react/Component#static-proptypes

## Security Notes

- Never commit `src/firebase.js` with real credentials
- `.gitignore` excludes sensitive files
- `.env` should not contain production secrets
- Audit dependencies regularly with `npm audit`
- Keep React and dependencies updated for security patches

## Conclusion

This guide provides comprehensive verification commands for both applications in this repository. All commands are read-only or create temporary output (tests, builds) that don't modify source code behavior. Use these commands to verify changes, inspect the codebase, and ensure both applications work correctly before deployment.
