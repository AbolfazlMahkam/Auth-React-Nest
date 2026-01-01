# 🔐 Auth React NestJS - Full-Stack Authentication System

<div align="center">

[![My Skills](https://skillicons.dev/icons?i=ts,react,nestjs,tailwind,postgres)]()

![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)

A modern, full-stack authentication system built with React, NestJS, and TypeScript in a monorepo architecture powered by Turborepo.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Documentation](#-documentation)

</div>

---

## ✨ Features

### 🔒 Authentication & Authorization

- **Email/Password Authentication** - Secure user registration and login
- **Phone OTP Authentication** - One-time password login via phone number
- **Google OAuth 2.0** - One-click sign-in with Google
- **JWT-based Sessions** - Stateless authentication with refresh tokens
- **Global Authentication Guards** - Automatic JWT validation on all routes
- **Role-Based Access Control (RBAC)** - Fine-grained permission system
- **Custom Decorators** - `@Public()`, `@Roles()`, `@GetUser()` for clean code
- **Password Encryption** - Industry-standard bcrypt hashing
- **Token Expiration Handling** - Custom error messages for expired/invalid tokens

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
   DB_TYPE=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_DATABASE=auth_db
   DB_SYNCHRONIZE=false  # Use migrations instead of auto-sync

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRATION=1h
   JWT_REFRESH_SECRET=your_refresh_token_secret_here
   JWT_REFRESH_EXPIRATION=7d

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id_here

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
│   │   │   │   ├── strategies/  # JWT strategy
│   │   │   │   └── dto/     # Data transfer objects
│   │   │   ├── users/       # Users module
│   │   │   ├── common/      # Shared resources
│   │   │   │   ├── guards/  # Authentication & authorization guards
│   │   │   │   │   ├── jwt-auth.guard.ts  # JWT authentication guard
│   │   │   │   │   └── roles.guard.ts     # Role-based access control
│   │   │   │   ├── decorators/  # Custom decorators
│   │   │   │   │   ├── public.decorator.ts   # @Public() decorator
│   │   │   │   │   ├── roles.decorator.ts    # @Roles() decorator
│   │   │   │   │   └── get-user.decorator.ts # @GetUser() decorator
│   │   │   │   └── pipes/   # Validation pipes
│   │   │   │       ├── user-exists.pipe.ts         # User existence validation
│   │   │   │       ├── unique-email.pipe.ts        # Email uniqueness validation
│   │   │   │       ├── unique-phone.pipe.ts        # Phone uniqueness validation
│   │   │   │       ├── user-exists-by-email.pipe.ts # Login user validation
│   │   │   │       ├── user-exists-by-phone.pipe.ts # OTP user validation
│   │   │   │       ├── password-validation.pipe.ts  # Password verification
│   │   │   │       └── otp-code-validation.pipe.ts  # OTP code verification
│   │   │   ├── entities/    # TypeORM entities
│   │   │   ├── migrations/  # Database migrations
│   │   │   ├── logger/      # Custom logger service
│   │   │   ├── data-source.ts  # TypeORM DataSource for migrations
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
# Development
npm run dev             # Start NestJS in watch mode
npm run build           # Build backend
npm run start           # Start production server
npm run start:debug     # Start with debugger

# Testing
npm run test            # Run unit tests
npm run test:e2e        # Run end-to-end tests
npm run test:cov        # Generate test coverage

# Code Quality
npm run lint            # Lint backend code

# Database Migrations
npm run migration:generate -- src/migrations/Name  # Generate migration from schema
npm run migration:create -- src/migrations/Name    # Create empty migration
npm run migration:run          # Run pending migrations
npm run migration:revert       # Revert last migration
npm run migration:show         # Show migration status
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

The backend uses TypeORM with migrations for database management. Database synchronization is **disabled** to ensure safe, version-controlled schema changes.

#### Initial Setup

1. **Create a PostgreSQL database**

   ```bash
   createdb auth_db
   ```

2. **Update `.env` with your database credentials**

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_DATABASE=auth_db
   DB_SYNCHRONIZE=false  # Always false - use migrations instead
   ```

3. **Install dependencies**

   ```bash
   cd apps/backend
   npm install
   ```

4. **Run migrations**
   ```bash
   cd apps/backend
   npm run migration:run
   ```

#### Migration Commands

The project includes the following migration scripts:

```bash
# Generate a new migration from entity changes
npm run migration:generate -- src/migrations/DescriptiveName

# Create an empty migration file
npm run migration:create -- src/migrations/DescriptiveName

# Run all pending migrations
npm run migration:run

# Revert the last executed migration
npm run migration:revert

# Show all migrations and their status
npm run migration:show
```

#### Migration Workflow

1. **Modify your entities** - Update files in `src/entities/`
2. **Generate migration** - Run `npm run migration:generate -- src/migrations/YourMigrationName`
3. **Review the generated migration** - Check the SQL queries in the new migration file
4. **Run the migration** - Execute `npm run migration:run`
5. **Commit the migration** - Add the migration file to version control

**Note:** Migrations run automatically on application startup via `migrationsRun: true` in the TypeORM configuration.

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

### Phone OTP Authentication Flow

1. **Request OTP**
   - User enters their phone number
   - Backend generates a 4-digit OTP code
   - OTP code stored in database with phone number
   - Code returned to frontend (for development/testing)

2. **Verify OTP**
   - User enters the 4-digit OTP code
   - Backend validates phone number + OTP combination
   - OTP marked as used in database
   - JWT access token generated and returned
   - Frontend stores token and updates auth state

3. **Features**
   - 4-digit numeric OTP codes
   - One-time use codes (marked as used after verification)
   - 60-second resend timer
   - Development mode displays OTP for testing

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

## 🛡️ Authentication Guards System

The application implements a comprehensive, multi-layered authentication and authorization system with global guards and custom decorators.

### Guard Architecture

#### 1. **JWT Authentication Guard** (Global)

- Automatically applied to all routes
- Validates JWT tokens from Authorization header
- Supports public routes via `@Public()` decorator
- Custom error handling for expired/invalid tokens

#### 2. **Roles Guard** (Global)

- Enforces role-based access control (RBAC)
- Works with `@Roles()` decorator
- Checks user roles against required roles
- Provides descriptive error messages

### Custom Decorators

#### `@Public()` - Mark Routes as Public

```typescript
@Public()
@Post('login')
login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}
```

Routes marked with `@Public()` bypass authentication.

#### `@Roles(...roles)` - Role-Based Access Control

```typescript
@Roles('admin', 'super_admin')
@Get()
findAll() {
  return this.usersService.findAll();
}
```

Only users with specified roles can access the endpoint.

#### `@GetUser(field?)` - Extract User from Request

```typescript
@Get('me')
getProfile(@GetUser('id') userId: number) {
  return this.authService.getProfile(userId);
}

// Get entire user object
getProfile(@GetUser() user: any) {
  // user = { id, email, role }
}
```

### Role Hierarchy

- **user** - Standard user (default role)
- **admin** - Administrative user with elevated privileges
- **super_admin** - Highest level admin with full access

### Endpoint Protection Examples

#### Public Endpoints (No Authentication Required)

```typescript
POST /auth/register     - User registration
POST /auth/login        - Email/password login
POST /auth/login_otp    - Phone OTP login
POST /auth/google       - Google OAuth login
```

#### Protected Endpoints (Authentication Required)

```typescript
GET /auth/me           - Get current user profile
GET /users/:id         - Get user by ID (own profile or admin)
PATCH /users/:id       - Update user (own profile or admin)
```

#### Admin-Only Endpoints

```typescript
GET /users             - List all users (admin, super_admin)
POST /users            - Create user (admin, super_admin)
DELETE /users/:id      - Delete user (admin, super_admin)
```

#### Super Admin-Only Endpoints

```typescript
GET /users/admins/list - List all admins (super_admin only)
```

### JWT Token Structure

```json
{
  "sub": 123, // User ID
  "email": "user@example.com",
  "role": "admin", // User role
  "iat": 1234567890, // Issued at
  "exp": 1234571490 // Expiration
}
```

### Error Responses

**401 Unauthorized** - Invalid/missing token

```json
{
  "statusCode": 401,
  "message": "Token has expired"
}
```

**403 Forbidden** - Insufficient permissions

```json
{
  "statusCode": 403,
  "message": "Access denied: Requires one of the following roles: admin, super_admin"
}
```

### Security Features

- ✅ Global JWT authentication on all routes by default
- ✅ Role-based access control (RBAC)
- ✅ Explicit public route marking with `@Public()`
- ✅ Custom error messages for better debugging
- ✅ Token expiration handling
- ✅ Reflector-based metadata for decorators
- ✅ TypeScript type safety throughout

---

## 🔍 Validation Pipes Architecture

The application implements a **pipe-based validation architecture** that separates validation concerns from business logic, providing clean, reusable, and testable code.

### Why Pipes for Validation?

Traditional validation in services leads to:
- ❌ Repeated validation code across services
- ❌ Mixed concerns (validation + business logic)
- ❌ Harder to test and maintain
- ❌ Late failure (validation happens inside service methods)

Our pipe-based approach provides:
- ✅ **Separation of Concerns** - Validation separated from business logic
- ✅ **Fail-Fast** - Validation happens before entering service layer
- ✅ **Reusability** - Write once, use anywhere
- ✅ **Type Safety** - DTOs enriched with validated entities
- ✅ **Single Responsibility** - Each pipe validates one thing

### Available Validation Pipes

#### 1. **UserExistsPipe** - Entity Existence Validation

Validates that a user exists by ID (route parameter) and returns the loaded entity.

```typescript
// apps/backend/src/common/pipes/user-exists.pipe.ts
@Get(':id')
findOne(@Param('id', UserExistsPipe) user: Users) {
  return user; // User already loaded and validated by pipe
}
```

**Applied to:**
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user profile
- `DELETE /users/:id` - Delete user

**Benefits:**
- No need to check `if (!user)` in controllers/services
- User entity pre-loaded for use
- Consistent 404 error responses

---

#### 2. **UniqueEmailPipe** - Email Uniqueness Validation

Validates that an email doesn't already exist in the database.

```typescript
// Automatically applied to registration and user creation
@Post('register')
@UsePipes(UniqueEmailPipe, UniquePhonePipe)
register(@Body() registerDto: RegisterDto) {
  return this.authService.register(registerDto);
}
```

**Applied to:**
- `POST /auth/register` - User registration
- `POST /users` - Admin user creation

**Throws:** `400 Bad Request` - "Email already exists"

---

#### 3. **UniquePhonePipe** - Phone Uniqueness Validation

Validates that a phone number doesn't already exist in the database.

**Applied to:**
- `POST /auth/register` - User registration
- `POST /users` - Admin user creation

**Throws:** `400 Bad Request` - "Phone number already exists"

---

#### 4. **UserExistsByEmailPipe** - Login User Validation

Validates user exists by email and pre-loads the user entity with password for authentication.

```typescript
@Post('login')
@UsePipes(UserExistsByEmailPipe, PasswordValidationPipe)
login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}

