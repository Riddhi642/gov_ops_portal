# Government Operations Portal — Folder Structure

## 1. Project Overview

The Government Operations Portal is a modern frontend application developed using React, TypeScript, Vite and TailwindCSS.

The project follows a component-driven structure where pages, reusable components, layouts, routing and documentation are organized into separate directories.

The structure is designed to keep the application maintainable, readable and easy for another developer to continue.

---

## 2. Project Root Structure

```text
Government-Operations-Portal/
│
├── public/
│   └── ...
│
├── src/
│   │
│   ├── assets/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   │   ├── KPICard.tsx
│   │   │   └── RecentRequests.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── forms/
│   │   └── ui/
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Citizens.tsx
│   │   ├── Projects.tsx
│   │   ├── Requests.tsx
│   │   ├── Officers.tsx
│   │   ├── Profile.tsx
│   │   ├── Settings.tsx
│   │   └── NotFound.tsx
│   │
│   ├── layouts/
│   │   └── ...
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── hooks/
│   │   └── ...
│   │
│   ├── services/
│   │   └── ...
│   │
│   ├── types/
│   │   └── ...
│   │
│   ├── data/
│   │   └── ...
│   │
│   ├── utils/
│   │   └── ...
│   │
│   ├── styles/
│   │   └── ...
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── docs/
│   └── folderstructure.md
│
├── review_packets/
│   └── ...
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
└── README.md