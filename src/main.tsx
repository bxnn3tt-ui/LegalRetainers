import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { preloadRouteModules } from "./clientRoutes";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

async function bootstrap() {
  await preloadRouteModules(window.location.pathname);

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, <App />);
    return;
  }

  createRoot(rootElement).render(<App />);
}

void bootstrap();
