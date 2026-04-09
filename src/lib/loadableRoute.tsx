import React, { lazy, type ComponentType, type LazyExoticComponent } from "react";

type LoadableModule<Props> = {
  default: ComponentType<Props>;
};

export type LoadableRouteComponent<Props = object> = ComponentType<Props> & {
  preload: () => Promise<ComponentType<Props>>;
};

export function createLoadableRoute<Props extends object>(
  loader: () => Promise<LoadableModule<Props>>
): LoadableRouteComponent<Props> {
  let loadedComponent: ComponentType<Props> | null = null;
  let loadingPromise: Promise<ComponentType<Props>> | null = null;

  const load = async (): Promise<ComponentType<Props>> => {
    if (loadedComponent) {
      return loadedComponent;
    }

    if (!loadingPromise) {
      loadingPromise = loader().then((module) => {
        loadedComponent = module.default;
        return loadedComponent;
      });
    }

    return loadingPromise;
  };

  const LazyComponent: LazyExoticComponent<ComponentType<Props>> = lazy(async () => ({
    default: await load(),
  }));

  const LoadableRoute = ((props: Props) => {
    if (loadedComponent) {
      const ResolvedComponent = loadedComponent;
      return <ResolvedComponent {...props} />;
    }

    return <LazyComponent {...props} />;
  }) as LoadableRouteComponent<Props>;

  LoadableRoute.preload = load;

  return LoadableRoute;
}
