# ZENTrack Components Documentation

Complete reference for all React components in the project.

## Component Overview

```
App (Main Container)
├── Header (Navigation)
│   └── Segment Tabs (Dashboard, Profile, Why)
│
├── Dashboard Segment
│   ├── Role Switcher (Gov/Trainee)
│   ├── GovernmentDashboard
│   │   ├── KPICards
│   │   ├── AI Skill Gap Analyzer
│   │   └── District Table
│   └── TraineeDashboard
│       ├── KPICards
│       └── Timeline
│
├── Profile Segment
│   └── TraineeProfile
│       ├── Profile Header
│       ├── Identity Cards (3 cols)
│       └── Career Timeline
│
├── Why Segment
│   ├── Hero Section
│   ├── Core Pillars (3 cards)
│   └── LandingView
│       ├── Comparison Table
│       └── CTA Button
│
└── UpdateStatusModal
    └── Status Update Form
```

## 🔧 Reusable Components

### Header Component

**Location**: `src/components/common/Header.tsx`

**Purpose**: Main navigation bar with logo and segment tabs

**Props**:
```typescript
interface HeaderProps {
  activeSegment: ActiveSegment    // Current tab: 'dashboard' | 'profile' | 'why'
  onSegmentChange: (segment: ActiveSegment) => void  // Tab change callback
}
```

**Features**:
- Logo with brand name
- Three navigation tabs
- Active tab highlighting
- Sticky positioning

**Usage**:
```typescript
<Header 
  activeSegment={activeSegment} 
  onSegmentChange={setActiveSegment} 
/>
```

**Key Styles**:
- Glass-panel effect
- Gradient logo
- Responsive layout
- Smooth transitions

---

### KPICards Component

**Location**: `src/components/common/KPICards.tsx`

**Purpose**: Displays key performance indicators in card grid

**Props**:
```typescript
interface KPICard {
  label: string           // Card title
  value: string | number  // Main value displayed
  subtext: string        // Secondary text
  icon?: string          // Font Awesome icon class
  color: 'indigo' | 'fuchsia' | 'yellow' | 'emerald' | 'purple'
}

interface KPICardsProps {
  cards: KPICard[]
}
```

**Features**:
- Responsive grid (2 cols mobile, 5 cols desktop)
- Color-coded cards
- Optional icons
- Hover effects
- Dynamic sizing

**Usage**:
```typescript
<KPICards cards={[
  {
    label: 'Total Trainees',
    value: '1,24,850',
    subtext: '+12.4% vs last year',
    icon: 'fa-arrow-up',
    color: 'indigo'
  },
  // more cards...
]} />
```

**Colors Map**:
- `indigo`: Indigo blue theme
- `fuchsia`: Magenta/Fuchsia theme
- `yellow`: Amber/Yellow theme
- `emerald`: Green theme
- `purple`: Purple theme

---

### UpdateStatusModal Component

**Location**: `src/components/common/UpdateStatusModal.tsx`

**Purpose**: Modal form for trainees to update employment status

**Props**:
```typescript
interface UpdateStatusModalProps {
  isOpen: boolean                                  // Show/hide modal
  onClose: () => void                             // Close handler
  onSubmit: (data: {                              // Submit handler
    status: string
    company: string
    salary: string
  }) => void
}
```

**Features**:
- Modal overlay with backdrop blur
- Three input fields
- Cancel and Submit buttons
- Form validation via HTML5
- Close button (X)

**Form Fields**:
1. **Employment Status**: Dropdown
   - Wage Employed
   - Self-Employed / Entrepreneur
   - Apprenticeship
   - Seeking Opportunities

2. **Company Name**: Text input
3. **Salary**: Number input (₹)

**Usage**:
```typescript
<UpdateStatusModal
  isOpen={showUpdateModal}
  onClose={() => setShowUpdateModal(false)}
  onSubmit={(data) => {
    console.log('Updated:', data)
  }}
/>
```

**Styling**:
- Frosted glass panel
- Yellow glow effect
- Centered on screen
- Responsive width

---

## 📊 Dashboard Components

### GovernmentDashboard Component

**Location**: `src/components/government/GovernmentDashboard.tsx`

**Purpose**: Comprehensive government/admin dashboard with analytics

