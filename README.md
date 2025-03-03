This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Project Plan

IS 542 Semester Project
For your final project, you will build a fully functional single-page web application using
TypeScript and React that interacts with at least one web API. This project should
showcase your understanding of TypeScript, React components, state management,
hooks, and API integration. If you want to create a custom API to interact with, that’s fine,
but I will only evaluate your work on the front end for the purposes of IS 542. Focus on
creating a great UI/UX for this project.
Requirements
1. Core Technologies
- TypeScript: Your project must be fully written in TypeScript, with proper types,
interfaces, and strict type checking.
- React: Use React (functional components with hooks) to build your UI.
- API Interaction: Your app must fetch data from at least one web API (e.g., OpenWeather, NASA, Spotify, GitHub, etc.).
  - https://www.artic.edu
1. Application Functionality
- User Interaction: The app must have a meaningful user interaction aspect to it.
- State Management: Use React state management effectively (e.g., useState, useReducer, etc.).
- Error Handling: Implement proper error handling for API requests (e.g., loading states, error messages, retries if necessary).
  - Error boundary
- Routing: There should be some form of navigation using a router.
1. Code Quality & Best Practices
- Project Structure: Organize your code into meaningful components, hooks, and utility files.
- Type Safety: Use TypeScript features properly (e.g., interfaces, types, generics).
- Code Readability: Your code should be well-structured, with meaningful variable and function names, and proper comments where necessary.
- Responsive Design: Ensure your app is usable on both desktop and mobile devices.
1. Additional Enhancements (Optional but Encouraged)
- Custom Hooks: If applicable, create reusable custom hooks.
- Styling Frameworks: You may use Tailwind, Material UI, or Styled Components for styling.
  - Tailwind with shadcn components
- Persistent Data: If relevant, implement local storage or a database (Firebase, Supabase, etc.).
- Authentication: I recommend that you try to use an API that doesn’t need authentication. You have enough other things to work on. But if using an API that requires authentication, implement a login system (OAuth, Firebase Auth, etc.).
  - No authentication
- Third-Party Library: It would be nice if you integrated one or more third-party libraries into your project. (E.g. Google’s JavaScript Maps API is a third-party library.) Integrating libraries is a skill you will most definitely need as a professional web developer.
Project Submission
You will submit:
1. A GitHub repository with your full project code. (If you don’t want to publish your
code on GitHub, you can also send me a .zip of the project as long as you include
the .git folder as well.)
1. A README.md file explaining:
o Project description
o Instructions to run the project
o API(s) used and how data is handled
o Any additional features implemented
1. A deployed version of your project (on GitHub Pages, Vercel, Netlify, or another
hosting service).
Grading Criteria
Your project will be evaluated based on:
- Functionality (40%) – Does the app meet all the core requirements?
- Code Quality (25%) – Is the code well-structured, readable, and type-safe?
- User Experience (20%) – Is the UI intuitive and responsive?
- Creativity & Effort (15%) – How unique and polished is the final product?
Sample Project Ideas
1. Basketball Scoreboard
a. Simulate a standard basketball scoreboard display (like you might find at your high
school gym) and create a user interface for an operator to update points, fouls,
start/stop the clock, etc.
b. For the web API requirement, access one of the available sports APIs to display
current scores or other news on a ticker on the scoreboard.
1. Weather Dashboard
a. Fetch real-time weather data from the OpenWeather API.
b. Allow users to search for cities and see current conditions, forecasts, and trends.
c. Provide different themes based on the weather (e.g., sunny, rainy, snowy).
1. Movie or TV Show Finder
a. Use the TMDb API to search for movies or TV shows.
b. Display movie details, ratings, trailers, and user reviews.
c. Allow users to create a favorites list stored in local storage.
1. GitHub Profile Explorer
a. Use the GitHub API to search for GitHub users.
b. Display profile info, repositories, followers, and contributions.
c. Include sorting and filtering options for repositories.
1. Space Image Explorer
a. Use the NASA API to display images from space missions.
b. Allow users to browse Astronomy Picture of the Day (APOD).
c. Implement a date picker to fetch past images and descriptions.
1. Recipe Finder
a. Use the Edamam or Spoonacular API to search for recipes by ingredients.
b. Provide nutrition information and cooking instructions.
c. Allow users to save favorite recipes locally.
1. Crypto Tracker
a. Fetch live cryptocurrency prices from the CoinGecko or CoinMarketCap API.
b. Allow users to track and compare prices of different coins.
c. Display historical price trends in a chart.
1. AI Chatbot
a. Integrate an AI chatbot using one of the commercially available APIs. (Alternatively,
you could run an LLM locally but be careful about writing too much back-end code.)
b. Provide a conversational interface for answering user queries. Customize
responses based on user interactions.
1. Language Translator
a. Use the Google Translate API or LibreTranslate API to translate text.
b. Allow users to enter text and select languages for translation.
c. Implement voice-to-text input and speech output.
* I don’t endorse any of the APIs mentioned here. You decide whether they’re suitable.