// In service - user already loaded!
async login(loginDto: LoginDto) {
  const user = loginDto._user!; // Pre-loaded by pipe
  // Just generate JWT, validation done!
}
```

**Applied to:** `POST /auth/login`

**Benefits:**
- Single database query (pipe loads user once)
- User attached to DTO as `_user` property
- Service focuses on JWT generation, not validation

---

#### 5. **UserExistsByPhonePipe** - OTP Login User Validation

Validates user exists by phone number and pre-loads the user entity for OTP authentication.

**Applied to:** `POST /auth/login_otp`

**DTO Enhancement:**
```typescript
export class LoginByOtpDto {
  phone: string;
  code?: number;

  _user?: Users; // Populated by UserExistsByPhonePipe
  _validatedCode?: Codes; // Populated by OtpCodeValidationPipe
}
```

---

#### 6. **PasswordValidationPipe** - Password Verification

Validates that the provided password matches the user's hashed password.

```typescript
// Applied in combination with UserExistsByEmailPipe
@Post('login')
@UsePipes(UserExistsByEmailPipe, PasswordValidationPipe)
login(@Body() loginDto: LoginDto) { ... }
```

**Applied to:** `POST /auth/login`

**Throws:** `400 Bad Request` - "Wrong Password"

**How it works:**
1. `UserExistsByEmailPipe` loads user with password
2. `PasswordValidationPipe` verifies password using bcrypt
3. Service receives pre-validated credentials

---

#### 7. **OtpCodeValidationPipe** - OTP Code Verification

Validates that the OTP code is valid, unused, and matches the phone number.

```typescript
@Post('login_otp')
@UsePipes(UserExistsByPhonePipe, OtpCodeValidationPipe)
loginByOtp(@Body() loginByOtpDto: LoginByOtpDto) { ... }
```

**Applied to:** `POST /auth/login_otp` (when code is provided)

**Throws:** `400 Bad Request` - "code is not valid"

**Validation checks:**
- Code exists in database
- Code matches phone number
- Code has not been used (`is_used: false`)

---

### Pipe Execution Flow

#### Example: User Login

```typescript
// 1. Request arrives
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// 2. Pipes execute in order
@UsePipes(UserExistsByEmailPipe, PasswordValidationPipe)

