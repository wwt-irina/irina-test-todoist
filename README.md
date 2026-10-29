## Building Todoist from Scratch Using React (Custom Hooks, Context), Firebase & React Testing Library (http://bit.ly/CognitiveSurge)

This application (a Todoist clone) was built using create-react-app as a base, and the technologies used were React (Custom Hooks, Context), Firebase & React Testing Library. I'm hoping this gives people a better understanding of React, and I've also included SCSS in this tutorial, but the main focus is to build a real application using React! If you clone this application, click the Pizza icon on the top right, it enables dark mode!

Subscribe to my YouTube channel here: http://bit.ly/CognitiveSurge where I build projects like this! And don't forget, you can contribute to this project (highly encouraged!). One thing I didn't get time to do was incorporate accessibility into this application, so I'd love to see that added!

![Preview](todoist-preview.png?raw=true)

## What's Inside This Repo

This repository contains two distinct React applications:

### 1. **Main Todoist Clone Application** (Root Directory)

A fully-functional task management application that replicates core Todoist features, demonstrating professional React patterns and Firebase integration.

#### Features
- **Task Management**: Create, complete, and archive tasks
- **Project Organization**: Create custom projects to organize tasks
- **Smart Views**: 
  - Inbox (default tasks)
  - Today (tasks due today)
  - Next 7 Days (tasks due within a week)
- **Dark Mode**: Toggle dark/light theme with pizza icon
- **Date Selection**: Set due dates for tasks using moment.js
- **Real-time Sync**: Firebase Firestore for live data updates

#### Tech Stack
- **React 16.13.1**: Functional components with Hooks
- **Firebase 7.15.2**: Firestore for database and real-time sync
- **SCSS (node-sass)**: Modular styling with SASS
- **Moment.js**: Date manipulation and formatting
- **React Icons**: UI icons
- **PropTypes**: Runtime type checking

#### Architecture
```
src/
├── components/
│   ├── layout/           # Main layout components
│   │   ├── Header.js     # Top navigation with dark mode toggle
│   │   ├── Sidebar.js    # Project list and navigation
│   │   └── Content.js    # Main content area
│   ├── AddTask.js        # Task creation with date picker
│   ├── AddProject.js     # Project creation modal
│   ├── Tasks.js          # Task list display
│   ├── Checkbox.js       # Task completion checkbox
│   ├── Projects.js       # Project list in sidebar
│   ├── IndividualProject.js  # Single project item
│   ├── ProjectOverlay.js # Project selection overlay
│   └── TaskDate.js       # Date picker component
├── context/
│   ├── projects-context.js        # Global projects state
│   └── selected-project-context.js # Current project state
├── hooks/
│   └── index.js          # Custom hooks (useTasks, useProjects)
├── helpers/
│   └── index.js          # Utility functions
├── constants/
│   └── index.js          # App constants (collated tasks)
├── firebase.js.example   # Firebase configuration template
├── App.js                # Root component with providers
├── App.scss              # Global styles
└── index.js              # Entry point
```

#### React Patterns Demonstrated
1. **Context API**: Global state management for projects and selected project
2. **Custom Hooks**: `useTasks` and `useProjects` for Firebase data fetching
3. **Component Composition**: Layout components, feature components, and UI components
4. **Render Props Pattern**: Context consumers with hooks
5. **Controlled Components**: Form inputs with state management

#### Testing
- **React Testing Library**: Component testing with user-centric queries
- **Jest**: Test runner with coverage thresholds (90% minimum)
- **Test Coverage**: 
  - All components have corresponding spec files in `src/__tests__/`
  - Coverage excludes index.js, firebase config, hooks, and context files
  - Tests include: rendering, user interactions, dark mode, props validation

Test files:
```
src/__tests__/
├── App.spec.js
├── Header.spec.js
├── Sidebar.spec.js
├── Tasks.spec.js
├── AddTask.spec.js
├── AddProject.spec.js
├── Checkbox.spec.js
├── Projects.spec.js
├── IndividualProject.spec.js
└── ProjectOverlay.spec.js
```

#### Firebase Setup
1. Copy `src/firebase.js.example` to `src/firebase.js`
2. Add your Firebase project credentials
3. Create Firestore collections: `tasks` and `projects`
4. Update `userId` in hooks to match your Firebase user

#### Available Scripts
- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests with watch mode
- `npm eject` - Eject from Create React App (not recommended)

#### Code Quality Tools
- **ESLint**: Airbnb style guide with Prettier integration
- **Prettier**: Code formatting
- **Babel ESLint**: Modern JavaScript parsing
- **ESLint Plugins**: React, JSX a11y, React Hooks, Import rules

---

### 2. **Simple React App** (`simple-app/` Directory)

A beginner-friendly React application demonstrating fundamental concepts without external dependencies like Firebase. Perfect for learning React basics.

#### Features
- **User Authentication**: Simple login/logout with validation
- **Interactive Counter**: Increment, decrement, reset
- **Todo List**: Full CRUD operations with statistics
- **Input Validation**: Comprehensive form validation
- **Responsive Design**: Mobile-friendly layout
- **Modern UI**: Gradient-based design with animations

#### Tech Stack
- **React 18.2.0**: Latest React with Hooks
- **PropTypes**: Type checking
- **CSS3**: Modern styling with Flexbox/Grid
- **ES6+**: Modern JavaScript features

#### Components
```
simple-app/src/
├── components/
│   ├── Counter.js         # Counter with increment/decrement
│   ├── Counter.css
│   ├── TodoList.js        # Todo list with CRUD operations
│   ├── TodoList.css
│   ├── UserGreeting.js    # Time-based greeting
│   └── UserGreeting.css
├── App.js                 # Main container
├── App.css
├── index.js               # Entry point
└── index.css              # Global styles
```

#### React Concepts Covered
- `useState` hook for state management
- Event handling (forms, buttons, inputs)
- Conditional rendering
- Component composition
- Props and PropTypes
- Input validation
- Array manipulation (map, filter)

#### Getting Started
```bash
cd simple-app
npm install
npm start
```

See `simple-app/README.md` for detailed documentation.

---

## Project Structure Overview

```
.
├── src/                   # Main Todoist app source
├── simple-app/            # Beginner-friendly demo app
├── public/                # Static assets for main app
├── package.json           # Main app dependencies
├── .eslintrc.json         # ESLint configuration
├── .prettierrc.json       # Prettier configuration
├── firebase.js.example    # Firebase setup template
└── todoist-preview.png    # App screenshot
```

## Getting Started

### Main Todoist App
```bash
npm install
# Set up Firebase (see Firebase Setup above)
npm start
```

### Simple React App
```bash
cd simple-app
npm install
npm start
```

## Contributing

Contributions are highly encouraged! Areas for improvement:
- Accessibility features (ARIA labels, keyboard navigation)
- Additional tests
- Performance optimizations
- New features (task editing, priorities, labels)
- UI/UX enhancements

## License

See LICENSE.txt for details.
