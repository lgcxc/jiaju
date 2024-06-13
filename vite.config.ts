import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig, loadEnv } from 'vite';
import svgLoader from 'vite-svg-loader';

const CWD = process.cwd();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD);
  return {
    base: VITE_BASE_URL,
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
