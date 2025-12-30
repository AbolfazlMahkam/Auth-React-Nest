# 🎨 Frontend - React Authentication Client

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern React single-page application with authentication, built with Vite, TypeScript, and Tailwind CSS.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Styling](#-styling)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)

---

## 🎯 Overview

This is the frontend application for the Auth React NestJS project. It provides a complete user interface for authentication, user management, and profile editing with a modern, responsive design.

**Key Highlights:**

- ⚡ Lightning-fast development with Vite
- 🎨 Beautiful UI with shadcn/ui and Tailwind CSS
- 🔒 Secure authentication flow with JWT
- 📱 Fully responsive and mobile-friendly
- 🌓 Dark/light mode support
- ✅ Form validation with Zod schemas
- 🚀 Optimized production builds

---

## ✨ Features

### 🔐 Authentication

- **Email/Password Login** - Traditional authentication with validation
- **User Registration** - Multi-step registration with real-time validation
- **Google OAuth** - One-click sign-in with Google
- **Remember Me** - Persistent sessions with refresh tokens
- **Auto-logout** - Token expiration handling
- **Protected Routes** - Automatic redirection for unauthenticated users

### 👥 User Management

- **User List** - Browse all registered users
- **User Profiles** - View detailed user information
- **Profile Editing** - Update personal information
- **Avatar Display** - User avatars with fallback initials
- **Role-based UI** - Different views for different user roles

### 🎨 UI/UX Features

- **Dark/Light Theme** - Toggle between themes with persistence
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Success and error feedback
- **Form Validation** - Real-time input validation
- **Accessibility** - ARIA labels and keyboard navigation

---

## 🛠️ Tech Stack

### Core

- **React** 19.2.0 - Latest React with concurrent features
- **TypeScript** 5.9.3 - Type-safe JavaScript
- **Vite** 7.2.4 - Next-generation frontend tooling

### UI & Styling

- **Tailwind CSS** 3.4.19 - Utility-first CSS framework
- **shadcn/ui** - Radix UI + Tailwind components
- **Radix UI** - Accessible component primitives
  - Dialog, Dropdown Menu, Select
  - Alert Dialog, Avatar, Checkbox
  - Label, Separator, Slot
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management
- **class-variance-authority** - Variant-based component styling
- **tailwind-merge** - Intelligent class merging

### Forms & Validation

- **React Hook Form** 7.69.0 - Performant form library
- **Zod** 4.2.1 - TypeScript-first schema validation
- **@hookform/resolvers** - Zod integration for React Hook Form

### Routing & HTTP

- **React Router** 7.11.0 - Client-side routing
- **Axios** 1.13.2 - Promise-based HTTP client
- **@react-oauth/google** - Google OAuth integration

### Notifications

- **Sonner** 2.0.7 - Beautiful toast notifications

### Development Tools

- **ESLint** - Code linting with React plugins
- **Prettier** (root) - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Plugin React** - Fast refresh and JSX support

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥18.0.0
- npm ≥10.9.2
- Backend server running (see root README)

### Installation

1. **Navigate to frontend directory**

   ```bash
   cd apps/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**

   ```env
   VITE_API_URL=http://localhost:3000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
apps/frontend/
├── public/                    # Static assets
│   └── vite.svg              # App icon
│
├── src/
│   ├── api/                  # API client & endpoints
│   │   ├── axios.ts          # Axios instance configuration
│   │   ├── auth.ts           # Auth API calls
│   │   └── users.ts          # User API calls
│   │
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── avatar.tsx
│   │   │   └── ...
│   │   ├── Header.tsx       # App header with navigation
│   │   ├── ProtectedRoute.tsx # Route guard component
│   │   └── ThemeProvider.tsx  # Theme context provider
│   │
│   ├── context/             # React Context
│   │   └── AuthContext.tsx # Authentication state & actions
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── use-toast.ts    # Toast notification hook
│   │
│   ├── lib/                 # Utility functions
│   │   └── utils.ts        # cn() helper for class merging
│   │
│   ├── pages/               # Route components
│   │   ├── index.ts        # Page exports
│   │   ├── LoginPage.tsx   # Login form with Google OAuth
│   │   ├── RegisterPage.tsx # Registration form
│   │   ├── ProfilePage.tsx # User profile & edit
│   │   └── UsersPage.tsx   # User directory
│   │
│   ├── utils/               # Helper utilities
│   │   └── validators.ts   # Zod schemas (if applicable)
│   │
│   ├── App.tsx             # Main app component with routing
│   ├── App.css             # Global component styles
│   ├── main.tsx            # Application entry point
│   └── index.css           # Tailwind directives & globals
│
├── .env                     # Environment variables (gitignored)
├── .env.example            # Environment template
├── components.json         # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # TypeScript app-specific config
├── tsconfig.node.json      # TypeScript Node config
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

---

## 🗺️ Pages & Routes

### Public Routes

| Route       | Component      | Description                              |
| ----------- | -------------- | ---------------------------------------- |
| `/login`    | `LoginPage`    | User login with email/password or Google |
| `/register` | `RegisterPage` | New user registration form               |

### Protected Routes

| Route      | Component     | Description                |
| ---------- | ------------- | -------------------------- |
| `/`        | `ProfilePage` | User profile view and edit |
| `/profile` | `ProfilePage` | User profile view and edit |
| `/users`   | `UsersPage`   | Directory of all users     |

### Route Protection

Protected routes use the `ProtectedRoute` component which:

- Checks authentication status from `AuthContext`
- Redirects to `/login` if not authenticated
- Shows loading state during authentication check

**Example:**

```tsx
<Route
  path="/"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>
```

---

## 🧩 Components

### UI Components (shadcn/ui)

All UI components are located in `src/components/ui/` and built with:

- **Radix UI** for accessibility
- **Tailwind CSS** for styling
- **CVA** for variant management

**Available Components:**

- `Button` - Clickable button with variants (default, destructive, outline, ghost)
- `Input` - Text input with validation states
- `Label` - Form label with accessibility
- `Select` - Dropdown selection
- `Checkbox` - Checkbox input
- `Dialog` - Modal dialog
- `AlertDialog` - Confirmation dialog
- `DropdownMenu` - Context/action menu
- `Avatar` - User avatar with fallback
- `Separator` - Divider line
- `Card` - Content container

### Custom Components

#### `Header.tsx`

Navigation header with:

- App logo/title
- Navigation links
- Theme toggle
- User menu (when authenticated)
- Logout functionality

#### `ProtectedRoute.tsx`

Route guard that:

- Checks authentication status
- Redirects unauthenticated users
- Shows loading state
- Passes through authenticated users

#### `ThemeProvider.tsx`

Theme management with:

- System theme detection
- Dark/light mode toggle
- Theme persistence

---

## 🔄 State Management

### AuthContext

Central authentication state managed by React Context:

**State:**

```typescript
{
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean
}
```

**Actions:**

```typescript
login(email, password): Promise<void>
loginWithGoogle(credential): Promise<void>
register(userData): Promise<void>
logout(): void
updateUser(userData): Promise<void>
```

**Usage:**

```tsx
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  // Use auth state and actions
}
```

### Local State

Component-level state managed with:

- `useState` for simple state
- `useForm` from React Hook Form for forms
- `useToast` for notifications

---

## 🔌 API Integration

### Axios Configuration

Centralized Axios instance (`src/api/axios.ts`) with:

- Base URL from environment variables
- Request interceptors for auth tokens
- Response interceptors for error handling
- Automatic token refresh on 401 errors

### API Modules

#### `auth.ts` - Authentication API

```typescript
login(email, password): Promise<AuthResponse>
register(userData): Promise<AuthResponse>
googleLogin(credential): Promise<AuthResponse>
refreshToken(): Promise<TokenResponse>
getCurrentUser(): Promise<User>
```

#### `users.ts` - User API

```typescript
getUsers(): Promise<User[]>
getUserById(id): Promise<User>
updateUser(id, data): Promise<User>
deleteUser(id): Promise<void>
```

### Error Handling

API errors are handled with:

- Try-catch blocks in async functions
- Toast notifications for user feedback
- Automatic logout on authentication errors
- Retry logic for failed requests

---

## 🎨 Styling

### Tailwind CSS

Utility-first CSS framework configured with:

**Custom Theme (`tailwind.config.js`):**

- Custom color palette (primary, secondary, accent)
- Dark mode support
- Custom spacing and breakpoints
- Animation utilities

**Usage:**

```tsx
<button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
  Click Me
</button>
```

### CSS Utilities

**`cn()` Helper:**
Combines class names intelligently:

```tsx
import { cn } from "@/lib/utils";

cn("px-4 py-2", isActive && "bg-blue-500", className);
```

### Global Styles

**`index.css`:**

- Tailwind directives
- CSS variables for theming
- Global resets
- Custom scrollbar styles

**`App.css`:**

- Component-specific styles
- Animation keyframes
- Layout utilities

---

## 🔑 Environment Variables

Create a `.env` file in the frontend directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000

# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

**Getting Google OAuth Credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins: `http://localhost:5173`
6. Copy the Client ID to your `.env` file

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server at localhost:5173

# Building
npm run build           # Type-check and build for production
                        # Output: dist/

# Preview
npm run preview         # Preview production build locally

# Code Quality
npm run lint            # Run ESLint on src files
```

### Build Output

Production build creates optimized assets in `dist/`:

- Minified JavaScript bundles
- Optimized CSS
- Static assets
- Source maps (optional)

---

## 🏗️ Development Guide

### Adding a New Page

1. **Create page component** in `src/pages/`

   ```tsx
   // src/pages/NewPage.tsx
   export default function NewPage() {
     return <div>New Page</div>;
   }
   ```

2. **Export from index**

   ```tsx
   // src/pages/index.ts
   export { default as NewPage } from "./NewPage";
   ```

3. **Add route** in `App.tsx`
   ```tsx
   <Route
     path="/new"
     element={
       <ProtectedRoute>
         <NewPage />
       </ProtectedRoute>
     }
   />
   ```

### Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

Example:

```bash
npx shadcn@latest add card
```

### Form Validation with Zod

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
});
```

### Making API Calls

```tsx
import { useState } from "react";
import { getUsers } from "@/api/users";
import { toast } from "sonner";

function MyComponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Use fetchUsers...
}
```

---

## 🔍 Debugging

### Vite Dev Server

- Hot Module Replacement (HMR) for instant updates
- Error overlay in browser
- Source maps for debugging

### React DevTools

Install the React DevTools browser extension for:

- Component tree inspection
- Props and state viewing
- Performance profiling

### Network Inspection

Use browser DevTools Network tab to:

- Monitor API calls
- Inspect request/response headers
- Debug authentication tokens

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel
```

### Deploy to Netlify

```bash
netlify deploy --prod --dir=dist
```

### Environment Variables

Set production environment variables in your hosting platform:

- `VITE_API_URL` - Production backend URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [React Router](https://reactrouter.com/)

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Change port in vite.config.ts or kill process
lsof -ti:5173 | xargs kill
```

**Module not found:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**CORS errors:**

- Ensure backend allows `http://localhost:5173` origin
- Check `VITE_API_URL` in `.env`

**Google OAuth not working:**

- Verify Client ID in `.env`
- Check authorized origins in Google Console
- Clear browser cache

---

<div align="center">

**Part of the [Auth React NestJS](../../README.md) monorepo**

Made with ❤️ using React, TypeScript, and Vite

</div>