**Props**:
```typescript
interface GovernmentDashboardProps {
  districts: District[]
  filter: string
  setFilter: (filter: string) => void
  selectedCourse: string
  setSelectedCourse: (course: string) => void
  skillGapGenerated: boolean
  setSkillGapGenerated: (generated: boolean) => void
  consents: ConsentSettings
  setConsents: (consents: ConsentSettings) => void
}
```

**Sections**:

#### 1. KPI Cards Section
- Total Trainees: 1,24,850
- Employed Rate: 78.4%
- 6-Month Retention: 71.8%
- Verified Outcomes: 64,820
- Average Wage Growth: +18.6%

#### 2. AI Skill Gap Analyzer
- Course selector
- Run AI Diagnosis button
- Curriculum comparison grid
- Market demand analysis
- AI recommendation banner

#### 3. District Analytics
- Non-placement root cause breakdown (pie chart)
- District-wise table with:
  - District name
  - Trainees count
  - Employment numbers
  - Retention percentage
  - Salary growth
  - Status badge

**Usage**:
```typescript
<GovernmentDashboard
  districts={MOCK_DISTRICTS}
  filter={districtFilter}
  setFilter={setDistrictFilter}
  selectedCourse={selectedSkillGapCourse}
  setSelectedCourse={setSelectedSkillGapCourse}
  skillGapGenerated={skillGapGenerated}
  setSkillGapGenerated={setSkillGapGenerated}
  consents={consents}
  setConsents={setConsents}
/>
```

---

### TraineeDashboard Component

**Location**: `src/components/trainee/TraineeDashboard.tsx`

**Purpose**: Trainee personal dashboard with status and timeline

**Props**:
```typescript
interface TraineeDashboardProps {
  trainee: Trainee              // Trainee data
  onOpenUpdate: () => void      // Open update modal handler
}
```

**Sections**:

#### 1. KPI Cards (4 cols)
- Livelihood Status
- Current Remuneration
- Verified Retention
- Curriculum Fit Rating

#### 2. Career Timeline
- 5-step timeline
- Icons for each milestone
- Dates, titles, descriptions
- Interactive cards

**Usage**:
```typescript
<TraineeDashboard 
  trainee={MOCK_TRAINEE} 
  onOpenUpdate={() => setShowUpdateModal(true)} 
/>
```

---

## 👤 Profile Components

### TraineeProfile Component

**Location**: `src/components/profile/TraineeProfile.tsx`

**Purpose**: Detailed trainee profile view with all information

**Props**:
```typescript
interface TraineeProfileProps {
  trainee: Trainee
  onOpenUpdate: () => void
}
```

**Sections**:

#### 1. Profile Header
- Avatar with initials
- Name with verification badge
- Persistent Skill ID
- Current role and company
- Update Status button

#### 2. Three Information Cards
- **Skill Identity Profile**
  - Training course
  - Training institute
  - DigiLocker verification
  - Curriculum match rating

- **Active Livelihood Signal**
  - Current status
  - Employer
  - Monthly wage
  - Verified retention months

- **Consent Governance**
  - Self-report signal status
  - EPFO contribution match
  - Social media access
  - Privacy compliance note

#### 3. Career Timeline
- Same as TraineeDashboard

**Usage**:
```typescript
<TraineeProfile 
  trainee={MOCK_TRAINEE} 
  onOpenUpdate={() => setShowUpdateModal(true)} 
/>
```

---

## 🎯 Landing Components

### LandingView Component

**Location**: `src/components/landing/LandingView.tsx`

**Purpose**: Informational landing page about ZENTrack

**Props**:
```typescript
interface LandingViewProps {
  onGetStarted: (role: string) => void  // Navigation callback
}
```

**Sections**:

#### 1. Comparison Table
Compares ZENTrack vs Traditional Schemes:
- Tracking Boundary
- Identity Persistence
- Verification Rigor
- Privacy Standard

#### 2. Call-to-Action
- Hero headline
- Description
- Button to enter government dashboard

**Usage**:
```typescript
<LandingView onGetStarted={(role) => handleRoleSwitch(role)} />
```

---

## 🎨 Component Styling

### Common Tailwind Patterns