// 3. UserExistsByEmailPipe
//    - Queries database for user by email
//    - If not found: throws 404 "User not found"
//    - If found: attaches user to loginDto._user

// 4. PasswordValidationPipe
//    - Compares password with loginDto._user.password
//    - If mismatch: throws 400 "Wrong Password"
//    - If match: continues

// 5. Controller receives validated DTO
login(@Body() loginDto: LoginDto) {
  // loginDto._user is guaranteed to exist and be authenticated
}

// 6. Service focuses on business logic
async login(loginDto: LoginDto) {
  const user = loginDto._user!; // No validation needed!
  return { access_token: this.jwtService.sign({...}) };
}
```

---

### Before vs After Comparison

#### ❌ Before: Validation in Services

```typescript
// Repetitive validation in every service method
async login(loginDto: LoginDto) {
  // Validation #1: User exists?
  const user = await this.usersService.findUserByEmail(loginDto.email);
  if (!user) {
    throw new HttpException('User not found', 404);
  }

  // Validation #2: Password correct?
  const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);
  if (!isPasswordMatch) {
    throw new HttpException('Wrong Password', 400);
  }

  // Finally, business logic
  return { access_token: this.jwtService.sign({...}) };
}
```

**Problems:**
- 🔴 Validation mixed with business logic
- 🔴 Repeated `if (!user)` checks everywhere
- 🔴 Hard to test validation separately
- 🔴 Late failure (validation deep in service)

---

#### ✅ After: Validation in Pipes

```typescript
// Controller: Declare validation pipeline
@Post('login')
@UsePipes(UserExistsByEmailPipe, PasswordValidationPipe)
login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}

