import {defineConfig} from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: path.resolve(__dirname, './test/setup.ts'),
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'test/',
        '.next/',
        '**/*.config.ts',
        '**/*.config.js',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
    },
    testTimeout: 30000,
    hookTimeout: 30000,
    //memory optimization: run tests in sequence to prevent memory issues
    //this is critical for tests create large datasets
    pool: 'forks',
    execArgv: ['--expose-gc'], //allow manual garbage collection
    isolate: false, //disable full isolation to reduce memory overhead
    maxWorkers: 1, //use a single worker to limit memory usage
    vmMemoryLimit: '300MB', //limit memory per fork
    //run tests sequentially ti avoid cleanup conflicts
    fileParallelism: false,
    //limit concurrent test files to reduce memory pressure
    maxConcurrency: 3,
    //only include our test files, not dependency tests
    include: [
      'apps/**/__tests__/**/*.{test,spec}.{ts,tsx}',
      'packages/**/__tests__/**/*.{test,spec}.{ts,tsx}',
      'test/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: ['node_modules/**', '**/node_modules/**', 'dist/**', '.next/**', '.turbo/**'],
  },
  resolve: {
    alias: {
      '@claritas/db': path.resolve(__dirname, './packages/db/src'),
      '@claritas/shared': path.resolve(__dirname, './packages/shared/src'),
      '@claritas/types': path.resolve(__dirname, './packages/types/src'),
    },
  },
});
