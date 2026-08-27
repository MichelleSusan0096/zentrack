# ZENTrack Architecture & Code Organization Guide

## 📐 System Architecture

### High-Level Design

```
┌─────────────────────────────────────────────┐
│           React Application (SPA)           │
│         TypeScript + Tailwind CSS           │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    ┌───▼────┐          ┌────▼───┐
    │Component│         │ Data   │
    │ Layer   │         │ Layer  │
    └────┬────┘         └────┬───┘
         │                   │
    ┌────▼────────────────────▼────┐
    │   Type Definitions            │
    │   (TypeScript Interfaces)     │
    └──────────────────────────────┘
```

## 🗂️ Detailed Directory Structure

### `/src/components`

Organized by feature domain:

```
components/
├── common/              # Shared reusable components
│   ├── Header.tsx       # Main navigation header
│   ├── KPICards.tsx     # Key performance indicator display
│   └── UpdateStatusModal.tsx  # Status update form modal
│
├── government/          # Government admin dashboard
│   └── GovernmentDashboard.tsx  # Dashboard with analytics
│
├── trainee/             # Trainee-facing views
│   └── TraineeDashboard.tsx     # Trainee summary dashboard
│
├── profile/             # Detailed profile views
│   └── TraineeProfile.tsx       # Full trainee profile page
│
└── landing/             # Landing & informational pages
    └── LandingView.tsx  # Why ZENTrack information
```

### Component Naming Convention

- **Container Components**: `[Name]Dashboard.tsx`, `[Name]Profile.tsx`
- **Reusable Components**: `[Name].tsx` (e.g., `KPICards.tsx`, `Header.tsx`)
- **Modal/Dialog**: `[Action]Modal.tsx` (e.g., `UpdateStatusModal.tsx`)

### Data Layer

```
data/
└── mockData.ts         # Mock data for development
    ├── MOCK_DISTRICTS
    ├── MOCK_TRAINEE
    └── MOCK_VERIFICATIONS
```

### Type System

```
types/
└── index.ts           # All TypeScript interfaces
    ├── District interface
    ├── Trainee interface
    ├── VerificationRequest interface
    ├── ConsentSettings interface
    ├── UserRole type
    └── ActiveSegment type
```

## 📊 Component Lifecycle

### App Component Flow

```
App.tsx
├── useState hooks setup
│   ├── userRole
│   ├── activeSegment
│   ├── showUpdateModal
│   ├── districtFilter
│   ├── selectedSkillGapCourse
│   └── consents
│
├── Header (Navigation)
│   └── Segment selection (Dashboard/Profile/Why)
│
├── Main Content Router
│   ├── Dashboard Segment
│   │   ├── Role Switcher (Government/Trainee)
│   │   ├── Government Dashboard
│   │   │   ├── KPI Cards
│   │   │   ├── AI Skill Gap Analyzer
│   │   │   └── District Analytics
│   │   └── Trainee Dashboard
│   │       ├── KPI Cards
│   │       └── Timeline
│   ├── Profile Segment
│   │   └── Trainee Profile
│   │       ├── Profile Header
│   │       ├── Identity Card
│   │       ├── Detail Cards
│   │       └── Timeline
│   └── Why Segment
│       ├── Hero Section
│       ├── 3 Core Pillars
│       └── Comparison Table
│
└── Update Status Modal
    └── Form submission handling
```

## 🔄 Data Flow Patterns

### Props Drilling Pattern

```
App.tsx
  └── GovernmentDashboard
      ├── receives: districts, filter, setFilter
      ├── receives: selectedCourse, setSelectedCourse
      └── contains: KPICards, Table, Analytics
```

### State Management Pattern

```
const [userRole, setUserRole] = useState<UserRole>('government')
   │
   ├─→ Passed to handleRoleSwitch()
   ├─→ Updates activeSegment
   └─→ Triggers view re-render
```

### Modal Control Pattern

```
const [showUpdateModal, setShowUpdateModal] = useState(false)
   │
   ├─→ Opened by: onOpenUpdate() callback
   ├─→ Contains form state
   └─→ Closed by: handleStatusUpdate() or onClose
```

## 🎨 Styling Architecture

### Tailwind CSS Organization

**Global Utilities** (`index.css`):
```css
.glass-panel { /* Frosted glass effect */ }
.glass-card { /* Lighter glass effect */ }
.magenta-glow { /* Fuchsia box shadow */ }
.yellow-glow { /* Yellow box shadow */ }
.gradient-text { /* Multi-color gradient text */ }
```

**Component Styles**:
- Applied directly via Tailwind classes in JSX
- Responsive modifiers: `sm:`, `md:`, `lg:`
- Dark mode: Built-in with `class="dark"` on `<html>`

**Color Palette**:
```
Primary: navy-900 (#0c1024)
Accent: magenta-500 (#d946ef), yellow-400 (#eab308)
Semantic: emerald (success), red (error), amber (warning)
```

### Responsive Design Strategy

