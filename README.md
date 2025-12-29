# 🔐 Auth React NestJS - Full-Stack Authentication System

<div align="center">

[![My Skills](https://skillicons.dev/icons?i=ts,react,nestjs,tailwind,postgres)](https://skillicons.dev)

![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)

A modern, full-stack authentication system built with React, NestJS, and TypeScript in a monorepo architecture powered by Turborepo.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Documentation](#-documentation)

</div>

---

## ✨ Features

### 🔒 Authentication & Authorization
- **Email/Password Authentication** - Secure user registration and login
- **Google OAuth 2.0** - One-click sign-in with Google
- **JWT-based Sessions** - Stateless authentication with refresh tokens
- **Password Encryption** - Industry-standard bcrypt hashing
- **Protected Routes** - Role-based access control

### 👤 User Management
- **User Profiles** - View and edit user information
- **User Directory** - Browse all registered users (admin feature)
- **Avatar Support** - Radix UI avatar components with fallbacks
- **Account Settings** - Manage personal information and preferences

### 🎨 Modern UI/UX
- **Dark/Light Mode** - System-aware theme switching with next-themes
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **shadcn/ui Components** - Beautiful, accessible UI components
- **Form Validation** - Real-time validation with React Hook Form & Zod
- **Toast Notifications** - User feedback with Sonner
- **Smooth Animations** - Polished interactions and transitions

### 🏗️ Developer Experience
- **Turborepo Monorepo** - Blazing fast build system with smart caching
- **TypeScript Throughout** - End-to-end type safety
- **Hot Module Replacement** - Instant feedback during development
- **ESLint & Prettier** - Consistent code style and quality
- **Shared Packages** - Reusable configs and UI components

---

## 🛠️ Tech Stack

### Frontend (`apps/frontend`)
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Routing:** React Router v7
- **Forms:** React Hook Form + Zod validation
- **HTTP Client:** Axios
- **OAuth:** @react-oauth/google
- **Icons:** Lucide React

### Backend (`apps/backend`)
- **Framework:** NestJS
- **Runtime:** Node.js (≥18)
- **Database ORM:** TypeORM
- **Authentication:** Passport.js + JWT
- **Password Hashing:** bcryptjs
- **Session Management:** express-session
- **Validation:** class-validator & class-transformer
- **Testing:** Jest

### Monorepo Tools
- **Build System:** Turborepo
- **Package Manager:** npm
- **TypeScript:** v5.9.2
- **Code Formatting:** Prettier

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥18.0.0
- **npm** ≥10.9.2
- **PostgreSQL** (for production) or any TypeORM-supported database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/auth-react-nest.git
   cd auth-react-nest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   **Frontend** (`apps/frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

   **Backend** (`apps/backend/.env`):
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_DATABASE=auth_db

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRATION=1h
   JWT_REFRESH_SECRET=your_refresh_token_secret_here
   JWT_REFRESH_EXPIRATION=7d

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here

   # Session Secret
   SESSION_SECRET=your_session_secret_here
   ```

   See `.env.example` files in each app for complete examples.

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend at `http://localhost:4000`
   - Backend at `http://localhost:3000`

---

## 📁 Project Structure

```
auth-react-nest/
├── apps/
│   ├── backend/              # NestJS REST API
│   │   ├── src/
│   │   │   ├── auth/        # Authentication module
│   │   │   ├── users/       # Users module
│   │   │   ├── jwt-auth/    # JWT strategy & guards
│   │   │   ├── entities/    # TypeORM entities
│   │   │   ├── logger/      # Custom logger service
│   │   │   └── main.ts      # Application entry point
│   │   ├── test/            # E2E tests
│   │   └── package.json
│   │
│   └── frontend/            # React SPA
│       ├── src/
│       │   ├── pages/       # Route pages (Login, Register, Profile, Users)
│       │   ├── components/  # Reusable UI components
│       │   ├── api/         # API client functions
│       │   ├── context/     # React Context (AuthContext)
│       │   ├── hooks/       # Custom React hooks
│       │   ├── lib/         # Utilities (cn helper)
│       │   └── utils/       # Helper functions
│       ├── public/          # Static assets
│       └── package.json
│
├── packages/                # Shared packages (if any)
│   ├── eslint-config/      # Shared ESLint configurations
│   ├── typescript-config/  # Shared TypeScript configurations
│   └── ui/                 # Shared UI components
│
├── turbo.json              # Turborepo pipeline configuration
├── package.json            # Root package.json with workspaces
└── README.md               # You are here!
```

---

## 🎯 Available Scripts

### Root Level (Monorepo)

```bash
# Development
npm run dev              # Start all apps in development mode

# Building
npm run build           # Build all apps and packages

# Code Quality
npm run lint            # Lint all apps
npm run format          # Format code with Prettier
npm run check-types     # Type-check all TypeScript files
```

### Frontend (`apps/frontend`)

```bash
npm run dev             # Start Vite dev server (port 5173)
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Lint frontend code
```

### Backend (`apps/backend`)

```bash
npm run dev             # Start NestJS in watch mode
npm run build           # Build backend
npm run start           # Start production server
npm run start:debug     # Start with debugger
npm run test            # Run unit tests
npm run test:e2e        # Run end-to-end tests
npm run test:cov        # Generate test coverage
npm run lint            # Lint backend code
```

---

## 🔧 Configuration

### Turborepo Pipeline

The monorepo uses Turborepo's intelligent build system with the following pipelines:

- **`dev`** - Runs development servers with caching disabled
- **`build`** - Builds apps with dependency awareness
- **`lint`** - Lints code across the monorepo
- **`check-types`** - Type-checks all TypeScript
- **`test`** - Runs tests with caching

### TypeORM Database Setup

The backend uses TypeORM for database management. To set up your database:

1. Create a PostgreSQL database
2. Update `.env` with your database credentials
3. Run migrations (if available) or let TypeORM auto-sync in development

---

## 🔐 Authentication Flow

### Email/Password Registration & Login

1. **Registration**
   - User submits email, password, and profile info
   - Backend validates input and hashes password with bcrypt
   - User entity created in database
   - JWT tokens generated and returned

2. **Login**
   - User submits credentials
   - Backend verifies email and password
   - JWT access token + refresh token returned
   - Frontend stores tokens and updates auth state

### Google OAuth Flow

1. User clicks "Sign in with Google"
2. Google OAuth popup opens
3. User authorizes the application
4. Backend validates Google token
5. User created/updated in database
6. JWT tokens returned to frontend

### Protected Routes

- Frontend checks auth state before rendering protected pages
- Backend validates JWT on protected endpoints
- Unauthorized requests redirect to login

---

## 📚 Documentation

### API Documentation

Once the backend is running, you can explore the API:

- **Base URL:** `http://localhost:3000`
- **Auth Endpoints:**
  - `POST /auth/register` - Register new user
  - `POST /auth/login` - Login user
  - `POST /auth/google` - Google OAuth login
  - `POST /auth/refresh` - Refresh access token
  - `GET /auth/me` - Get current user (protected)

- **User Endpoints:**
  - `GET /users` - Get all users (protected)
  - `GET /users/:id` - Get user by ID (protected)
  - `PATCH /users/:id` - Update user (protected)
  - `DELETE /users/:id` - Delete user (protected)

### Component Library

The frontend uses shadcn/ui components. Available components:
- Button, Input, Label, Select, Checkbox
- Dialog, Alert Dialog, Dropdown Menu
- Avatar, Separator, Card
- Toast notifications via Sonner

See `apps/frontend/README.md` for frontend-specific documentation.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features

---

## 📝 License

This project is licensed under the UNLICENSED License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **[Turborepo](https://turbo.build/)** - Monorepo build system
- **[NestJS](https://nestjs.com/)** - Backend framework
- **[React](https://react.dev/)** - Frontend library
- **[shadcn/ui](https://ui.shadcn.com/)** - UI component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeORM](https://typeorm.io/)** - ORM for TypeScript

---

## 📧 Contact

Have questions or suggestions? Feel free to open an issue or reach out!

---

<div align="center">

**Built with ❤️ using modern web technologies**

⭐ Star this repo if you find it helpful!

</div>
