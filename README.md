# Gold Project

Gold Project is a web app for tracking gold prices in Oman. It shows current gold prices, price history, and includes a calculator to help estimate gold value. It's built with **Angular 22** (standalone components + server-side rendering) and styled using **Tailwind CSS**. The interface is Arabic and right-to-left (RTL).

> The prices are **demo data** for learning purposes, not real market prices (a "بيانات تجريبية" badge is also shown in the header).

## Features

- Today's prices for 18K / 21K / 22K / 24K (reusable price-card component)
- Gold value calculator (karat + weight, with validation and an empty state)
- 30-day SVG polyline chart with karat switcher, highest / lowest / current price cards, and a previous-vs-current summary
- 30-day price history table (horizontal scroll on small screens)
- Sticky header with navigation links (also on mobile), "last update" info bar under the hero
- Light / dark mode toggle (saved in the browser; light is the default)
- Fully responsive, Arabic RTL

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

## Backend (ASP.NET Core Web API)

The prices now come from a REST API built with **ASP.NET Core (.NET 10)** in [`backend/GoldPriceTracker.Api`](backend/GoldPriceTracker.Api). It uses Controllers, keeps the demo prices in an in-memory list (no database) and has Swagger for testing. Angular loads every price from it through `HttpClient` (`src/app/services/gold.service.ts`); no prices are hard-coded in the UI.

### Backend prerequisites

- [.NET SDK 10](https://dotnet.microsoft.com/download) - check it with `dotnet --version`
- VS Code extension **C# Dev Kit** (optional, for editing)

### Run the API

```bash
cd backend/GoldPriceTracker.Api
dotnet run --launch-profile http
```

- API: `http://localhost:5142`
- Swagger UI (test the endpoints here): `http://localhost:5142/swagger`

### Run Angular with the API

1. Start the API as shown above (keep it running).
2. In a second terminal, from the project root: `npm install` then `ng serve`.
3. Open `http://localhost:4200`.

If the API runs on another address, change `API_BASE_URL` in `src/app/config/api.config.ts`.

### Endpoints

| Method | URL | Description | Status codes |
| --- | --- | --- | --- |
| GET | `/api/prices` | Prices of all karats (24, 22, 21, 18) | 200 |
| GET | `/api/prices/{karat}` | Price of one karat, e.g. `/api/prices/22` | 200, 404 if the karat does not exist |
| GET | `/api/prices?karat=21` | Same as above using a query parameter | 200, 404 |
| GET | `/api/prices/history` | 30 days of prices, oldest first | 200 |

Example response of `GET /api/prices/22`:

```json
{ "karat": 22, "pricePerGram": 49.310, "currency": "OMR" }
```

Example `404` response (`GET /api/prices/99`):

```json
{ "title": "Karat not found", "status": 404, "detail": "No price is available for karat 99. Available karats: 24, 22, 21, 18." }
```

### Backend structure

| Folder | Purpose |
| --- | --- |
| `Controllers/` | `PricesController` with the HTTP endpoints |
| `Models/` | `GoldPrice`, `GoldHistoryEntry` |
| `Services/` | `IGoldPriceService` and `InMemoryGoldPriceService` (the demo data) |
| `Program.cs` | Dependency injection, CORS for Angular (`localhost:4200` / `4000`), Swagger |

> The GitHub Pages workflow (`.github/workflows/pages.yml`) runs only when started manually, because the API is not hosted online. Run both projects locally as described above.

> The Angular SSR server (`src/server.ts`) renders each request on demand (it does not prerender at build time) so the API does not need to run while building.

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
| `config/` | App settings such as the API address (`api.config.ts`) |

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
