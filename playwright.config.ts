import { defineConfig } from '@playwright/test';

import * as os from 'node:os';
import browserConfig from "./config/browser-config/browserConfig";

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  timeout: 200 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  use: {
    trace: 'on',
    video: 'off',
    screenshot : 'on'
    //screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testDir: './',
      testMatch: 'global.setup.ts',
    },
    {
      ...browserConfig,
      dependencies: ['setup'],
    },
  ],
  reporter: [
    ['line'],
    [
      'allure-playwright',
      {
        resultsDir: 'test-reports/allure-result',
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
  ],
  outputDir: 'test-reports/',
});