// Service: Pure business logic
async login(loginDto: LoginDto) {
  const user = loginDto._user!; // Pre-validated and loaded!
  return { access_token: this.jwtService.sign({...}) };
}
```

**Benefits:**
- 🟢 Validation separated from business logic
- 🟢 No repetitive checks in services
- 🟢 Easy to test pipes independently
- 🟢 Fail-fast at controller level
- 🟢 Clean, readable service methods

---

### Project Structure

```
apps/backend/src/
├── common/
│   └── pipes/                          # All validation pipes
│       ├── user-exists.pipe.ts         # Route param validation
│       ├── unique-email.pipe.ts        # Email uniqueness
│       ├── unique-phone.pipe.ts        # Phone uniqueness
│       ├── user-exists-by-email.pipe.ts # Login user validation
│       ├── user-exists-by-phone.pipe.ts # OTP user validation
│       ├── password-validation.pipe.ts  # Password verification
│       └── otp-code-validation.pipe.ts  # OTP code verification
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts               # Enhanced with _user property
│   │   └── login-otp.dto.ts           # Enhanced with _user, _validatedCode
│   ├── auth.controller.ts             # Pipes applied via @UsePipes()
│   └── auth.service.ts                # Pure business logic, no validation
└── users/
    ├── users.controller.ts            # Pipes applied to route params
    └── users.service.ts               # No HttpException throws!
