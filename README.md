# Gold Project

Gold Project is a web app for tracking gold prices in Oman. It shows current gold prices, price history, and includes a calculator to help estimate gold value. It's built with **Angular 22** (standalone components + server-side rendering) and styled using **Tailwind CSS**. The interface is Arabic and right-to-left (RTL).

> The prices are **demo data** for learning purposes, not real market prices.

## Prerequisites

Before you start, make sure you have the following installed:

- **[Node.js](https://nodejs.org/) `22.22.3` or newer** (or `24.15.0`+, or `26`+). This is a hard requirement of Angular 22: on an older Node the Angular CLI refuses to start. Check yours with `node -v`.
  - **Tested on `24.15.0` only.** Other supported versions should work but haven't been verified.
  - Angular 16 guides recommend Node 16/18; **those versions will not work with this project.**
- npm (comes with Node.js)
- Angular CLI — install it globally with:

  ```bash
  npm install -g @angular/cli
  ```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the project

```bash
ng serve
```

### 3. Open the app

Once the server is running, open your browser and go to:

```
http://localhost:4200
```

The app will automatically reload whenever you edit a source file.

## Building the Project

To build the app for production:

```bash
ng build
```

The compiled output will be placed in the `dist/` folder (browser files + the server).

### Running the production build (SSR)

```bash
npm run serve:ssr:gold-project
```

It listens on `http://localhost:4000` (change it with the `PORT` environment variable).

For safety, Angular's server only answers requests whose `Host` header is on an allow-list. `angular.json` (`security.allowedHosts`) allows `localhost` and `127.0.0.1`. **When you deploy to a real domain, add that domain there** and rebuild, otherwise every request returns `400`.

## Running the Tests

```bash
ng test
```

## Backend

The only server-side code is `src/server.ts`: an **Express** server that serves the built files and renders the Angular app on the server (SSR). There is no separate API or database; the prices come from `GoldService`, which reads the demo data in `src/app/data/gold-data.ts`.

To use a real API later, change only the two methods in `src/app/services/gold.service.ts` (for example to call `HttpClient`). No component needs to change.

## Creating a New Component

To generate a new component, run:

```bash
ng generate component component-name
```

This creates a new folder with the component's files inside `src/app/components`.

## Project Structure

Here's a quick overview of the main folders inside `src/app`:

| Folder | Purpose |
| --- | --- |
| `components/` | UI components (header, gold price card, calculator, chart, price history) |
| `services/` | Handles data fetching and business logic (e.g. `gold.service.ts`) |
| `models/` | TypeScript interfaces/types describing data shapes (e.g. `gold.model.ts`) |
| `data/` | Static or mock data used by the app (e.g. `gold-data.ts`) |

Other important files: `src/server.ts` (Express SSR server), `public/` (logo and favicon).

Each component folder typically contains an `.html` (template), `.css` (styles), `.ts` (logic), and `.spec.ts` (tests) file.

## Git Repository

https://github.com/meeraalmadilwi-glitch/Gold-Price-Tracker

## Troubleshooting

**`npm install` fails**

- Make sure you're using a supported Node.js version (see Prerequisites).
- Delete `node_modules` and `package-lock.json`, then run `npm install` again.

**`ng serve` says "The Angular CLI requires a minimum Node.js version"**

- Your Node.js is too old. Install Node `22.22.3` or newer and try again.

**`ng serve` doesn't start**

- Make sure Angular CLI is installed (`ng version` to check).
- Check that port `4200` isn't already in use by another process.
- Try restarting your terminal and running `ng serve` again.

**The production server answers `400 Bad Request`**

- The domain you are opening is not in `security.allowedHosts` inside `angular.json`. Add it and run `ng build` again.
