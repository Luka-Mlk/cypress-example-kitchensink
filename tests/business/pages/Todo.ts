import { type Page } from "@playwright/test";
import { BasePage } from "./Base.js";
import { Todo } from "@components";

export class TodoPage extends BasePage {
  readonly todo: Todo;

  constructor(page: Page) {
    super(page);
    this.todo = new Todo(page);
  }

  async open() {
    await this.step("Open Todo Application", async () => {
      await this.navigate("/");
      await this.expectVisible("Todo Input", this.todo.input);
    });
  }

  async clearState() {
    await this.step("Clear the default tasks", async () => {
      const items = await this.page.locator(".todo-list li").all();

      for (const item of items) {
        await item.hover();
        await this.click("Delete existing task", item.locator(".destroy"));
      }
    });
  }

  async setupTasks(tasks: { name: string; status: string }[]) {
    for (const task of tasks) {
      await this.todo.add(task.name);
      if (task.status === "completed") {
        await this.todo.toggle(task.name);
      }
    }
  }
}
