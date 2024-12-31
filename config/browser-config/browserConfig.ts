import { devices } from '@playwright/test';

// Define a type for the valid browser names
type BrowserName =
  | 'DesktopChrome'
  | 'DesktopFirefox'
  | 'DesktopSafari'
  | 'MobileChrome'
  | 'MobileSafari';

const browserName: BrowserName =
  (process.env.BROWSER as BrowserName) || 'DesktopChrome';

const deviceMap: Record<BrowserName, any> = {
  DesktopChrome: devices['Desktop Chrome'],
  DesktopFirefox: devices['Desktop Firefox'],
  DesktopSafari: devices['Desktop Safari'],
  MobileChrome: devices['Pixel 5'],
  MobileSafari: devices['iPhone 12'],
};

const browserConfig = {
  name: browserName,
  use: {
    ...deviceMap[browserName],
    storageState: 'playwright/.auth/auth.json',
    headless: true,
    launchOptions: {
      // args: ['--start-maximized'],
    },
    viewport: { width: 1440, height: 900 },
  },
};

export default browserConfig;
