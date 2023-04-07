import envPaths from "env-paths";
import { name } from "../../package.json";

/** get computer env paths */
export const getEnvPath = (
  type: "cache" | "config" | "data" | "log" | "temp"
) => {
  return envPaths(name, { suffix: "" })[type];
};
