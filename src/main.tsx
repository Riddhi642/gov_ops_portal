import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundary from "./components/common/ErrorBoundry";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://cd793c62e99aa8bdc691ad2549c061f0@o4512023479517184.ingest.us.sentry.io/4512023647944704",
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 1.0,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);