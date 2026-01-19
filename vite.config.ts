import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/index.ts', 'src/components/**/*.ts', 'src/components/**/*.tsx', 'src/utils/**/*.ts'],
      exclude: ['src/core/**', 'src/demo.tsx', '**/*.js'],
      rollupTypes: false,
      copyDtsFiles: false,
      compilerOptions: {
        skipLibCheck: true,
        noEmit: false,
        declaration: true,
        emitDeclarationOnly: true,
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactDxfViewer',
      fileName: (format) => `react-dxf-viewer.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'three'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          three: 'THREE',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
