# The Sports Hub 🏆

A modern, pixel-perfect sports dashboard application that provides real-time match information, live scores, and detailed match analytics. Built as a one-stop destination for sports fans to stay updated with their favorite teams and leagues.

## 🌐 Live Application

**Deployed at:** [https://sp-hub.vercel.app](https://sp-hub.vercel.app)

**Documentation:** [View Documentation](/docs) | [Live Docs](https://sp-hub.vercel.app/docs)

## ✨ Features

- **Fixtures Dashboard**: View live and upcoming matches with real-time score updates
- **Live Score Polling**: Automatic score updates every 15 seconds for live matches
- **Match Details View**: Comprehensive match information including:
  - Head-to-head statistics
  - Timeline/Events view (goals, cards, substitutions)
  - Match summary and lineups
- **Dark Mode UI**: Beautiful dark-themed interface matching the Figma design
- **Responsive Design**: Optimized for various screen sizes
- **Favorites System**: Save and manage favorite matches
- **Date Navigation**: Browse matches by date with intuitive date selector

## 🛠️ Tech Stack

- **Framework**: React 19.2.1
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.7
- **Routing**: React Router DOM 7.10.1
- **Styling**: Tailwind CSS 4.1.17
- **UI Components**: DaisyUI 5.5.11
- **API**: The SportsDB API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tinsaye-simeneh/sp-hub.git
   cd sp-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   Or if you're using yarn:
   ```bash
   yarn install
   ```

## 🏃 Running the Project

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
sp-hub/
├── src/
│   ├── components/          # React components
│   │   ├── DateSelector.tsx
│   │   ├── EventsTimeline.tsx
│   │   ├── FilterButtons.tsx
│   │   ├── Header.tsx
│   │   ├── LeagueSection.tsx
│   │   ├── MatchCard.tsx
│   │   ├── MatchDetails.tsx
│   │   ├── MatchesDashboard.tsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── useFavorites.ts
│   │   ├── useLiveMatches.ts
│   │   ├── useMatchDetails.ts
│   │   └── useMatches.ts
│   ├── services/            # API service layer
│   │   └── api.ts
│   ├── constants/           # App constants
│   │   ├── api.ts
│   │   ├── colors.ts
│   │   └── theme.ts
│   ├── types/               # TypeScript type definitions
│   │   └── match.ts
│   ├── utils/               # Utility functions
│   │   └── colors.ts
│   ├── data/                # Mock data (for development)
│   │   ├── mockEvents.ts
│   │   └── mockMatches.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── dist/                    # Production build output
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🔌 API Integration

This application uses **The SportsDB API** for fetching match data:

- **Base URL**: `https://www.thesportsdb.com/api/v1/json/3`
- **Default League**: Premier League (ID: 4328)
- **Polling Interval**: 15 seconds for live matches

### Key Endpoints Used

- `eventsnext.php` - Fetch upcoming matches
- `eventslast.php` - Fetch past matches
- `lookupevent.php` - Get detailed match information
- `eventsday.php` - Get matches by date

API endpoints are centralized in `src/constants/api.ts`.

## 🧩 Key Features Implementation

### Live Match Polling

The application automatically polls for score updates every 15 seconds for live matches. The polling mechanism is properly cleaned up when components unmount to prevent memory leaks.

### Routing

- **Dashboard**: `/` - Main fixtures view
- **Match Details**: `/match/:id` - Detailed match view with timeline and events
- **Documentation**: `/docs` - Application documentation and guides

### State Management

Custom hooks are used for:
- Data fetching (`useMatches`, `useMatchDetails`, `useLiveMatches`)
- Favorites management (`useFavorites`)
- Proper error handling and loading states

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a port:

```bash
npm run dev -- --port 3000
```

### Build Errors

If you encounter TypeScript errors during build:

```bash
npm run build
```

Check the error messages and ensure all types are properly defined in the `src/types/` directory.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 Deployment

The application is currently deployed on **Vercel** and is live at:

**🔗 [https://sp-hub.vercel.app](https://sp-hub.vercel.app)**

### Environment Variables

Currently, no environment variables are required. The API key is included in the API base URL.

## 📄 License

-

## 👤 Author

Tinsaye Simeneh [https://github.com/tinsaye-simeneh] (https://github.com/tinsaye-simeneh)

## 🙏 Acknowledgments

- [The SportsDB](https://www.thesportsdb.com/) for providing the free sports API
- Design team for the Figma mockups

---

**Note**: This is a frontend-only application. All data is fetched from The SportsDB public API.

