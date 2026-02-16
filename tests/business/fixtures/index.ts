import { TodoPage } from "@pages";
import { test as base } from "playwright-bdd";
import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

type MyFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<MyFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await use(todoPage);
  },
});

export const { Given, When, Then } = createBdd(test);

export { expect };
