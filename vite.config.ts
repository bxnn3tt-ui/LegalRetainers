import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
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
