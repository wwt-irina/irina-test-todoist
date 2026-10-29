# Contributing to Todoist Clone

Thank you for your interest in contributing to this Todoist clone project! This application is built with React (Custom Hooks, Context), Firebase, and React Testing Library. Contributions are highly encouraged, especially in areas like accessibility which haven't been fully implemented yet.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 12.x or higher recommended)
- **npm** or **yarn** package manager
- **Git** for version control
- A **Firebase account** (for backend services)
- A code editor (VS Code, WebStorm, etc.)

## Contribution Workflow

1. **Fork the repository** on GitHub
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/todoist.git
   cd todoist
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/your-bug-fix
   ```
4. **Make your changes** following the code style guidelines below
5. **Test your changes** thoroughly (see DEVELOPMENT.md for testing commands)
6. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** on the main repository

## Code Style

This project uses ESLint and Prettier to maintain consistent code style. Please ensure your code adheres to these standards:

### ESLint Configuration
- **Extends**: Airbnb style guide with Prettier integration
- **Parser**: babel-eslint
- **Environment**: Browser, Node, Jest

### Key Style Rules
- **Quotes**: Single quotes for strings
- **Print Width**: 80 characters maximum
- **Trailing Commas**: ES5 style (objects, arrays)
- **Arrow Functions**: Use arrow body style as needed
- **JSX**: Allowed in `.js` and `.jsx` files
- **Prop Types**: Not required (turned off)
- **Console**: Allowed (console.log is permitted for debugging)

### SCSS Styling
- The project uses **SCSS** for styling
- Follow existing component structure for style organization
- Dark mode support is available via the Pizza icon toggle

### Running Linters
Before submitting your changes, run:
```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Auto-fix linting issues (if available)
```

Note: The project will automatically check your code style when you run tests.

## Testing Requirements

- All new features should include appropriate tests
- Bug fixes should include tests that verify the fix
- Run tests before submitting: `npm test`
- Ensure tests pass and coverage meets project thresholds (90% for branches, functions, lines, and statements)

### Test Coverage
The project has strict coverage requirements:
- Branches: 90%
- Functions: 90%
- Lines: 90%
- Statements: 90%

Excluded from coverage:
- `src/index.js`
- `src/firebase.prod.js`
- Files in `src/hooks/`
- Files in `src/context/`

## Submitting Changes

### Pull Request Guidelines
1. **Title**: Use a clear, descriptive title
2. **Description**: Explain what changes you made and why
3. **Reference Issues**: Link to any related issues using `#issue-number`
4. **Screenshots**: Include screenshots for UI changes
5. **Testing**: Describe how you tested your changes
6. **Breaking Changes**: Clearly note any breaking changes

### Pull Request Checklist
- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Tests added/updated for changes
- [ ] All tests pass locally
- [ ] No console errors or warnings
- [ ] Documentation updated (if applicable)
- [ ] Dark mode compatibility verified (if UI changes)

## Areas for Contribution

The project creator specifically mentioned these areas needing attention:

### High Priority
- **Accessibility (a11y)**: Add ARIA labels, keyboard navigation, screen reader support
- **Improved test coverage**: Expand test suites for edge cases
- **Performance optimizations**: React performance improvements

### Other Ideas
- Additional features from Todoist
- UI/UX improvements
- Mobile responsiveness enhancements
- Additional dark mode refinements
- Documentation improvements

## Code Review Process

1. Maintainers will review your PR
2. You may receive feedback or requests for changes
3. Make any requested changes and push to your branch
4. Once approved, a maintainer will merge your PR

## Getting Help

- Check the [DEVELOPMENT.md](DEVELOPMENT.md) file for setup and development guidance
- Review existing issues and PRs for similar questions
- Open an issue for bugs or feature discussions
- Check the project's README.md for general information

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉
