# Artisearch

## Description

Artisearch is a simple app to search for and find information about various artists and artworks. The features artworks are those in the Art Institute of Chicago.

## How to Run

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev` to start local development

## APIs used

The main API this app uses is the [Art Institute of Chicago's Public API](https://www.artic.edu/open-access/public-api). This includes getting artworks, searching for them, and getting artists. All artworks, artists, and their accompanying information are supplied by them.

## Extra Features

### Favorites

Ability to favorite artworks. Press the heart on any artwork to add it to your favorites! These are saved to your local browser. You can view them by clicking the "Favorites" tab.

### Animations

Nice animations throughout. This espeically includes [CSS View Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_view_transitions) in many places for the artworks.

### Theme Switching

Supports dark and light mode, as well as matching your system theme.

### Styling

This app uses [TailwindCSS](https://tailwindcss.com) classes and [ShadCN](https://ui.shadcn.com) components for styling

The app is deployed [here](https://artisearch.imalexblack.dev).
