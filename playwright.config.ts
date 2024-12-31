import { defineConfig, devices } from '@playwright/test';
import * as os from 'node:os';
import browserConfig from './config/browser-config/browserConfig';

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
    screenshot: 'on',
  },
  projects: [
    {
      name: 'setup',
      testDir: './',
      testMatch: 'global.setup.ts',
    },
    {
      name: 'DesktopChrome',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/auth.json',
        headless: true,
      },
      dependencies: ['setup'],
    },
    {
      name: 'DesktopFirefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/auth.json',
        headless: true,
      },
      dependencies: ['setup'],
    },
    {
      name: 'DesktopSafari',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/auth.json',
        headless: true,
      },
      dependencies: ['setup'],
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
