# Nanny.Services

A web app for a company that offers babysitting services. Users can browse a list of nannies, sort and filter it, read reviews from parents, send a request for a personal meeting and save their favorite nannies.


## Features

- **Home**: site title, company slogan and a call-to-action link to the Nannies page.
- **Nannies**: a list of nannies with alphabetical sorting (A to Z, Z to A), a price filter (below and above a threshold), popularity sorting (Popular, Not popular) and a Show all option. Three cards are shown at first, the rest is loaded with the **Load more** button via a separate database request.
- **Favorites**: a private page for authorized users with the nannies they have added, with its own filter and Load more.
- **Authentication** with Firebase: registration, login, logout and access to the current user data.
- **Nanny card**: key characteristics, and a **Read more** button that expands the card with parent reviews.
- **Make an appointment**: a modal with a meeting request form.
- **Favorites list**: the heart button adds and removes a nanny. Guests see a message that this feature is available only to authorized users. The state persists after a page reload (separately for each user).
- **Modals** close with the close button, a click on the backdrop or the Esc key.
- **Forms** (registration, login, appointment) use react-hook-form and yup, all fields are required.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) and [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/): Authentication and Realtime Database
- [TanStack Query](https://tanstack.com/query): data fetching and pagination (`useInfiniteQuery`)
- [react-hook-form](https://react-hook-form.com/) and [yup](https://github.com/jquense/yup): forms and validation
- CSS Modules
- localStorage: storing favorite nannies

## Design

[Figma](https://www.figma.com/design/o9bA5QCfxYNZUyGEJsBqiW/Nanny-Sevices--Copy-?node-id=31-1807)

## Requirements

1. Authentication with Firebase: registration, login, getting the current user data, logout.
2. Registration and login forms with minimal validation using react-hook-form and yup, all fields are required. The modal closes with the close button, a click on the backdrop and the Esc key.
3. A collection of nannies in the Realtime Database with the fields: name, avatar_url, birthday, experience, reviews, education, kids_age, price_per_hour, location, about, characters, rating.
4. A card with the nanny's characteristics, following the design.
5. The Nannies page renders 3 cards, the rest is loaded with the Load more button, which sends a request to the database.
6. Click on the heart button: a guest sees a modal saying that the feature is available only to authorized users; an authorized user adds the card to favorites (localStorage) and the button color changes.
7. The favorites state persists after a page reload.
8. A second click on the heart button removes the card from favorites and restores the initial button color.
9. The Read more button expands the card with detailed information and reviews.
10. The Make an appointment button opens a modal with a request form (react-hook-form and yup, all fields are required).
11. The modal closes with the close button, a click on the backdrop and the Esc key.
12. A private Favorites page styled like the Nannies page.
13. Routing based on the Next.js file system.

## Getting Started

1. Clone the repository and install dependencies:

```bash
   git clone https://github.com/FinJex/Nanny-Services.git
   cd Nanny-Services
   npm install
```

2. Create a `.env.local` file with your Firebase project settings:

```env
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
```

3. In the Firebase Console, enable Email/Password sign-in, import `babysitters.json` into the Realtime Database and set the rules:

```json
   {
     "rules": {
       "babysitters": {
         ".read": true,
         ".indexOn": ["name", "price_per_hour", "rating"]
       }
     }
   }
```

4. Start the development server:

```bash
   npm run dev
```

   The app will be available at `http://localhost:3000`.

## Scripts

- `npm run dev`: start the development server
- `npm run build`: create a production build
- `npm run start`: run the production build
- `npm run lint`: run the linter