```

---

### Best Practices

#### 1. **Compose Pipes for Complex Validation**

```typescript
// Multiple pipes execute in sequence
@Post('register')
@UsePipes(UniqueEmailPipe, UniquePhonePipe)
register(@Body() registerDto: RegisterDto) { ... }
```

#### 2. **Enrich DTOs with Validated Data**

```typescript
// Pipe attaches validated entities to DTO
export class LoginDto {
  email: string;
  password: string;

  _user?: Users; // Populated by pipe
}

// Service accesses pre-loaded data
const user = loginDto._user!;
```

#### 3. **Keep Pipes Focused**

Each pipe validates **one thing**:
- ✅ `UserExistsPipe` - User exists by ID
- ✅ `UniqueEmailPipe` - Email is unique
- ❌ Don't create: `UserValidationPipe` that does everything

#### 4. **Register Pipes as Providers**

```typescript
// auth.module.ts
@Module({
  providers: [
    AuthService,
    UserExistsByEmailPipe,
    PasswordValidationPipe,
    // ... other pipes
  ],
})
export class AuthModule {}
```

#### 5. **Use Appropriate HTTP Status Codes**

- `NotFoundException (404)` - Entity not found
- `BadRequestException (400)` - Validation failed (duplicate, invalid data)
- `UnauthorizedException (401)` - Authentication failed

---

### Exception Handling

All validation pipes throw standard NestJS exceptions:

```json
// 404 Not Found
{
  "statusCode": 404,
  "message": "User not found"
}

// 400 Bad Request
{
  "statusCode": 400,
  "message": "Email already exists"
}

// 400 Bad Request
{
  "statusCode": 400,
  "message": "Wrong Password"
}
```

---

### Testing Validation Pipes

Pipes can be tested independently:

```typescript
describe('UserExistsPipe', () => {
  let pipe: UserExistsPipe;
  let repository: Repository<Users>;

  it('should throw NotFoundException if user does not exist', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(pipe.transform(999, {} as ArgumentMetadata))
      .rejects.toThrow(NotFoundException);
  });

  it('should return user if exists', async () => {
    const user = { id: 1, email: 'test@example.com' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(user);

    const result = await pipe.transform(1, {} as ArgumentMetadata);
    expect(result).toEqual(user);
  });
});
```

---

### Summary

| Feature | Before (Services) | After (Pipes) |
|---------|------------------|---------------|
| **Validation Location** | Inside services | At controller level |
| **Code Repetition** | High (repeated checks) | None (reusable pipes) |
| **Separation of Concerns** | Mixed | Clean separation |
| **Failure Timing** | Late (in service) | Early (before service) |
| **Testability** | Coupled with business logic | Pipes tested independently |
| **Service Complexity** | High (validation + logic) | Low (pure logic) |
| **Type Safety** | Manual null checks | DTOs enriched with entities |

**Result:** Clean, maintainable, testable code with zero validation repetition! 🎉

---

## 📚 Documentation

### API Documentation

Once the backend is running, you can explore the API:

- **Base URL:** `http://localhost:3000`

#### Auth Endpoints (Public)

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user (email/password)
- `POST /auth/login_otp` - Phone OTP login (request & verify)
- `POST /auth/google` - Google OAuth login

#### Auth Endpoints (Protected)

- `GET /auth/me` - Get current user profile
  - **Requires:** Authentication
  - **Roles:** Any authenticated user

#### User Endpoints

**Public Access:**

- None - All user endpoints require authentication

**Authenticated User Access:**

- `GET /users/:id` - Get user by ID (own profile or admin)
  - **Requires:** Authentication
  - **Roles:** Any authenticated user (can view own profile)
- `PATCH /users/:id` - Update user profile
  - **Requires:** Authentication
  - **Roles:** Any authenticated user (can update own profile)

**Admin Access:**

- `GET /users` - Get all users
  - **Requires:** Authentication
  - **Roles:** `admin`, `super_admin`
