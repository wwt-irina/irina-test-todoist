# Contributing to Todoist Clone

Thank you for your interest in contributing to this React tutorial project! This is a Todoist clone built with React (Custom Hooks, Context), Firebase, and React Testing Library.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 12.x or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- **Firebase Account** - You'll need a Firebase project for the backend database
- **Git** for version control

## Local Setup

Follow these steps to get the project running on your local machine:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todoist
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you prefer yarn
   yarn install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Firestore Database in your Firebase project
   - Copy `src/firebase.js.example` to `src/firebase.js`:
     ```bash
     cp src/firebase.js.example src/firebase.js
     ```
   - Add your Firebase configuration values to `src/firebase.js`:
     - Go to Project Settings in Firebase Console
     - Copy your Firebase config object
     - Replace the empty strings in `src/firebase.js` with your actual values

4. **Start the development server**
   ```bash
   npm start
   ```
   The application will open in your browser at [http://localhost:3000](http://localhost:3000)

## Testing

This project uses React Testing Library and Jest for testing.

### Available Test Commands

- **Run tests in watch mode** (default):
  ```bash
  npm test
  ```

- **Build for production**:
  ```bash
  npm run build
  ```

### Test Coverage

The project has coverage thresholds configured at 90% for branches, functions, lines, and statements. Coverage excludes certain files like hooks and context providers.

## Limitations

- **Firebase Configuration Required**: The application requires a valid Firebase configuration to run. Without it, you'll encounter connection errors.
- **Tutorial Project Scope**: This is primarily an educational project demonstrating React patterns and Firebase integration.
- **No Authentication**: The current implementation doesn't include user authentication - all data is shared.
- **Missing Accessibility**: Accessibility features have not been fully implemented yet. Contributions in this area are highly encouraged!

## Troubleshooting

### Common Issues

**Problem**: Application won't start or shows Firebase errors
- **Solution**: Ensure you've correctly copied and configured `src/firebase.js` with your Firebase credentials
- Verify your Firebase project has Firestore enabled
- Check that all configuration fields are filled (apiKey, authDomain, projectId, etc.)

**Problem**: `npm install` fails or dependency conflicts
- **Solution**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- If using yarn, delete `yarn.lock` and run `yarn install`
- Ensure you're using a compatible Node.js version (12.x or higher)

**Problem**: Tests fail or won't run
- **Solution**: Make sure all dependencies are properly installed
- Check that you haven't modified test files unintentionally
- Run `npm test` to see detailed error messages

**Problem**: SCSS/styling issues
- **Solution**: The project uses node-sass; ensure it's properly installed
- Try rebuilding node-sass: `npm rebuild node-sass`

**Problem**: Changes not reflected in browser
- **Solution**: Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Restart the development server

## Code Style

This project uses:
- **ESLint** with Airbnb configuration
- **Prettier** for code formatting
- SCSS for styling

Please ensure your code follows the existing style guidelines. The project includes `.eslintrc.json` and `.prettierrc.json` configuration files.

## What We're Looking For

Contributions are highly encouraged! Some areas where you can help:

- **Accessibility improvements** - WCAG compliance, keyboard navigation, screen reader support
- **Bug fixes** - Report and fix issues you encounter
- **Documentation** - Improve or expand existing documentation
- **Tests** - Add test coverage for untested components
- **UI/UX enhancements** - Improve the user interface and experience

## Submitting Changes

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure nothing breaks (`npm test`)
5. Commit your changes with clear, descriptive commit messages
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request with a clear description of your changes

## Questions?

If you have questions or run into issues not covered here, feel free to open an issue on the repository!

Happy coding! 🚀
