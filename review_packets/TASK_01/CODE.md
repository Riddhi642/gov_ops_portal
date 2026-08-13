# Government Operations Portal — Code Packet

## 1. Purpose

This document identifies the key source files required to review the implementation of the Government Operations Portal.

The purpose is to provide reviewers with a focused view of the main application structure without requiring them to navigate through the entire repository.

---

## 2. Application Entry

### `src/main.tsx`

**Purpose:**

Application entry point.

It initializes the React application and mounts the root application component.

---

### `src/App.tsx`

**Purpose:**

Main application component.

It provides the top-level application structure and connects the application to the routing system where applicable.

---

## 3. Routing

### `src/routes/AppRoutes.tsx`

**Purpose:**

Defines the application's client-side routes.

It connects URLs to the corresponding pages and establishes the dashboard layout and nested routes.

Key responsibilities include:

* Route definitions
* Page mapping
* Nested routes
* Fallback route handling

---

## 4. Layout

### `src/layouts/DashboardLayout.tsx`

**Purpose:**

Provides the shared dashboard structure.

It combines:

* Sidebar
* Header
* Main content area
* React Router `Outlet`

Conceptually:

```text
DashboardLayout
├── Sidebar
├── Header
└── Outlet
```

---

## 5. Navigation Components

### `src/components/layout/Sidebar.tsx`

**Purpose:**

Provides the primary navigation menu.

It contains links to the main application sections.

---

### `src/components/layout/Header.tsx`

**Purpose:**

Provides the top-level dashboard header.

It is designed as a reusable layout component for dashboard pages.

---

## 6. Dashboard Components

### `src/components/dashboard/KPICard.tsx`

**Purpose:**

Reusable component for displaying key performance indicators.

It provides a consistent visual structure for dashboard statistics.

---

### `src/components/dashboard/RecentRequests.tsx`

**Purpose:**

Displays recent request information on the dashboard.

It separates request-related presentation from the main dashboard page.

---

## 7. Pages

### `src/pages/Login.tsx`

**Purpose:**

Provides the application login interface.

It handles the frontend login interaction and navigation to the dashboard.

---

### `src/pages/Dashboard.tsx`

**Purpose:**

Main operational dashboard.

It combines dashboard components and presents key operational information.

---

### `src/pages/Citizens.tsx`

**Purpose:**

Provides the citizens section of the portal.

---

### `src/pages/Projects.tsx`

**Purpose:**

Provides the projects section of the portal.

---

### `src/pages/Requests.tsx`

**Purpose:**

Provides the requests section of the portal.

---

### `src/pages/Officers.tsx`

**Purpose:**

Provides the officers section of the portal.

---

### `src/pages/Profile.tsx`

**Purpose:**

Provides the user profile interface.

---

### `src/pages/Settings.tsx`

**Purpose:**

Provides application/user settings functionality.

---

### `src/pages/NotFound.tsx`

**Purpose:**

Provides the fallback interface for unavailable routes.

---

## 8. Configuration Files

### `package.json`

**Purpose:**

Defines:

* Project metadata
* Dependencies
* Development dependencies
* npm scripts

Important scripts include:

```text
npm run dev
npm run build
npm run lint
npm run preview
```

---

### `vite.config.ts`

**Purpose:**

Contains Vite configuration used for development and production builds.

It also contains the project path alias configuration where applicable.

---

### `tsconfig.json`

**Purpose:**

Provides TypeScript project configuration.

It supports type checking and TypeScript project settings.

---

### `tsconfig.app.json`

**Purpose:**

Contains TypeScript configuration specific to the application source code.

---

### `eslint.config.js`

**Purpose:**

Provides linting configuration for maintaining code quality.

---

## 9. Styling Configuration

### Tailwind CSS Configuration

Tailwind CSS is integrated into the Vite application and is used throughout the project for styling and responsive layouts.

The styling approach primarily uses utility classes within React components.

---

## 10. Deployment Configuration

### `vercel.json`

**Purpose:**

Contains Vercel deployment configuration.

The configuration supports SPA routing so that client-side React Router routes can work correctly after deployment.

---

## 11. Key Files for Review

A reviewer can focus primarily on:

```text
src/
├── main.tsx
├── App.tsx
│
├── routes/
│   └── AppRoutes.tsx
│
├── layouts/
│   └── DashboardLayout.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   │
│   └── dashboard/
│       ├── KPICard.tsx
│       └── RecentRequests.tsx
│
└── pages/
    ├── Login.tsx
    ├── Dashboard.tsx
    ├── Citizens.tsx
    ├── Projects.tsx
    ├── Requests.tsx
    ├── Officers.tsx
    ├── Profile.tsx
    ├── Settings.tsx
    └── NotFound.tsx
```

---

## 12. Review Flow

Recommended review order:

```text
1. main.tsx
      ↓
2. App.tsx
      ↓
3. AppRoutes.tsx
      ↓
4. DashboardLayout.tsx
      ↓
5. Sidebar / Header
      ↓
6. Dashboard Components
      ↓
7. Pages
```

This order allows the reviewer to understand the application from entry point to routing, layout, reusable components and individual pages.

---

## 13. Review Scope

The code packet intentionally focuses on the key implementation files.

Supporting configuration, documentation and generated files are not reproduced here because they can be reviewed directly from the repository when required.

The selected files provide sufficient context to understand the primary frontend architecture and implementation approach.
