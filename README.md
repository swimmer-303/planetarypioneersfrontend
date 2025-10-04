# Planetary Pioneers Frontend

A Next.js application for exoplanet detection using machine learning algorithms. This platform provides an intuitive interface for researchers to upload astronomical data, analyze light curves, and identify potential exoplanets using advanced ML models.

## Features

- 🚀 **Modern Next.js 14** with App Router and TypeScript
- 🎨 **Beautiful Space Theme** with Tailwind CSS and custom animations
- 🧠 **ML Detection Engine** with interactive parameter controls
- 📊 **Real-time Data Visualization** with Recharts
- 🌌 **Exoplanet Database** with search and filtering capabilities
- 📱 **Responsive Design** optimized for all devices
- ⚡ **Performance Optimized** with Framer Motion animations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd planetarypioneersfrontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── detection/         # ML Detection page
│   ├── database/          # Exoplanet database
│   └── about/             # About page
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Site footer
│   ├── ExoplanetVisualization.tsx
│   ├── StatsSection.tsx
│   ├── LightCurveChart.tsx
│   ├── DetectionResults.tsx
│   ├── MLParameters.tsx
│   └── ui/                # UI components
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration
```

## Key Features

### 🏠 Homepage
- Hero section with animated exoplanet visualization
- Feature highlights and statistics
- Interactive planet orbit animations
- Call-to-action sections

### 🧠 ML Detection Page
- File upload interface for astronomical data
- Interactive parameter controls (sensitivity, noise threshold)
- Real-time light curve visualization
- ML analysis results with confidence scores
- Export and sharing capabilities

### 📊 Database Page
- Comprehensive exoplanet catalog
- Advanced search and filtering
- Detailed planet characteristics
- Export functionality

### ℹ️ About Page
- Mission and vision
- Team information
- Technology stack
- Feature highlights

## Customization

### Colors
The app uses a custom space-themed color palette defined in `tailwind.config.ts`:

- `space-dark`: Deep space background
- `space-navy`: Navigation and cards
- `space-purple`: Accent borders
- `space-blue`: Secondary elements
- `space-accent`: Primary accent color

### Animations
Custom animations are defined in the Tailwind config:
- `float`: Gentle floating animation
- `pulse-slow`: Slow pulsing effect
- `orbit`: Orbital motion animation

## Deployment

The app is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- NASA Exoplanet Archive for data inspiration
- The astronomy community for research insights
- Next.js and React teams for the amazing framework
