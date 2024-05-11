import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      css: {
        preprocessorOptions: {
          less: {
            math: 'strict',
            javascriptEnabled: true,
          },
        },
      },
      plugins: [
        vue(),
        vueJsx(),
        svgLoader(),
        dts({
          include: ['src/packages/**/*.{vue,ts,tsx}'],
        }),
      ],
      build: {
        outDir: 'lib',
        lib: {
          entry: resolve(__dirname, 'src/packages/index.ts'),
          name: 'JiaJu',
          // the proper extensions will be added
          // fileName: 'jiaju',
          fileName: (format) => `jiaju.${format}.js`,
        },
        rollupOptions: {
          // make sure to externalize deps that shouldn't be bundled
          // into your library
          external: ['vue'],
          output: {
            exports: 'named',
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
      esbuild: {
        drop: ['console', 'debugger'],
      },
    };
  }
  return {
    base: '/jiaju/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },
    plugins: [vue(), vueJsx(), svgLoader()],
    build: {
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          // 最小化拆分包
          // eslint-disable-next-line consistent-return
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
      esbuild: {
        drop: mode === 'production' ? ['console', 'debugger'] : [],
      },
    },
  };
});