- `POST /users` - Create new user
  - **Requires:** Authentication
  - **Roles:** `admin`, `super_admin`
- `DELETE /users/:id` - Delete user
  - **Requires:** Authentication
  - **Roles:** `admin`, `super_admin`

**Super Admin Access:**

- `GET /users/admins/list` - List all admins
  - **Requires:** Authentication
  - **Roles:** `super_admin`

#### Phone OTP Login API Examples

**Step 1: Request OTP**

```bash
curl -X POST http://localhost:3000/auth/login_otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890"}'

# Response:
{
  "code": 1234  # 4-digit OTP (in development mode)
}
```

**Step 2: Verify OTP**

```bash
curl -X POST http://localhost:3000/auth/login_otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890", "code": 1234}'

# Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Notes:**

- Phone number must match a registered user in the database
- OTP codes are 4-digit numbers (1000-9999)
- Each OTP can only be used once
- In production, OTP should be sent via SMS service (e.g., Twilio)

### Component Library

The frontend uses shadcn/ui components. Available components:

- Button, Input, Label, Select, Checkbox
- Dialog, Alert Dialog, Dropdown Menu
- Avatar, Separator, Card
- Toast notifications via Sonner

See `apps/frontend/README.md` for frontend-specific documentation.

---

## 👨‍💻 Developer Guide

### Adding a New Protected Endpoint

**Example: Creating an admin-only dashboard endpoint**

```typescript
// users.controller.ts
import { Controller, Get } from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { GetUser } from "../common/decorators/get-user.decorator";

@Controller("dashboard")
export class DashboardController {
  // Admin-only endpoint
  @Roles("admin", "super_admin")
  @Get("stats")
  getDashboardStats(@GetUser() user: any) {
    return {
      message: `Welcome ${user.email}`,
      role: user.role,
    };
  }

  // Public endpoint
  @Public()
  @Get("health")
  healthCheck() {
    return { status: "ok" };
  }

  // Any authenticated user
  @Get("my-activity")
  getMyActivity(@GetUser("id") userId: number) {
    return this.service.getUserActivity(userId);
  }
}
```

### Testing Protected Endpoints

**1. Get an access token:**

```bash
# Login to get token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'

# Response: { "access_token": "eyJhbGc..." }
```

**2. Use the token in requests:**

```bash
# Access protected endpoint
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer eyJhbGc..."

# Access admin endpoint
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer eyJhbGc..."
```

### Creating Custom Guards

**Example: Owner-only guard (users can only access their own resources)**

```typescript
// owner.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = parseInt(request.params.id);

    // Allow if admin or owner
    if (user.role === 'admin' || user.role === 'super_admin') {
      return true;
    }

    if (user.id !== resourceId) {
      throw new ForbiddenException('You can only access your own resources');
    }

    return true;
  }
}

// Usage in controller
@UseGuards(OwnerGuard)
@Patch(':id')
updateProfile(@Param('id') id: number, @Body() updateDto: UpdateUserDto) {
  return this.usersService.update(id, updateDto);
}
```

### Best Practices

1. **Always use `@Public()` explicitly** for public endpoints

   ```typescript
   @Public()  // Clear indication this is intentionally public
   @Post('register')
   ```

2. **Use `@GetUser()` instead of `@Request()`** for cleaner code

   ```typescript
   // ✅ Good
   getProfile(@GetUser('id') userId: number)

   // ❌ Avoid
   getProfile(@Request() req) { const userId = req.user.id; }
   ```

3. **Order guards from most general to most specific**

   ```typescript
   // Global guards (in app.module.ts)
   APP_GUARD → JwtAuthGuard → RolesGuard

   // Controller-level guards
   @UseGuards(OwnerGuard)  // Applied after global guards
   ```

4. **Test with different roles** during development
   - Create test users with different roles
   - Verify 401 Unauthorized for missing tokens
   - Verify 403 Forbidden for insufficient permissions

5. **Document role requirements** in your API docs
   ```typescript
   /**
    * Get all users
    * @requires Authentication
    * @roles admin, super_admin
    */
   @Roles('admin', 'super_admin')
   @Get()
   findAll() { }
   ```

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
