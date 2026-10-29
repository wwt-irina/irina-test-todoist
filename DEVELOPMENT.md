# Development Guide

This guide provides detailed instructions for setting up and developing the Todoist clone application locally.

## Table of Contents
- [Local Setup](#local-setup)
- [Firebase Setup](#firebase-setup)
- [Available NPM Commands](#available-npm-commands)
- [Project Structure](#project-structure)
- [Limitations](#limitations)
- [Troubleshooting](#troubleshooting)

## Local Setup

Follow these numbered steps to get the project running on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/todoist.git
cd todoist
```

### 2. Install Dependencies
Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Configure Firebase
Copy the example Firebase configuration file:
```bash
cp src/firebase.js.example src/firebase.js
```

### 4. Add Your Firebase Credentials
Edit `src/firebase.js` and add your Firebase project credentials (see [Firebase Setup](#firebase-setup) below for details).

### 5. Start the Development Server
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Firebase Setup

This application uses Firebase Firestore as its backend database. Follow these steps to set up Firebase:

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "todoist-clone")
4. Follow the setup wizard (Google Analytics is optional)

### 2. Enable Firestore Database
1. In your Firebase project, navigate to **Firestore Database** in the left sidebar
2. Click **Create database**
3. Choose **Start in test mode** for development (configure security rules later)
4. Select a Cloud Firestore location close to your users

### 3. Get Your Firebase Configuration
1. In the Firebase Console, click the **gear icon** (⚙️) next to "Project Overview"
2. Select **Project settings**
3. Scroll down to "Your apps" section
4. Click the **</>** (Web) icon to add a web app
5. Register your app with a nickname (e.g., "Todoist Web App")
6. Copy the `firebaseConfig` object

### 4. Add Configuration to Your Project
Open `src/firebase.js` and replace the empty strings with your Firebase configuration:

```javascript
const firebaseConfig = firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
});
```

### 5. Set Up Firestore Collections
The application expects the following Firestore collections:
- `projects`: User projects/categories
- `tasks`: Individual tasks

These collections will be created automatically when you add your first project or task.

## Available NPM Commands

### Development Commands

#### `npm start`
Runs the app in development mode.
- Opens [http://localhost:3000](http://localhost:3000) in your browser
- The page will reload when you make changes
- You will see lint errors in the console

#### `npm test`
Launches the test runner in interactive watch mode.
- Watches all test files for changes
- Re-runs tests automatically when files are saved
- Displays test results and coverage information

#### `npm run build`
Builds the app for production to the `build` folder.
- Correctly bundles React in production mode
- Optimizes the build for best performance
- The build is minified and filenames include hashes
- Your app is ready to be deployed

#### `npm run eject`
**Note: This is a one-way operation. Once you eject, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will:
- Remove the single build dependency from your project
- Copy all configuration files and dependencies into your project
- Give you full control over configuration

⚠️ **Warning**: You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments.

### Testing & Quality

#### Running Tests with Coverage
```bash
npm test -- --coverage
```

This will show detailed coverage reports. The project requires:
- **90% coverage** for branches, functions, lines, and statements

#### Check Code Style
The project uses ESLint and Prettier. While there's no separate lint command in the scripts, linting is automatically applied during development and testing.

To manually check code:
```bash
npx eslint src/
```

To format code with Prettier:
```bash
npx prettier --write "src/**/*.{js,jsx,json,css,scss}"
```

## Project Structure

```
todoist/
├── public/               # Static files
│   ├── images/          # Image assets
│   └── index.html       # HTML template
├── src/
│   ├── __tests__/       # Test files
│   ├── components/      # React components
│   │   └── layout/      # Layout components (Header, Sidebar, Content)
│   ├── constants/       # Application constants
│   ├── context/         # React Context providers
│   ├── helpers/         # Helper functions
│   ├── hooks/           # Custom React hooks
│   ├── App.js           # Main application component
│   ├── App.scss         # Global styles
│   ├── index.js         # Application entry point
│   └── firebase.js      # Firebase configuration (create from .example)
├── .eslintrc.json       # ESLint configuration
├── .prettierrc.json     # Prettier configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project overview
```

### Key Technologies
- **React** 16.13.1 with Hooks
- **Firebase** 7.15.2 (Firestore)
- **React Testing Library** for testing
- **SCSS** for styling
- **Moment.js** for date handling
- **React Icons** for iconography

## Limitations

### Known Limitations
1. **No Authentication**: The application currently does not implement Firebase Authentication. All data is accessible to anyone with the Firebase configuration.

2. **Test Mode Firestore**: If using test mode security rules, your database is open to the public. Implement proper security rules for production.

3. **No User Management**: There's no concept of user accounts or user-specific data isolation.

4. **Limited Accessibility**: Accessibility features (ARIA labels, keyboard navigation, screen reader support) are not fully implemented.

5. **No Offline Support**: The application requires an internet connection to function. Firebase offline persistence is not enabled.

6. **Browser Compatibility**: Built for modern browsers. May not work on older browsers (IE11 and below).

7. **No Data Backup**: There's no built-in backup or export functionality for your data.

8. **Fixed Collections**: The Firestore collection structure is hardcoded and not configurable.

### Development Limitations
- **Coverage Exclusions**: Some files are excluded from test coverage requirements (hooks, context, firebase config)
- **Node SASS Version**: Uses node-sass 4.14.1 which may have compatibility issues with newer Node versions (consider migrating to dart-sass)
- **React Scripts Version**: Uses React Scripts 3.4.1 (not the latest version)

## Troubleshooting

### Common Issues and Solutions

#### Issue: `npm install` fails with node-sass errors
**Solution**: Node-sass has compatibility issues with newer Node versions.
- Use Node.js version 12.x or 14.x
- Or install/rebuild node-sass: `npm rebuild node-sass`
- Consider switching to dart-sass (sass) if issues persist

#### Issue: Firebase configuration not working
**Solution**:
- Verify you copied `firebase.js.example` to `firebase.js`
- Check that all Firebase config values are filled in correctly
- Ensure there are no quotes issues or syntax errors in the config
- Verify your Firebase project is active in the Firebase Console
- Check browser console for specific Firebase error messages

#### Issue: Firestore permission denied errors
**Solution**:
- Check your Firestore security rules in Firebase Console
- For development, ensure you're using test mode or permissive rules
- Example test mode rule:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if true;
      }
    }
  }
  ```

#### Issue: Tests are failing
**Solution**:
- Run `npm test` to see specific error messages
- Ensure all dependencies are installed: `npm install`
- Clear jest cache: `npm test -- --clearCache`
- Check that you haven't modified test files unintentionally

#### Issue: Dark mode toggle (Pizza icon) not working
**Solution**:
- Check browser console for JavaScript errors
- Verify the component state is updating correctly
- Check that SCSS variables for dark mode are properly defined

#### Issue: Application won't start or shows blank page
**Solution**:
- Check browser console for errors
- Verify `src/firebase.js` exists and is configured correctly
- Clear browser cache and restart dev server
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Check that port 3000 isn't already in use

#### Issue: Build fails with memory errors
**Solution**:
- Increase Node memory: `NODE_OPTIONS=--max_old_space_size=4096 npm run build`
- Close other applications to free up memory
- Try building on a machine with more RAM

#### Issue: ESLint or Prettier conflicts
**Solution**:
- The project uses both ESLint and Prettier with compatible configurations
- Run prettier first: `npx prettier --write "src/**/*.js"`
- Then check ESLint: `npx eslint src/`
- Configurations are already compatible in this project

#### Issue: Can't find module errors
**Solution**:
- Delete `node_modules` folder
- Delete `package-lock.json` or `yarn.lock`
- Run `npm install` again
- Restart your development server

### Getting More Help
If you encounter issues not covered here:
1. Check the [GitHub Issues](https://github.com/username/todoist/issues) page
2. Search for similar problems others have faced
3. Create a new issue with:
   - Your Node.js version (`node --version`)
   - Your npm version (`npm --version`)
   - Operating system
   - Complete error message
   - Steps to reproduce the issue

### Useful Debug Commands
```bash
# Check Node and npm versions
node --version
npm --version

# Clear npm cache
npm cache clean --force

# Verify Firebase CLI (if needed)
npm install -g firebase-tools
firebase --version

# Check for outdated packages
npm outdated

# View full dependency tree
npm ls
```

---

For contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).
