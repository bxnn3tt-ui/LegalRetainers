import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';
  const host = process.env.HOST || (isDev ? "127.0.0.1" : "0.0.0.0");
  
  return {
    server: {
      host,
      port: 5000,
      allowedHosts: true,
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true
        },
        mangle: {
          toplevel: true,
          eval: true,
          keep_classnames: false,
          keep_fnames: false,
          safari10: true
        },
        format: {
          comments: false,
          ascii_only: true,
          beautify: false,
          braces: false,
          semicolons: false
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) {
              return undefined;
            }

            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/react-router/") ||
              id.includes("/react-router-dom/") ||
              id.includes("/@remix-run/router/") ||
              id.includes("/scheduler/")
            ) {
              return "react-vendor";
            }

            if (
              id.includes("/@radix-ui/") ||
              id.includes("/lucide-react/") ||
              id.includes("/class-variance-authority/") ||
              id.includes("/clsx/") ||
              id.includes("/tailwind-merge/") ||
              id.includes("/tailwindcss-animate/")
            ) {
              return "ui-vendor";
            }

            if (
              id.includes("/react-hook-form/") ||
              id.includes("/@hookform/") ||
              id.includes("/zod/") ||
              id.includes("/@hookform/resolvers/")
            ) {
              return "forms-vendor";
            }

            if (
              id.includes("/recharts/") ||
              id.includes("/embla-carousel-react/") ||
              id.includes("/date-fns/")
            ) {
              return "content-vendor";
            }

            if (id.includes("/@tanstack/react-query/")) {
              return "query-vendor";
            }

            return undefined;
          },
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]"
        }
      },
      cssCodeSplit: true,
      sourcemap: false,
      assetsInlineLimit: 0
    },
    define: {
      __DEV__: isDev,
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true
    }
  };
});
