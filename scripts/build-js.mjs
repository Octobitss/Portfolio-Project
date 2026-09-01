import { fileURLToPath } from "node:url";
import path from "node:path";
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const watchMode = process.argv.includes("--watch");

function bundle({ fileName, minify }) {
  return viteBuild({
    root,
    configFile: false,
    logLevel: "warn",
    plugins: [react()],
    publicDir: false,
    build: {
      target: "es2019",
      sourcemap: false,
      minify,
      emptyOutDir: false,
      outDir: "public/js",
      watch: watchMode ? {} : null,
      rollupOptions: {
        input: path.join(root, "src/main.tsx"),
        output: {
          entryFileNames: fileName,
          inlineDynamicImports: true,
        },
      },
    },
  });
}

if (watchMode) {
  await bundle({ fileName: "main.js", minify: false });
  await bundle({ fileName: "main.min.js", minify: "esbuild" });
  console.log("[build-js] watching src/ — writing public/js/main.js and public/js/main.min.js on change");
} else {
  await bundle({ fileName: "main.js", minify: false });
  await bundle({ fileName: "main.min.js", minify: "esbuild" });
  console.log("[build-js] wrote public/js/main.js and public/js/main.min.js");
}
