# GK Trader Frontend

A professional trading platform frontend built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## Features

- ✨ **Dark Theme** - Professional dark interface optimized for trading
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI Components** - Reusable component library with consistent design
- 📊 **Trading Dashboard** - Real-time portfolio and market data visualization
- 🔐 **Authentication Pages** - Login and registration with form validation
- ⚡ **Fast Performance** - Built with Next.js App Router and optimized rendering

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Trading dashboard page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home landing page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Button.tsx         # Button component
│   ├── Chart.tsx          # Price chart component
│   ├── Header.tsx         # Navigation header
│   ├── Input.tsx          # Form input component
│   ├── PortfolioCard.tsx  # Portfolio item card
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── StatCard.tsx       # Statistics card
│   ├── StockCard.tsx      # Stock display card
│   └── TradeHistoryTable.tsx  # Trade history table
├── hooks/                 # Custom React hooks
│   └── useTheme.ts        # Theme management hook
├── lib/                   # Utility functions
│   └── utils.ts           # Formatting and helper functions
├── types/                 # TypeScript type definitions
│   └── index.ts           # Trading data types
└── public/                # Static assets
```

## Pages

### Home (`/`)
Landing page with hero section and feature showcase

### Login (`/login`)
User authentication with email and password
- Form validation
- Remember me option
- Social login buttons
- Link to registration

### Register (`/register`)
New user registration
- Full name, email, password fields
- Password confirmation
- Terms and conditions agreement
- Form validation

### Dashboard (`/dashboard`)
Professional trading dashboard with:
- Portfolio overview with statistics
- Real-time price charts
- Portfolio holdings
- Trending stocks watchlist
- Trade history table

## Components

### Button
- Variants: `primary`, `secondary`, `danger`
- Sizes: `sm`, `md`, `lg`

### Input
- Label support
- Error messages
- Icon support

### StatCard
- Display key metrics
- Change indicators
- Icon badges

### Chart
- Interactive price visualization
- Time period selector (1D, 1W, 1M, 3M, 1Y)

### PortfolioCard
- Stock symbol and quantity
- Current value and price
- Gain/Loss calculation
- Percentage change

### StockCard
- Price display
- Trend indicators
- Volume and market cap
- Watchlist toggle

### TradeHistoryTable
- Sortable trade data
- Status indicators
- Date/time formatting
- Buy/sell highlighting

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm run start
```

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful icon library
- **React Hooks** - State management and effects

## Theme

The application features a dark theme with:
- Background: `#030712` (gray-950)
- Cards: `#0f1419` (gray-900)
- Borders: `#1a1f2e` (gray-800)
- Text: White for readability
- Accents: Blue and purple gradients

## Type Definitions

See `types/index.ts` for:
- `User` - User profile information
- `Stock` - Stock market data
- `Portfolio` - User holdings
- `ChartData` - Time-series data
- `TradeHistory` - Transaction records

## Utilities

Helper functions in `lib/utils.ts`:
- `formatCurrency()` - Format numbers as currency
- `formatPercent()` - Format percentage values
- `formatNumber()` - Format large numbers with abbreviation
- `formatDate()` - Format dates
- `formatTime()` - Format times
- `cn()` - Conditional class names

## License

MIT
