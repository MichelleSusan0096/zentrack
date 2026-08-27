# ZENTrack - Beyond Training. Beyond Certification

ZENTrack is a comprehensive outcome tracking platform for vocational training and skilling schemes. It provides continuous longitudinal tracking of trainees from certification through employment, with multi-signal verification and privacy-first consent governance.

## 🎯 Project Overview

**The Problem:**
Traditional skilling schemes stop tracking outcomes immediately after certification. There's no systematic way to verify employment, salary progression, or long-term livelihood outcomes.

**The Solution:**
ZENTrack provides a 12-month continuous tracking platform that:
- Uses persistent Skill IDs linked to DigiLocker
- Cross-references multiple signals (EPFO, employer reports, UPI proofs)
- Maintains strict privacy compliance with DPDP Act 2023
- Provides real-time analytics to government and training providers

## 📁 Project Structure

```
zentrack/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── KPICards.tsx
│   │   │   └── UpdateStatusModal.tsx
│   │   ├── government/      # Government dashboard
│   │   │   └── GovernmentDashboard.tsx
│   │   ├── trainee/         # Trainee views
│   │   │   └── TraineeDashboard.tsx
│   │   ├── profile/         # Profile views
│   │   │   └── TraineeProfile.tsx
│   │   └── landing/         # Landing pages
│   │       └── LandingView.tsx
│   ├── data/
│   │   └── mockData.ts      # Mock data for development
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite build config
├── tailwind.config.js       # Tailwind CSS config
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will start at `http://localhost:5173`

## 🏗️ Architecture

### Component Hierarchy

```
App
├── Header
├── Dashboard
│   ├── GovernmentDashboard
│   ├── TraineeDashboard
│   ├── TraineeProfile
│   └── LandingView
└── UpdateStatusModal
```

### State Management

The app uses React hooks for state management:
- `userRole`: Determines which perspective is shown (government/trainee)
- `activeSegment`: Controls which tab is active (dashboard/profile/why)
- `showUpdateModal`: Modal visibility state
- Various filters and preferences

### Data Flow

1. Mock data is loaded from `src/data/mockData.ts`
2. Components receive data via props
3. State updates trigger re-renders
4. User interactions update component state

## 📊 Key Features

### Government Dashboard
- KPI metrics (trainees, employment rate, retention)
- AI-powered skill gap analyzer
- District-wise performance comparison
- Non-placement root cause analysis

### Trainee Dashboard
- Personal employment status
- Salary tracking
- Verified retention months
- Career timeline with milestones

### Privacy & Consent
- DPDP Act 2023 compliant
- Granular consent settings
- Transparent signal collection
- User control over data sharing

## 🎨 Design System

### Colors
- **Navy**: `#070913`, `#0c1024`, `#141a38`, `#1e2752`
- **Magenta**: `#d946ef`
- **Yellow**: `#eab308`
- **Accent colors**: Emerald, Fuchsia, Purple

### Typography
- **Headings**: Poppins (600, 700, 800)
- **Body**: Inter (300-900)

### Components
- **Glass Panels**: Frosted glass effect with backdrop blur
- **Glow Effects**: Magenta and yellow glows for emphasis
- **Gradient Text**: Multi-color gradients

## 🔧 Development

### Code Organization

Each component is self-contained with:
- Clear responsibility
- Type-safe interfaces
- Comprehensive comments
- Reusable utilities

### Adding a New Feature

1. Create component in appropriate subdirectory
2. Define types in `src/types/index.ts`
3. Add mock data if needed in `src/data/mockData.ts`
4. Import and integrate in `App.tsx`

### Styling

- Uses Tailwind CSS utility classes
- Custom glass-morphism styles in `src/index.css`
- Dark mode enabled by default
- Responsive design with mobile-first approach

## 📝 Type Safety

TypeScript interfaces for all data structures:

```typescript
interface Trainee {
  name: string
  skillId: string
  status: 'Employed' | 'Seeking' | 'Self-Employed'
  // ... more fields
}
```

All components are properly typed with `React.FC` or function components with explicit return types.

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Creates optimized production build in `dist/` directory.

### Deploy

The `dist/` folder can be deployed to:
- Static hosting (Netlify, Vercel, AWS S3)
- Traditional web servers
- Docker containers

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

Guidelines for contributing:
1. Follow the existing code style
2. Add types for new features
3. Update documentation
4. Test changes locally

## 📄 License

[Add your license here]

## 📞 Support

For questions or issues:
- Review documentation in code comments
- Check component examples in `App.tsx`
- Reference mock data in `src/data/mockData.ts`
