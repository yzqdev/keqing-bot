import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  splitting: false,
  sourcemap: false,
  minify: false,
  dts: false,
  format: "esm",
  clean: true,
});
