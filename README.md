## Building Todoist from Scratch Using React (Custom Hooks, Context), Firebase & React Testing Library (http://bit.ly/CognitiveSurge)

This application (a Todoist clone) was built using create-react-app as a base, and the technologies used were React (Custom Hooks, Context), Firebase & React Testing Library. I'm hoping this gives people a better understanding of React, and I've also included SCSS in this tutorial, but the main focus is to build a real application using React! If you clone this application, click the Pizza icon on the top right, it enables dark mode!

Subscribe to my YouTube channel here: http://bit.ly/CognitiveSurge where I build projects like this! And don't forget, you can contribute to this project (highly encouraged!). One thing I didn't get time to do was incorporate accessibility into this application, so I'd love to see that added!

![Preview](todoist-preview.png?raw=true)

## Testing

This project includes a comprehensive test suite using Jest and React Testing Library. For detailed information about running tests, test structure, and handling legacy dependencies, see **[TESTING.md](TESTING.md)**.

**Quick Start:**
```bash
# Run tests in non-watch mode (recommended for CI/smoke tests)
npm test -- --watchAll=false --testTimeout=30000

# Run tests in watch mode (for development)
npm test
```

**Note:** This project uses legacy dependencies (react-scripts 3.4.1, node-sass 4.14.1) that may require extended installation times. See [TESTING.md](TESTING.md) for detailed dependency caveats and troubleshooting.
