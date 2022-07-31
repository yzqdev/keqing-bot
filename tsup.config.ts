import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  splitting: true,
  sourcemap: false,
  minify: true,
  dts: false,
  format:"esm",
  ignoreWatch:"data",
  clean: true,
});
