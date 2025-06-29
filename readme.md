# StudySprint

StudySprint is a modern, production-ready study companion app that helps students plan daily study tasks, track streaks, and visualize progress with beautiful dashboards and motivational features.

**Live Demo:** [https://boltnewstudyplanner.netlify.app/](https://boltnewstudyplanner.netlify.app/)

---

## Features

- **Daily Planner:** Organize up to 5 focused study tasks per day with subject tags and progress tracking.
- **Streak Tracking:** Build momentum with daily study streaks and achievement badges.
- **Progress Insights:** Review your study history and track completion rates.
- **Motivational Quotes:** Stay inspired with daily motivational messages.
- **Authentication:** Secure sign-up/sign-in with Supabase Auth.
- **Responsive Design:** Fully responsive and mobile-friendly UI.
- **Beautiful UI:** Built with Tailwind CSS and Lucide React icons.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Database & Auth)
- [Lucide React](https://lucide.dev/) (Icons)
- [React Router](https://reactrouter.com/)

## Project Structure

```
.
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   └── types/
├── supabase/
│   └── migrations/
├── public/
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Supabase project (for database & authentication)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Uday-4083/StudyPlanner.git
   cd studysprint
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up the database:**

   - Create a Supabase project.
   - Run the SQL migrations in [`supabase/migrations/`](supabase/migrations/) to set up the `tasks` and `streaks` tables and policies.

5. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

6. **Open the app:**
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint

## Customization

- **UI:** Tailwind CSS is used for styling. You can customize the theme in [tailwind.config.js](tailwind.config.js).
- **Subjects:** Edit the `SUBJECTS` array in [`src/types/index.ts`](src/types/index.ts) to add or remove study subjects.
- **Quotes:** Add or modify motivational quotes in [`src/components/QuoteBox.tsx`](src/components/QuoteBox.tsx).

## Folder Overview

- [`src/components/`](src/components/) — Reusable UI components
- [`src/hooks/`](src/hooks/) — Custom React hooks for auth, tasks, and streaks
- [`src/pages/`](src/pages/) — Main application pages
- [`src/lib/supabase.ts`](src/lib/supabase.ts) — Supabase client and types
- [`src/types/`](src/types/) — TypeScript types and constants
- [`supabase/migrations/`](supabase/migrations/) — SQL migrations for database setup

## License

This project is licensed under the MIT License.

---

Built with ♥ using [Bolt.new](https://bolt.new)