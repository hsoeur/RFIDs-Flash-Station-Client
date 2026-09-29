import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const parseEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) return {};

  return Object.fromEntries(
    fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const key = line.slice(0, separator).trim();
        const value = line
          .slice(separator + 1)
          .trim()
          .replace(/^(['"])(.*)\1$/, "$2");
        return [key, value];
      })
  );
};

const projectRoot = process.cwd();
const defaults = parseEnvFile(path.join(projectRoot, ".env"));
const integration = parseEnvFile(
  path.join(projectRoot, ".env.integration.local")
);

export const integrationEnvironment = {
  apiDataBaseUrl:
    process.env.API_DATA_BASE_URL ??
    integration.API_DATA_BASE_URL ??
    defaults.VITE_API_DATA,
  manufacturingOrderUid:
    process.env.TEST_MANUFACTURING_ORDER_UID ??
    integration.TEST_MANUFACTURING_ORDER_UID,
  invalidManufacturingOrderUid:
    process.env.TEST_INVALID_MANUFACTURING_ORDER_UID ??
    integration.TEST_INVALID_MANUFACTURING_ORDER_UID ??
    "0",
};