```
Mobile First:
- Base styles: mobile viewport
- md: 768px - tablet/desktop
- lg: 1024px - large desktop

Example:
className="grid-cols-2 md:grid-cols-5 gap-4"
```

## 🔐 Type Safety

### Interface Hierarchy

```
Core Types (types/index.ts)
├── Domain Models
│   ├── District
│   ├── Trainee
│   ├── TimelineMilestone
│   └── VerificationRequest
│
├── Component Props
│   ├── GovernmentDashboardProps
│   ├── TraineeDashboardProps
│   └── UpdateStatusModalProps
│
├── Enums
│   ├── UserRole
│   └── ActiveSegment
│
└── Settings
    └── ConsentSettings
```

### Type Usage Example

```typescript
// Component receives typed props
interface TraineeDashboardProps {
  trainee: Trainee
  onOpenUpdate: () => void
}

// State is typed
const [userRole, setUserRole] = useState<UserRole>('government')

// Callbacks have signatures
const handleStatusUpdate = (data: {
  status: string
  company: string
  salary: string
}) => { /* ... */ }
```

## 📦 Dependencies

### Production Dependencies
- `react@^18.2.0` - UI library
- `react-dom@^18.2.0` - DOM rendering

### Development Dependencies
- `@vitejs/plugin-react` - React HMR
- `tailwindcss@^3.3.6` - CSS framework
- `typescript@^5.3.3` - Type checking
- `vite@^5.0.8` - Build tool

## 🔄 Feature Development Workflow

### Adding a New Dashboard View

1. **Create Type** (`src/types/index.ts`):
```typescript
export interface NewView {
  id: string
  title: string
  // ... fields
}
```

2. **Create Component** (`src/components/[domain]/[Name]View.tsx`):
```typescript
interface NewViewProps {
  data: NewView
  onAction: () => void
}

export function NewView({ data, onAction }: NewViewProps) {
  return ( /* JSX */ )
}
```

3. **Add Mock Data** (`src/data/mockData.ts`):
```typescript
export const MOCK_NEW_VIEW: NewView = {
  id: '1',
  title: 'Example',
}
```

4. **Integrate in App** (`src/App.tsx`):
```typescript
import { NewView } from '@/components/[domain]/NewView'

// In App component:
{activeSegment === 'newView' && <NewView data={data} onAction={action} />}
```

## 🧪 Testing Strategy

### Component Testing Areas

- **Props Rendering**: Verify components render correctly with different props
- **State Updates**: Test state changes trigger re-renders
- **User Interactions**: Click handlers, form submissions
- **Data Display**: Verify correct data is displayed

### Mock Data Usage

Mock data allows:
- Development without backend
- Consistent UI testing
- Demo/presentation scenarios
- Easy data modification for testing

## 🚀 Performance Considerations

### Optimization Techniques

1. **Component Splitting**: Keep components focused and small
2. **Prop Drilling**: Minimize prop depth (currently 2-3 levels)
3. **Memoization**: Use `React.memo` for expensive components if needed
4. **Code Splitting**: Separate routes into code chunks (future enhancement)

### Current Architecture Benefits

- Fast build time with Vite
- Minimal bundle size
- No external API calls (mock data)
- Zero-runtime CSS framework (Tailwind)

## 📈 Scalability Plan

### Short Term (MVP)
- ✅ Mock data implementation
- ✅ Multi-role support
- ✅ Core UI complete

### Medium Term
- 🔲 Backend API integration
- 🔲 Real authentication
- 🔲 Database connectivity
- 🔲 State management (Redux/Zustand)

### Long Term
- 🔲 Advanced analytics
- 🔲 Internationalization (i18n)
- 🔲 Accessibility enhancements
- 🔲 Mobile app version

## 🔗 Common Patterns

### Modal Pattern
```typescript
const [showModal, setShowModal] = useState(false)

<UpdateStatusModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSubmit={(data) => handleSubmit(data)}
/>
```

### Role-Based View Pattern
```typescript
{userRole === 'government' && <GovernmentDashboard {...props} />}
{userRole === 'trainee' && <TraineeDashboard {...props} />}
```

### KPI Display Pattern
```typescript
const kpiCards = [
  { label: 'Title', value: '1,000', subtext: 'Description', color: 'blue' }
]
<KPICards cards={kpiCards} />
```

## 📚 File Size Reference

```
src/
├── components/    ~3.5 KB (5 files)
├── data/          ~2.1 KB (1 file)
├── types/         ~1.2 KB (1 file)
├── App.tsx        ~4.8 KB
├── main.tsx       ~0.2 KB
└── index.css      ~2.5 KB
```

Total: ~14.3 KB TypeScript + CSS (unminified)

## 🔍 Code Quality

### Best Practices Followed

✅ Type safety with TypeScript
✅ Component separation of concerns
✅ Clear naming conventions
✅ Responsive design
✅ Accessibility considerations
✅ Clean code structure
✅ Documentation via comments

### Linting Rules

```bash
npm run lint      # Check for issues
npm run format    # Auto-format code
```
