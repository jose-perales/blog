import coreWebVitals from "eslint-config-next/core-web-vitals";
import noRawTailwindColors from "./eslint-rules/no-raw-tailwind-colors.js";

const designSystemPlugin = {
  rules: {
    "no-raw-tailwind-colors": noRawTailwindColors,
  },
};

const config = [
  ...coreWebVitals,
  {
    plugins: {
      "design-system": designSystemPlugin,
    },
    rules: {
      "design-system/no-raw-tailwind-colors": "error",
    },
  },
];

export default config;
