# Government Operations Portal — Build Instructions

## 1. Overview

This document explains how to set up, run, build and preview the Government Operations Portal locally.

The project is built using React, TypeScript, Vite and Tailwind CSS.

---

## 2. Prerequisites

Before running the project, ensure the following are installed:

* Node.js
* npm
* Git

The recommended environment should support the Node.js version used during project development.

To verify the installations:

```bash
node --version
npm --version
git --version
```

---

## 3. Clone the Repository

Clone the project repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd Government-Operations-Portal
```

Replace `<repository-url>` with the actual Git repository URL.

---

## 4. Install Dependencies

Install all project dependencies using npm:

```bash
npm install
```

This installs the dependencies listed in `package.json`.

---

## 5. Start Development Server

Run the Vite development server:

```bash
npm run dev
```

Vite will start the local development server.

The terminal will display the local URL, typically similar to:

```text
http://localhost:5173/
```

Open the displayed URL in a browser.

---

## 6. Development Workflow

During development, changes made to the source files are reflected in the browser through Vite's development environment.

The main development areas are:

```text
src/
├── components/
├── pages/
├── layouts/
├── routes/
└── ...
```

Developers can modify the relevant files and verify the changes in the browser.

---

## 7. Production Build

Before deployment, create a production build using:

```bash
npm run build
```

The command runs the TypeScript/Vite build process and generates the production-ready application.

The output is generated in the:

```text
dist/
```

directory.

---

## 8. Preview Production Build

The production build can be previewed locally using:

```bash
npm run preview
```

Vite will provide a local URL for viewing the production build.

This step can be used to verify the application before deployment.

---

## 9. Code Quality Check

The project can be checked using the configured linting command:

```bash
npm run lint
```

Linting helps identify potential code-quality and development issues.

Any reported issues should be reviewed before final delivery.

---

## 10. Deployment

The application can be deployed using Vercel.

The general deployment process is:

```text
Git Repository
      ↓
Vercel Project
      ↓
Build Command
      ↓
Production Build
      ↓
Deployed Application
```

The Vercel project should use the appropriate build settings for the Vite application.

---

## 11. SPA Routing Configuration

Because the application uses React Router, the deployment environment must serve the application entry point for client-side routes.

For Vercel deployment, a rewrite configuration can be used when required:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This allows React Router to handle routes such as:

```text
/dashboard
/citizens
/projects
/requests
/officers
```

when they are accessed directly.

---

## 12. Troubleshooting

### Dependencies Not Installed

Run:

```bash
npm install
```

and then restart the development server.

### Development Server Not Starting

Verify that Node.js and npm are installed correctly.

Then run:

```bash
npm run dev
```

### Build Failure

Run:

```bash
npm run build
```

and review the terminal output to identify the specific error.

### Route Not Found After Deployment

Check the Vercel SPA rewrite configuration and redeploy the application.

### Changes Not Appearing

Stop and restart the development server if required:

```bash
npm run dev
```

Also verify that the correct source file has been modified.

---

## 13. Recommended Verification Before Handover

Before handing the project to another developer, verify:

* [ ] Dependencies install successfully
* [ ] Development server starts successfully
* [ ] Login page loads
* [ ] Dashboard loads
* [ ] Sidebar navigation works
* [ ] All major routes work
* [ ] Responsive layouts are checked
* [ ] No major console errors are present
* [ ] Linting is checked
* [ ] Production build completes successfully
* [ ] Deployment configuration is present

---

## 14. Quick Start

For a developer who already has Node.js and Git installed:

```bash
git clone <repository-url>
cd Government-Operations-Portal
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 15. Handover

The project is organized so that another developer can continue development by:

1. Cloning the repository.
2. Installing dependencies.
3. Starting the development server.
4. Reviewing the README and documentation.
5. Exploring the `src` folder.
6. Reviewing routes and reusable components.
7. Running the production build before making a release.

The documentation and project structure are intended to provide sufficient context for continued frontend development.
