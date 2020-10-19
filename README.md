![CI/CD](https://github.com/omarnyte/reddit-pics-browser/workflows/CI/CD/badge.svg)
[![codecov](https://codecov.io/gh/omarnyte/reddit-pics-browser/branch/main/graph/badge.svg?token=G8VMLGBNHK)](undefined)

# Reddit r/Pics Browser

This single-page React web app allows for navigation of the r/pics subreddit. 

## Local Development

### Requirements
- [Node.js](https://nodejs.org/en/) v12.18.0 
- [NPM](https://www.npmjs.com/) 

### Setup 
1. Clone the repo 

2. Install dependencies

    `npm install`

3. Start the app on default port 3000

    `npm start`

### Testing
Tests are written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro). API calls are mocked using the [Mock Service Worker](https://github.com/mswjs/msw) library.

- To run tests in watch mode: 
        
  `npm test`

- To run tests in watch mode with coverage: 

  `npm test -- --coverage`

## CI/CD
This project uses Github Actions for CI/CD. The worfklow will:
- run all tests
- send coverage metrics to [Codecov](https://codecov.io/)
- build the app

## Contributing
1. Fork and clone the repo.
2. Follow the [setup](#setup) steps outlined above.
3. Make your changes, ensuring that code coverage remains at 100%.
4. Open a pull request documenting your changes. Please ensure that that GitHub Actions workflow suceeds. 

## Deployment
- Production: https://pics-browser.herokuapp.com/

This repo's `main` branch automatically deploys to Heroku after the GitHub Actions workflow succeeds. 
