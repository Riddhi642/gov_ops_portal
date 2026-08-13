# Government Operations Portal — Routing Documentation

## 1. Routing Overview

The Government Operations Portal uses React Router for client-side navigation.

Routing allows users to move between different pages of the application without requiring a complete browser page reload.

The routing structure separates the login page from the main dashboard application and uses a shared dashboard layout for internal pages.

---

## 2. Routing Technology

The application uses:

* React Router
* React Router DOM
* Nested Routes
* `Outlet`
* `Link`
* `useNavigate`

React Router handles navigation between application pages.

---

## 3. Application Route Structure

The main route structure is:

```text
Application
│
├── /login
│
└── /dashboard
      │
      ├── /dashboard
      ├── /citizens
      ├── /projects
      ├── /requests
      ├── /officers
      ├── /profile
      └── /settings
```

The dashboard-related routes are displayed inside the common `DashboardLayout`.

---

## 4. Route Table

| Route        | Page      | Purpose                        |
| ------------ | --------- | ------------------------------ |
| `/login`     | Login     | User login interface           |
| `/dashboard` | Dashboard | Main operations dashboard      |
| `/citizens`  | Citizens  | Citizen information            |
| `/projects`  | Projects  | Government project information |
| `/requests`  | Requests  | Request management             |
| `/officers`  | Officers  | Officer information            |
| `/profile`   | Profile   | User profile                   |
| `/settings`  | Settings  | Application settings           |
| `*`          | NotFound  | Invalid or unavailable route   |

---

## 5. Route Configuration

The application's routes are maintained in the routing configuration file.

Example structure:

```text
src/
└── routes/
    └── AppRoutes.tsx
```

The route configuration connects URL paths with their corresponding React components.

A simplified example is:

```tsx
<Routes>

  <Route path="/login" element={<Login />} />

  <Route path="/" element={<DashboardLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="citizens" element={<Citizens />} />
    <Route path="projects" element={<Projects />} />
    <Route path="requests" element={<Requests />} />
    <Route path="officers" element={<Officers />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>

  <Route path="*" element={<NotFound />} />

</Routes>
```

The exact route configuration should remain synchronized with the application's actual implementation.

---

## 6. Nested Routing

The application uses nested routing for dashboard pages.

The parent route provides the common dashboard layout, while child routes render individual pages.

```text
DashboardLayout
      │
      └── Outlet
            │
            ├── Dashboard
            ├── Citizens
            ├── Projects
            ├── Requests
            ├── Officers
            ├── Profile
            └── Settings
```

This prevents the need to repeat the sidebar and header on every page.

---

## 7. Outlet

React Router's `Outlet` component is used inside `DashboardLayout`.

Example:

```tsx
<main>
  <Outlet />
</main>
```

The `Outlet` acts as a placeholder where the currently selected child route is rendered.

For example:

```text
/citizens
      ↓
DashboardLayout
      ↓
Outlet
      ↓
Citizens Page
```

This provides a consistent layout while allowing the main page content to change.

---

## 8. Sidebar Navigation

The sidebar provides navigation links to the main sections of the portal.

It uses React Router's `Link` component.

Example:

```tsx
<Link to="/dashboard">
  Dashboard
</Link>

<Link to="/citizens">
  Citizens
</Link>

<Link to="/projects">
  Projects
</Link>
```

Using `Link` allows navigation without performing a complete browser page reload.

---

## 9. Programmatic Navigation

The application can also use `useNavigate` when navigation needs to happen as a result of an action.

For example, after a login interaction:

```tsx
const navigate = useNavigate();

const handleLogin = () => {
  navigate("/dashboard");
};
```

The user is then redirected from the login page to the dashboard.

---

## 10. Navigation Flow

The basic navigation flow is:

```text
User Opens Application
        ↓
Login Page
        ↓
Login Interaction
        ↓
Dashboard
        ↓
Sidebar Navigation
        ↓
Selected Module
        ↓
Corresponding Page
```

For example:

```text
Login
  ↓
Dashboard
  ↓
Citizens
  ↓
Projects
  ↓
Requests
```

---

## 11. 404 / Not Found Route

The application includes a fallback route for invalid URLs.

```tsx
<Route path="*" element={<NotFound />} />
```

If a user enters a URL that does not match any configured route, the `NotFound` page is displayed.

This improves the user experience by providing a controlled response to invalid routes.

---

## 12. Client-Side Routing

The application uses client-side routing.

When navigating between routes, React changes the displayed component without performing a full page reload.

This provides:

* Faster navigation
* Better user experience
* SPA behaviour
* Reusable layouts
* Smooth transitions between application sections

---

## 13. Vercel Deployment Consideration

Because the application is a Single Page Application (SPA), routes such as:

```text
/dashboard
/citizens
/projects
/requests
/officers
```

are handled by React Router on the client side.

When deployed to Vercel, direct access to a nested route may require a rewrite configuration so that the request is served through `index.html`.

A typical Vercel configuration is:

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

This ensures that the React application can handle client-side routes correctly after deployment.

---

## 14. Routing Benefits

The routing architecture provides several benefits:

* Centralized route configuration
* Easy navigation
* Reusable dashboard layout
* Clean URL structure
* SPA navigation
* Better maintainability
* Easy addition of new modules
* Support for future protected routes

---

## 15. Future Routing Enhancements

The routing system can be extended with:

* Protected routes
* Authentication guards
* Role-based routing
* Administrator routes
* Officer-specific routes
* Department-specific routes
* Lazy loading
* Route-level error handling
* Permission-based navigation

A future protected-route structure could be:

```text
Authentication
      ↓
Role Verification
      ↓
Protected Route
      ↓
Dashboard
      ↓
Authorized Module
```

---

## 16. Summary

React Router provides the navigation foundation of the Government Operations Portal.

The use of nested routes, `DashboardLayout` and `Outlet` allows the application to maintain a consistent interface while displaying different modules.

The routing structure is modular and scalable, making it easier to add new pages and implement authentication and role-based access control in future versions.