**Glass Effect**:
```jsx
<div className="glass-panel p-6 rounded-3xl border border-indigo-900/60">
  {/* content */}
</div>
```

**Gradient Text**:
```jsx
<span className="gradient-text">Featured Text</span>
```

**Glow Effects**:
```jsx
<div className="magenta-glow">Fuchsia glow</div>
<div className="yellow-glow">Yellow glow</div>
```

**Card Layout**:
```jsx
<div className="glass-card p-5 rounded-2xl border border-indigo-900/60">
  {/* card content */}
</div>
```

**Responsive Grid**:
```jsx
<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
  {/* grid items */}
</div>
```

**Button Styles**:
```jsx
{/* Primary (Yellow) */}
<button className="px-6 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-extrabold">
  Click
</button>

{/* Secondary (Fuchsia) */}
<button className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold">
  Click
</button>

{/* Tertiary */}
<button className="px-4 py-2 rounded-xl text-slate-300 hover:bg-indigo-950">
  Click
</button>
```

---

## 🔄 Component Communication

### Data Flow

```
App.tsx (State Owner)
  ├─ state: userRole, activeSegment, showUpdateModal, etc.
  │
  ├─ passes data → Header
  ├─ passes data → GovernmentDashboard (or TraineeDashboard)
  ├─ passes data → UpdateStatusModal
  │
  └─ callbacks: handleRoleSwitch, handleStatusUpdate
```

### Props Drilling

**Good Practice**: Keep prop drilling to 1-2 levels
```
App → Dashboard → KPICards (2 levels - OK)
```

**Current State**: All props flow through App or within Dashboard

---

## 📱 Responsive Behavior

### Breakpoints

- **Mobile**: < 640px (default)
- **SM**: ≥ 640px
- **MD**: ≥ 768px (most changes here)
- **LG**: ≥ 1024px
- **XL**: ≥ 1280px

### Component Adaptations

**Header**:
- Mobile: Stacked layout
- MD: Side-by-side layout

**KPI Cards**:
- Mobile: 2 columns
- Desktop: 5 columns

**District Table**:
- Mobile: Horizontal scroll
- MD+: Full width

**Timeline**:
- Mobile: Vertical stack
- SM+: 5 columns

---

## ✨ Animation & Transitions

### Hover Effects
```
.hover:border-fuchsia-500/40  // Border color on hover
.hover:opacity-90              // Opacity change
.hover:text-yellow-300         // Text color on hover
.hover:bg-indigo-900           // Background on hover
```

### Transitions
```
.transition-all                // Smooth all property changes
.transition-colors             // Smooth color changes
```

---

## 🧩 Creating New Components

### Template

```typescript
/**
 * Component description
 */

interface [ComponentName]Props {
  // Define all props here
  title: string
  onAction?: () => void
}

export function [ComponentName]({ title, onAction }: [ComponentName]Props) {
  return (
    <div className="glass-card p-6 rounded-2xl">
      {/* Component JSX */}
    </div>
  )
}
```

### Best Practices

1. **Type all props** with TypeScript interfaces
2. **Use JSDoc comments** above component
3. **Keep components focused** - single responsibility
4. **Export from component file** - not from index
5. **Use consistent naming** - PascalCase for components
6. **Document complex logic** with inline comments

---

## 🐛 Debugging Components

### Common Issues

**Props not updating**:
- Check if prop is passed from parent
- Verify state setter is called correctly
- Use React DevTools to inspect props

**Styling not applying**:
- Check class name spelling
- Verify color names exist
- Check responsive breakpoint
- Look at Tailwind config

**Component not rendering**:
- Check conditional rendering logic
- Verify data is not undefined
- Check browser console for errors
- Use React DevTools Profiler

---

## 📚 Resources

- [React Components](https://react.dev/learn/your-first-component)
- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Tailwind CSS Components](https://tailwindcss.com/docs/utility-first)
- [Component Patterns](https://patterns.dev/posts/component-composition)

---

## 📋 Component Checklist

- [ ] Component has TypeScript interface for props
- [ ] Component is exported from file
- [ ] Component has JSDoc comment
- [ ] All props are used or documented
- [ ] Responsive design considered
- [ ] Accessibility features included
- [ ] Error states handled
- [ ] Loading states considered
