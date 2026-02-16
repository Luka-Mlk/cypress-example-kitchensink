import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const dirConf = defineBddConfig({
  features: "features/*.feature",
  steps: ["features/steps/*.ts", "business/fixtures/index.ts"],
  outputDir: "features/gen/",
});

const config: PlaywrightTestConfig = {
  timeout: 5000,
  testDir: dirConf,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["allure-playwright", { outputFolder: "allure-result" }]],
  use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: process.env.APP_URL,
    reuseExistingServer: true,
  },
};

export default defineConfig(config);
