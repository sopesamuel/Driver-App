## Stack
This app uses React Native with Expo for the mobile frontend. Given the project's simplicity, I chose to use mock data rather than implement a backend.

## Features
The app covers the full driver workflow, including viewing available jobs and updating their status as accepted, picked up, and delivered using checkboxes.

https://github.com/user-attachments/assets/c335333d-d96d-42cb-be1b-795147072dc9

## Architecture

State management:
To solve for the purpose of state management I used Zustand instead of Context API or Redux because of its simplicity and because of some of its middleware features like Asyncstorage that allows local persistence without writing manual save/load logic.

Navigation:
The app uses a Stack navigator wrapping a Tab navigator.

Data persistence:
Job data is stored locally using AsyncStorage through Zustand's persist middleware. This ensures that job status updates remain available after refreshing or restarting the app, providing a more realistic user experience while using a temporary mock-data solution.

Screen structure: The three core screens are JobFeedScreen, MyJobsScreen, and JobDetailScreen. Each screen has a focused responsibility, keeping the application structure simple, maintainable, and easy to understand.

## Project structure
```
driver-app/
├── App.tsx                 # Entry point 
├── src/
│   ├── types/
│   │   └── index.ts         # type definitions
│   ├── data/
│   │   └── mockJobs.ts      # Hardcoded job data (stand-in for a backend)
│   ├── store/
│   │   ├── jobStore.ts      # Zustand store — shared state + AsyncStorage persistence
│   │   └── __tests__/
│   │       └── jobStore.test.ts
│   ├── navigation/
│   │   └── index.tsx        # Stack navigator wrapping a Tab navigator
│   ├── screens/
│   │   ├── JobFeedScreen.tsx
│   │   ├── MyJobsScreen.tsx
│   │   └── JobDetailScreen.tsx
│   └── theme/
│       └── index.ts         # Colors, spacing, fonts — shared design tokens
├── jest.setup.js            # Mocks AsyncStorage for tests
└── package.json
```
## How to run

Prerequisites: You’ll need Node.js and npm (or yarn) installed to run this project.

Setup: 
bashnpm install
npx expo start
Then scan the QR code with the Expo Go app (iOS/Android), or press w to run in the browser.
## Note: 
(local persistence (saved jobs surviving a restart) only works on iOS/Android — AsyncStorage isn't available in the browser, so accepted jobs will reset on refresh when running via w)

## Testing
A couple of unit tests cover the job store's core logic — accepting a job and updating status — because it ensures the state management behaves correctly and prevents regressions when changes are made.

## What I'd improve with more time:
I would work on building a proper backend and add additional frontend features. As the project evolves, I expect some technical decisions to change to better fit new requirements and scale.
