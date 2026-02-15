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
      await this.navigate(process.env.APP_URL);
      await this.verifyInputVisibility("visible");
    });
  }

  async clearState() {
    await this.step("Clear the default tasks", async () => {
      while ((await this.todo.getTaskCount()) > 0) {
        await this.todo.removeFirst();
      }
    });
  }

  async setupTasks(tasks: { name: string; status: string }[]) {
    for (const task of tasks) {
      await this.todo.add(task.name);
      if (task.status === "completed") {
        await this.todo.toggle(task.name, "completed");
      }
    }
  }

  async addNewTask(name: string) {
    await this.todo.add(name);
  }

  async completeTask(name: string, status: "active" | "completed") {
    await this.todo.toggle(name, status);
  }

  async removeTask(name: string) {
    await this.todo.remove(name);
  }

  async renameTask(
    name: string,
    newName: string,
    key: "Enter" | "Escape" | "Blur" = "Enter",
  ) {
    await this.todo.edit(name, newName, key);
  }

  async filterTasks(status: "All" | "Active" | "Completed") {
    await this.todo.filterBy(status);
  }

  async toggleAllTasks() {
    await this.todo.bulkToggle();
  }

  async clearAllCompleted() {
    await this.todo.clearCompleted();
  }

  async hoverTask(name: string) {
    await this.todo.hoverTask(name);
  }

  async reload() {
    await this.page.reload();
  }

  async clickOutside() {
    await this.step("Click outside to blur", async () => {
      await this.page.locator("h1").click();
    });
  }

  // Assertion Orchestration
  async verifyTaskState(
    name: string,
    state: "completed" | "active" | "hidden",
  ) {
    await this.todo.expectTask(name, state);
  }

  async verifyTaskChecked(name: string, state: "checked" | "unchecked") {
    const mappedState = state === "checked" ? "completed" : "active";
    await this.todo.expectTask(name, mappedState);
  }

  async verifyRemainingCount(count: number) {
    await this.todo.expectActiveCount(count);
  }

  async verifyTaskPosition(name: string, position: number) {
    await this.todo.expectTaskPosition(name, position);
  }

  async verifyDeleteButtonState(name: string, state: "visible" | "hidden") {
    await this.todo.expectDeleteButtonVisibility(name, state);
  }

  async verifyClearCompletedState(state: "visible" | "hidden") {
    await this.todo.expectClearCompletedVisibility(state);
  }

  async verifyTaskWidth(name: string) {
    await this.todo.expectTaskWidthFits(name);
  }

  async verifyLastTaskWidth() {
    const name = await this.todo.getLastTaskName();
    await this.todo.expectTaskWidthFits(name);
  }

  async verifyEditInputState(name: string, state: "visible" | "hidden") {
    await this.todo.expectEditInputVisibility(name, state);
  }

  async verifyAllTasksState(state: "completed" | "active") {
    await this.step(`Verify all tasks are ${state}`, async () => {
      const names = await this.todo.getTaskNames();
      for (const name of names) {
        await this.todo.expectTask(name, state);
      }
    });
  }

  async verifyTaskText(name: string) {
    await this.todo.expectTaskText(name);
  }

  async verifyNoTaskIsEditing() {
    await this.todo.expectNoTasksEditing();
  }

  async verifyInputVisibility(state: "visible" | "hidden") {
    state === "visible"
      ? await this.expectVisible("Todo Input", this.todo.input)
      : await this.expectHidden("Todo Input", this.todo.input);
  }

  async verifyNoTasksVisible() {
    await this.todo.expectEmptyList();
  }

  async clickButtonByText(text: string) {
    if (text === "Clear completed") {
      await this.todo.clearCompleted();
    } else {
      await this.step(`Click button: ${text}`, async () => {
        await this.page.getByRole("button", { name: text }).click();
      });
    }
  }
}
