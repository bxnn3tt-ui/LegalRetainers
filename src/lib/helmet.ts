import * as helmetAsync from "react-helmet-async";

type HelmetCompatModule = typeof helmetAsync & {
  default?: Partial<typeof helmetAsync>;
};

const helmetModule =
  (Reflect.get(helmetAsync as object, "default") as HelmetCompatModule["default"] | undefined) ??
  helmetAsync;

export const Helmet = helmetModule.Helmet!;
export const HelmetProvider = helmetModule.HelmetProvider!;
