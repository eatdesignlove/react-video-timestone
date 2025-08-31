import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDemo = mode === 'demo';

  return {
    plugins: [
      react(),
      svgr(),
      vanillaExtractPlugin(),
      !isDemo && libInjectCss(),
      !isDemo &&
        dts({
          insertTypesEntry: true,
        }),
    ].filter(Boolean),
    build: isDemo
      ? {
          // Demo app build configuration
          outDir: 'dist',
        }
      : {
          // Library build configuration
          copyPublicDir: false,
          lib: {
            entry: 'lib/index.ts',
            name: 'ReactVideoTimestone',
            formats: ['es', 'umd'],
            fileName: format => `react-video-timestone.${format}.js`,
          },
          rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
          },
        },
  };
});
