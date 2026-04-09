import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders } from "./AppProviders";
import { AppRoutes } from "./AppRoutes";
import { HelmetProvider } from "./lib/helmet";

interface HelmetServerState {
  helmet?: {
    title: { toString: () => string };
    priority?: { toString: () => string };
    meta: { toString: () => string };
    link: { toString: () => string };
    script: { toString: () => string };
    style: { toString: () => string };
    noscript: { toString: () => string };
  };
}

export function renderRoute(url: string) {
  const helmetContext: HelmetServerState = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <AppProviders>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </AppProviders>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const headTags = helmet
    ? [
        helmet.title.toString(),
        helmet.priority?.toString() ?? "",
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
        helmet.style.toString(),
        helmet.noscript.toString(),
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return {
    appHtml,
    headTags,
  };
}
