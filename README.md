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
DT-reservation-assessment-frontend/
├── src/                              # Código fuente de la aplicación
│   ├── app/                          # Next.js App Router (rutas)
│   │   ├── admin/                    # Página de dashboard administrativo
│   │   ├── login/                    # Página de inicio de sesión
│   │   ├── places/                   # Páginas de lugares
│   │   ├── reservations/             # Páginas de reservas
│   │   ├── spaces/                   # Páginas de espacios
│   │   ├── layout.tsx                # Layout principal de la aplicación
│   │   ├── page.tsx                  # Página de inicio
│   │   ├── globals.css               # Estilos globales
│   │   └── favicon.ico               # Icono de la aplicación
│   ├── features/                     # Organización basada en características
│   │   ├── admin/                    # Características del dashboard
│   │   │   ├── components/           # Componentes específicos del admin
│   │   │   ├── hooks/                # Hooks para telemetría IoT
│   │   │   └── types/                # Tipos del dashboard
│   │   ├── auth/                     # Autenticación
│   │   │   ├── components/           # Componentes de login/auth
│   │   │   └── services/             # Servicios de autenticación
│   │   ├── places/                   # Gestión de lugares
│   │   │   ├── components/           # Componentes de lugares
│   │   │   ├── hooks/                # Hooks para lugares
│   │   │   ├── services/             # API services de lugares
│   │   │   └── types/                # Tipos de lugares
│   │   ├── reservations/             # Gestión de reservas
│   │   │   ├── components/           # Componentes de reservas
│   │   │   ├── hooks/                # Hooks para reservas
│   │   │   ├── services/             # API services de reservas
│   │   │   └── types/                # Tipos de reservas
│   │   └── spaces/                   # Gestión de espacios
│   │       ├── components/           # Componentes de espacios
│   │       ├── hooks/                # Hooks para espacios
│   │       ├── services/             # API services de espacios
│   │       └── types/                # Tipos de espacios
│   ├── shared/                       # Componentes y utilidades compartidas
│   │   ├── components/               # Componentes UI comunes (Button, Card, etc.)
│   │   │   └── ui/                   # Componentes base de shadcn/ui
│   │   ├── const/                    # Constantes de la aplicación
│   │   ├── hooks/                    # Hooks personalizados compartidos
│   │   ├── lib/                      # Librerías y utilidades
│   │   ├── providers/                # Providers de React (Redux, Theme)
│   │   ├── services/                 # Servicios HTTP compartidos
│   │   ├── store/                    # Redux store y slices
│   │   ├── types/                    # Tipos TypeScript compartidos
│   │   └── utils/                    # Funciones utilitarias
│   ├── assets/                       # Recursos estáticos
│   │   └── svgs/                     # Íconos SVG
│   └── config/                       # Archivos de configuración
│       └── api.ts                    # Configuración de URLs de API
├── public/                           # Archivos públicos estáticos
│   ├── next.svg                      # Logo de Next.js
│   ├── vercel.svg                    # Logo de Vercel
│   └── *.svg                         # Otros íconos
├── docker/                           # Configuración Docker (si existe)
├── tests/                            # Pruebas E2E con Playwright
│   └── e2e/                          # Pruebas end-to-end
├── .env.local.example                # Plantilla de variables de entorno
├── .eslintrc.js                      # Configuración ESLint
├── .prettierrc                       # Configuración Prettier
├── components.json                   # Configuración de shadcn/ui
├── docker-compose.yml                # Docker Compose para desarrollo
├── Dockerfile                        # Imagen Docker de producción
├── eslint.config.mjs                 # Configuración moderna de ESLint
├── jest.config.js                    # Configuración de Jest
├── next.config.ts                    # Configuración de Next.js
├── playwright.config.ts              # Configuración de Playwright
├── postcss.config.mjs                # Configuración de PostCSS
├── tailwind.config.js                # Configuración de Tailwind CSS
├── tsconfig.json                     # Configuración de TypeScript
├── package.json                      # Dependencias y scripts
└── README.md                         # Este archivo
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

## 📋 Development Guidelines

- Follow feature-based architecture
- Use TypeScript for type safety
- Implement proper error handling
- Write tests for all features
- Follow ESLint and Prettier rules

## 🚨 Requirements

- Node.js 20+
- NPM or compatible package manager
- Backend API running on port 3001

## 🔗 Related Projects

- [Backend API](../DT-reservation-assessment-backend/) - Node.js/TypeScript API
