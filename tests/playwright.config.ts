import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const dirConf = defineBddConfig({
  features: "features/*.feature",
  steps: ["features/steps/*.ts", "business/fixtures/index.ts"],
});

const config: PlaywrightTestConfig = {
  testDir: dirConf,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["allure-playwright", { outputFolder: "allure-result" }]],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:8080/todo",
    reuseExistingServer: !process.env.CI,
  },
};

export default defineConfig(config);
