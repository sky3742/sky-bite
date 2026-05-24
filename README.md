# Sky Bite

A restaurant management dashboard built with Svelte 5, SvelteKit 2, TypeScript, and Tailwind CSS 4. Manage orders, menu items, categories, and track analytics — all powered by ApexCharts.

## Features

- **Dashboard** — Overview of orders, sales, and key metrics
- **Order Management** — Create, view, filter, and update orders with line-item status tracking
- **Menu Management** — CRUD for menu items and categories with active/inactive toggles
- **Analytics** — Visualize weekly/monthly sales, orders, category breakdowns, and top items via ApexCharts
- **Dark / Light Theme** — Toggleable with persisted preference
- **Mock Auth** — Simulated login gate powered by localStorage

## Tech Stack

| Layer     | Library                        |
| --------- | ------------------------------ |
| Framework | Svelte 5 (runes) + SvelteKit 2 |
| Language  | TypeScript 6                   |
| Styling   | Tailwind CSS 4                 |
| Charts    | ApexCharts                     |
| Mock Data | Faker.js                       |

## Getting Started

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) and sign in with any email/password (min 6 chars).

## Scripts

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `pnpm run dev`     | Start development server     |
| `pnpm run build`   | Build for production         |
| `pnpm run preview` | Preview production build     |
| `pnpm run check`   | Type-check with svelte-check |
| `pnpm run lint`    | Lint with Prettier + ESLint  |
| `pnpm run format`  | Format with Prettier         |

## License

MIT
