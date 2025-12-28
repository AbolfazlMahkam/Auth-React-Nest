# 🚀 Backend - NestJS Authentication API

<div align="center">

![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

A robust, scalable REST API built with NestJS, TypeORM, and PostgreSQL with JWT authentication and Google OAuth.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [Database](#-database)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Testing](#-testing)

---

## 🎯 Overview

This is the backend REST API for the Auth React NestJS project. It provides a complete authentication system with user management, built following NestJS best practices and clean architecture principles.

**Key Highlights:**
- 🔐 Secure JWT-based authentication
- 🌐 Google OAuth 2.0 integration
- 🗄️ TypeORM with PostgreSQL
- 🛡️ Request validation with class-validator
- 📝 Comprehensive logging
- 🧪 Unit and E2E testing setup
- 🏗️ Modular architecture
- 🔒 Password hashing with bcryptjs

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT Authentication** - Stateless authentication with access & refresh tokens
- **Passport.js Integration** - Strategic authentication handling
- **Password Hashing** - bcryptjs with salt rounds
- **Google OAuth 2.0** - Third-party authentication
- **Session Management** - Express sessions for OAuth flow
- **Guards & Decorators** - Route protection and user injection
- **Token Refresh** - Automatic token renewal

### 👥 User Management
- **CRUD Operations** - Create, Read, Update, Delete users
- **User Registration** - Validated user signup
- **Profile Management** - Update user information
- **User Listing** - Paginated user retrieval
- **Soft Delete** - Safe user deletion (if implemented)

### 🛡️ Validation & Error Handling
- **DTO Validation** - class-validator for request validation
- **Global Exception Filter** - Centralized error handling
- **Custom Validation Pipes** - Transform and validate payloads
- **Typed Responses** - Consistent API response structure

### 📊 Infrastructure
- **TypeORM** - Database ORM with migration support
- **Database Entities** - Type-safe database models
- **Dependency Injection** - NestJS IoC container
- **Configuration Module** - Environment-based configuration
- **Custom Logger** - Structured logging service

---

## 🛠️ Tech Stack

### Core
- **NestJS** 11.0.1 - Progressive Node.js framework
- **TypeScript** 5.7.3 - Strongly typed JavaScript
- **Node.js** ≥18.0.0 - Runtime environment

### Database & ORM
- **TypeORM** 11.0.0 - TypeScript ORM
- **PostgreSQL** (via pg 8.16.3) - Relational database
- **Class Transformer** - Object transformation
- **Class Validator** - DTO validation

### Authentication
- **Passport** 0.7.0 - Authentication middleware
- **Passport JWT** 4.0.1 - JWT strategy
- **@nestjs/jwt** 11.0.2 - JWT utilities
- **@nestjs/passport** 11.0.5 - Passport integration
- **bcryptjs** 3.0.3 - Password hashing
- **Google Auth Library** 10.5.0 - Google OAuth verification
- **Express Session** 1.18.2 - Session management

### Development & Testing
- **Jest** 30.0.0 - Testing framework
- **Supertest** 7.0.0 - HTTP assertions
- **ts-jest** 29.2.5 - TypeScript Jest transformer
- **@nestjs/testing** - NestJS testing utilities
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥18.0.0
- **npm** ≥10.9.2
- **PostgreSQL** ≥14.0 (or any TypeORM-supported database)

### Installation

1. **Navigate to backend directory**
   ```bash
   cd apps/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb auth_db

   # Or using psql
   psql -U postgres
   CREATE DATABASE auth_db;
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your credentials (see [Environment Variables](#-environment-variables))

5. **Run migrations** (if applicable)
   ```bash
   npm run migration:run
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
apps/backend/
├── src/
│   ├── auth/                   # Authentication module
│   │   ├── dto/               # Data Transfer Objects
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   └── google-auth.dto.ts
│   │   ├── strategies/        # Passport strategies
│   │   │   ├── jwt.strategy.ts
│   │   │   └── google.strategy.ts
│   │   ├── auth.controller.ts # Auth endpoints
│   │   ├── auth.service.ts    # Auth business logic
│   │   └── auth.module.ts     # Auth module definition
│   │
│   ├── users/                  # Users module
│   │   ├── dto/               # User DTOs
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   ├── jwt-auth/               # JWT authentication
│   │   ├── jwt-auth.guard.ts  # JWT guard
│   │   ├── jwt-auth.decorator.ts # User decorator
│   │   └── jwt-auth.module.ts
│   │
│   ├── entities/               # TypeORM entities
│   │   ├── user.entity.ts     # User entity
│   │   └── index.ts
│   │
│   ├── logger/                 # Custom logger
│   │   ├── logger.service.ts
│   │   └── logger.module.ts
│   │
│   ├── app.controller.ts       # Root controller
│   ├── app.service.ts          # Root service
│   ├── app.module.ts           # Root module
│   └── main.ts                 # Application entry point
│
├── test/                       # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── dist/                       # Compiled output
│
├── .env                        # Environment variables (gitignored)
├── .env.example               # Environment template
├── .prettierrc                # Prettier config
├── eslint.config.mjs          # ESLint config
├── nest-cli.json              # NestJS CLI config
├── tsconfig.json              # TypeScript config
├── tsconfig.build.json        # Build TypeScript config
└── package.json               # Dependencies and scripts
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

#### Google OAuth Login
```http
POST /auth/google
Content-Type: application/json

{
  "credential": "google_oauth_token_here"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <access_token>

Response: 200 OK
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

### User Endpoints

#### Get All Users
```http
GET /users
Authorization: Bearer <access_token>

Response: 200 OK
[
  {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  ...
]
```

#### Get User by ID
```http
GET /users/:id
Authorization: Bearer <access_token>

Response: 200 OK
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Update User
```http
PATCH /users/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}

Response: 200 OK
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

#### Delete User
```http
DELETE /users/:id
Authorization: Bearer <access_token>

Response: 200 OK
{
  "message": "User deleted successfully"
}
```

---

## 🔐 Authentication

### JWT Strategy

The API uses JWT (JSON Web Tokens) for stateless authentication:

1. **Access Token** - Short-lived (1 hour), used for API requests
2. **Refresh Token** - Long-lived (7 days), used to obtain new access tokens

### Token Flow

```
1. User logs in → Receives access_token + refresh_token
2. Client stores tokens (localStorage/cookie)
3. Client includes access_token in Authorization header
4. Access token expires → Client uses refresh_token to get new access_token
5. Refresh token expires → User must log in again
```

### Guards

**`JwtAuthGuard`**
Protects routes requiring authentication:

```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@CurrentUser() user: User) {
  return user;
}
```

**`@CurrentUser()` Decorator**
Injects authenticated user into route handlers:

```typescript
@Get('me')
getCurrentUser(@CurrentUser() user: User) {
  return user;
}
```

### Password Security

- Passwords hashed using **bcryptjs**
- Salt rounds: **10**
- Passwords never stored in plain text
- Passwords never returned in API responses

---

## 🗄️ Database

### TypeORM Configuration

TypeORM is configured in `app.module.ts` using environment variables:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  synchronize: process.env.NODE_ENV === 'development',
})
```

### User Entity

**`user.entity.ts`**
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  googleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Migrations

Generate migration:
```bash
npm run migration:generate -- -n MigrationName
```

Run migrations:
```bash
npm run migration:run
```

Revert migration:
```bash
npm run migration:revert
```

---

## 🔑 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_db_password
DB_DATABASE=auth_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRATION=1h
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_change_in_production
JWT_REFRESH_EXPIRATION=7d

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Session Configuration
SESSION_SECRET=your_session_secret_change_in_production

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:5173
```

### Security Notes

- **Never commit `.env` to version control**
- Use strong, random secrets in production
- Rotate secrets regularly
- Use different secrets for development/production

### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable Google+ API
4. Navigate to Credentials → Create OAuth 2.0 Client ID
5. Add authorized redirect URIs
6. Copy Client ID and Client Secret to `.env`

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start in watch mode with hot reload
npm run start:debug      # Start with debugger attached

# Building
npm run build           # Compile TypeScript to JavaScript (dist/)

# Production
npm run start           # Start compiled application
npm run start:prod      # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier

# Testing
npm run test            # Run unit tests
npm run test:watch      # Run tests in watch mode
npm run test:cov        # Generate coverage report
npm run test:e2e        # Run end-to-end tests
npm run test:debug      # Debug tests
```

---

## 🧪 Testing

### Unit Tests

Located alongside source files with `.spec.ts` extension:

```typescript
// auth.service.spec.ts
describe('AuthService', () => {
  it('should hash password correctly', async () => {
    const password = 'test123';
    const hashed = await authService.hashPassword(password);
    expect(hashed).not.toBe(password);
  });
});
```

Run unit tests:
```bash
npm run test
```

### E2E Tests

Located in `test/` directory:

```typescript
// app.e2e-spec.ts
describe('Auth (e2e)', () => {
  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'test' })
      .expect(200);
  });
});
```

Run E2E tests:
```bash
npm run test:e2e
```

### Test Coverage

Generate coverage report:
```bash
npm run test:cov
```

View coverage in `coverage/lcov-report/index.html`

---

## 🏗️ Development Guide

### Creating a New Module

```bash
nest generate module feature
nest generate controller feature
nest generate service feature
```

### Creating a DTO

```typescript
// create-feature.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
```

### Creating an Entity

```typescript
// feature.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

### Protecting a Route

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';
import { CurrentUser } from '../jwt-auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Get('protected')
getProtected(@CurrentUser() user: User) {
  return { message: 'This is protected', user };
}
```

---

## 📚 NestJS Concepts

### Modules
Organize application into feature-based modules with controllers, services, and providers.

### Controllers
Handle incoming requests and return responses to the client.

### Services (Providers)
Contain business logic and interact with the database.

### Guards
Determine whether a request should be handled by the route handler.

### Interceptors
Transform or modify incoming requests or outgoing responses.

### Pipes
Transform and validate input data.

### Middleware
Execute code before route handlers.

---

## 🔧 Configuration

### CORS

Enable CORS in `main.ts`:

```typescript
app.enableCors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
});
```

### Global Validation Pipe

Validate all DTOs automatically:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
);
```

### Global Prefix

Add `/api` prefix to all routes:

```typescript
app.setGlobalPrefix('api');
```

---

## 🐛 Troubleshooting

### Database Connection Failed
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists

### JWT Token Invalid
- Check JWT_SECRET matches between environments
- Verify token hasn't expired
- Ensure token format is correct (Bearer <token>)

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables

Set production environment variables in your hosting platform.

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
CMD ["node", "dist/main"]
```

### Database Migrations

Run migrations before starting the application:

```bash
npm run migration:run
NODE_ENV=production npm run start:prod
```

---

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Passport.js Documentation](http://www.passportjs.org/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

<div align="center">

**Part of the [Auth React NestJS](../../README.md) monorepo**

Built with ❤️ using NestJS, TypeScript, and PostgreSQL

</div>
