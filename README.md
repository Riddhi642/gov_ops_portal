# Government Operations Portal

A modern, responsive Government Operations Portal built as part of the **7-4-3 Foundation UI Capability Sprint — Task 1**.

The application demonstrates frontend engineering fundamentals including modern React development, reusable component architecture, client-side routing, responsive dashboard design, state management, forms, search, filtering and CRUD-style interactions.

---

## 📌 Project Overview

The Government Operations Portal is a frontend web application designed to provide a centralized interface for managing government operational activities.

The portal provides different modules for managing citizens, projects, requests and officers, along with a dashboard that gives an operational overview through KPI cards and recent activity.

The project focuses on clean UI design, reusable React components, responsive layouts, maintainable code structure and a user-friendly government dashboard experience.

---

## 🎯 Objective

The main objectives of this project are:

- Learn and apply modern React development practices.
- Build a professional government operations dashboard.
- Implement reusable and maintainable components.
- Implement client-side routing.
- Create responsive layouts for desktop and mobile devices.
- Implement forms and CRUD-style frontend interactions.
- Add search and filtering functionality.
- Practice TypeScript for type-safe development.
- Use TailwindCSS for modern UI styling.
- Document the architecture, design decisions and learning process.

---

## ✨ Features

### Authentication / Login

- Login interface
- Client-side navigation to the dashboard
- Frontend-focused authentication flow

> Backend authentication and production identity management are outside the current evaluation scope.

### Dashboard

- Government operations overview
- KPI cards
- Citizens count
- Projects count
- Requests count
- Officers count
- Recent requests/activity section
- Responsive dashboard layout

### Citizen Management

- Add citizens
- Automatically generated Citizen ID
- Edit citizen information
- Delete citizens
- Search citizens
- Department selection
- Responsive data table
- View citizen information

### Project Management

- Add projects
- Edit projects
- Delete projects
- Search projects
- Department filtering
- Budget information
- Project status management
- Responsive project table

### Request Management

- Create requests
- Automatically generated Request ID
- Edit requests
- Delete requests
- Search requests
- Department filtering
- Status filtering
- Request description
- Request details page
- Responsive request table

### Officers

- Officer management interface
- Officer information display
- Operational management UI

### Profile

- User profile information
- Name
- Email
- Phone
- Department
- Profile update interaction

### Settings

- Email notification preferences
- Request alerts
- Compact mode
- Settings management interface

### Navigation

- Sidebar navigation
- Header
- React Router based navigation
- Nested dashboard layout
- Route-based pages
- Not Found page

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI development |
| TypeScript | Type-safe development |
| Vite | Development and build tooling |
| TailwindCSS | UI styling |
| shadcn/ui | UI component foundation |
| React Router | Client-side routing |
| Lucide React | Icons |
| JavaScript / TypeScript State | Client-side state management |

---

## 📁 Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── forms/
│   ├── layout/
│   └── ui/
│
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Citizens.tsx
│   ├── Projects.tsx
│   ├── Requests.tsx
│   ├── Officers.tsx
│   ├── Profile.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
│
├── layouts/
│   └── DashboardLayout.tsx
│
├── routes/
│   └── AppRoutes.tsx
│
├── hooks/
│
├── services/
│
├── types/
│
├── data/
│
├── utils/
│
└── styles/