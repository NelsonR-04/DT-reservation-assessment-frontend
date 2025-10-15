# Coworking Reservation System - Frontend

A modern Next.js frontend application for managing coworking space reservations with TypeScript, Tailwind CSS, and feature-based architecture.

## 🚀 Technology Stack

- **Framework**: Next.js 15+ with TypeScript
- **Styling**: Tailwind CSS v4
- **Testing**: Jest + React Testing Library + Playwright
- **Architecture**: Feature-based organization
- **Code Quality**: ESLint + Prettier
- **Containerization**: Docker

## 📁 Project Structure

```
src/
├── features/           # Feature-based organization
│   ├── spaces/         # Space management features
│   ├── reservations/   # Reservation features
│   └── admin/          # Admin dashboard features
├── shared/             # Shared components and utilities
│   ├── components/     # Common UI components
│   ├── hooks/          # Common custom hooks
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── pages/              # Next.js pages
├── styles/             # Global styles
└── config/             # Configuration files
```

## 🛠️ Setup & Installation

1. **Install dependencies**:

```bash
npm install
```

2. **Environment configuration**:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=your-api-key-here
```

3. **Start development server**:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Available Scripts

### Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing

- `npm test` - Run unit tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with Playwright UI

## 🧪 Testing

### Unit Tests

Unit tests are located alongside components using Jest and React Testing Library:

```bash
npm test
```

### E2E Tests

End-to-end tests use Playwright and are located in `/tests/e2e/`:

```bash
npm run test:e2e
```

## 🐳 Docker Deployment

### Development

```bash
docker-compose up -d
```

### Production Build

```bash
docker build -t coworking-frontend .
docker run -p 3000:3000 coworking-frontend
```

## 🔧 Configuration

### Path Aliases

The project uses TypeScript path mapping for cleaner imports:

- `@/*` - src/
- `@/features/*` - src/features/
- `@/shared/*` - src/shared/
- `@/config/*` - src/config/

### API Integration

API calls are handled through a centralized HTTP client with automatic error handling and authentication.

## 🎯 Features

- ✅ View available coworking spaces
- ✅ Browse existing reservations with pagination
- ✅ Create new reservations
- ✅ View space details
- ✅ Delete reservations
- ✅ Admin dashboard with IoT telemetry (bonus feature)

## 📋 Development Guidelines

- Follow feature-based architecture
- Use TypeScript for type safety
- Implement proper error handling
- Write tests for all features
- Follow ESLint and Prettier rules
- Use semantic commit messages

## 🚨 Requirements

- Node.js 20+
- NPM or compatible package manager
- Backend API running on port 3001

## 🔗 Related Projects

- [Backend API](../DT-reservation-assessment-backend/) - Node.js/TypeScript API
