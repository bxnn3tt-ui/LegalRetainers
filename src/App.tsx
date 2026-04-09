import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./AppProviders";
import { AppClientRoutes } from "./AppClientRoutes";
import { RouteIntentPrefetch } from "./components/RouteIntentPrefetch";
import { ScrollToTop } from "./components/ScrollToTop";
import { HelmetProvider } from "./lib/helmet";

const App = () => (
  <HelmetProvider>
    <AppProviders>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteIntentPrefetch />
        <ScrollToTop />
        <AppClientRoutes />
      </BrowserRouter>
    </AppProviders>
  </HelmetProvider>
);

export default App;
