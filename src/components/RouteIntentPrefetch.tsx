import { useEffect } from "react";
import { preloadRouteModules } from "@/clientRoutes";

const preloadedPaths = new Set<string>();

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

function getPrefetchPath(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) {
    return null;
  }

  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) {
    return null;
  }

  if (anchor.target && anchor.target !== "_self") {
    return null;
  }

  if (anchor.hasAttribute("download")) {
    return null;
  }

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#")) {
    return null;
  }

  const url = new URL(anchor.href, window.location.origin);

  if (url.origin !== window.location.origin) {
    return null;
  }

  if (url.pathname.startsWith("/api")) {
    return null;
  }

  const pathname = normalizePathname(url.pathname);

  if (pathname === normalizePathname(window.location.pathname)) {
    return null;
  }

  return pathname;
}

function prefetchPath(pathname: string | null) {
  if (!pathname || preloadedPaths.has(pathname)) {
    return;
  }

  preloadedPaths.add(pathname);
  void preloadRouteModules(pathname).catch(() => {
    preloadedPaths.delete(pathname);
  });
}

function getInternalAnchorPath(anchor: HTMLAnchorElement): string | null {
  if (anchor.target && anchor.target !== "_self") {
    return null;
  }

  if (anchor.hasAttribute("download")) {
    return null;
  }

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#")) {
    return null;
  }

  const url = new URL(anchor.href, window.location.origin);

  if (url.origin !== window.location.origin || url.pathname.startsWith("/api")) {
    return null;
  }

  const pathname = normalizePathname(url.pathname);

  if (pathname === normalizePathname(window.location.pathname)) {
    return null;
  }

  return pathname;
}

export function RouteIntentPrefetch() {
  useEffect(() => {
    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        prefetchPath(getPrefetchPath(event.target));
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      prefetchPath(getPrefetchPath(event.target));
    };

    const handleTouchStart = (event: TouchEvent) => {
      prefetchPath(getPrefetchPath(event.target));
    };

    document.addEventListener("pointerenter", handlePointerEnter, true);
    document.addEventListener("focusin", handleFocusIn, true);
    document.addEventListener("touchstart", handleTouchStart, {
      capture: true,
      passive: true,
    });

    const supportsIntersectionObserver = typeof IntersectionObserver !== "undefined";
    const supportsIdleCallback = typeof window.requestIdleCallback === "function";

    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const observeVisibleLinks = () => {
      if (!observer) {
        return;
      }

      document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
        if (getInternalAnchorPath(anchor)) {
          observer.observe(anchor);
        }
      });
    };

    if (supportsIntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }

            const anchor = entry.target;
            if (anchor instanceof HTMLAnchorElement) {
              prefetchPath(getInternalAnchorPath(anchor));
            }

            observer?.unobserve(entry.target);
          }
        },
        {
          rootMargin: "200px 0px",
          threshold: 0.01,
        }
      );

      if (supportsIdleCallback) {
        window.requestIdleCallback(observeVisibleLinks, { timeout: 1500 });
      } else {
        window.setTimeout(observeVisibleLinks, 200);
      }

      mutationObserver = new MutationObserver(() => {
        observeVisibleLinks();
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      document.removeEventListener("pointerenter", handlePointerEnter, true);
      document.removeEventListener("focusin", handleFocusIn, true);
      document.removeEventListener("touchstart", handleTouchStart, true);
      mutationObserver?.disconnect();
      observer?.disconnect();
    };
  }, []);

  return null;
}
