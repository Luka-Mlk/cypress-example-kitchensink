import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "@pages";

export class Todo extends BasePage {
  readonly input: Locator;
  readonly todoList: Locator;
  readonly toggleAll: Locator;
  readonly clearBtn: Locator;
  readonly todoCount: Locator;

  constructor(page: Page) {
    super(page);
    this.input = this.page.getByPlaceholder("What needs to be done?");
    this.todoList = this.page.locator(".todo-list");
    this.toggleAll = this.page.locator("label[for='toggle-all']");
    this.clearBtn = this.page.locator(".clear-completed");
    this.todoCount = this.page.locator(".todo-count");
  }

  private row(name: string) {
    return this.todoList.locator("li").filter({
      has: this.page.getByText(name, { exact: true }),
    });
  }

  async add(name: string) {
    await this.fill(`add task: ${name}`, this.input, name);
    await this.page.keyboard.press("Enter");
  }

  async toggle(name: string, targetState: "completed" | "active") {
    const item = this.row(name);
    const checkbox = item.locator(".toggle");

    await this.step(`ensure task "${name}" is ${targetState}`, async () => {
      const classes = await item.getAttribute("class");
      const isCompleted = classes?.includes("completed");
      const currentState = isCompleted ? "completed" : "active";

      if (currentState !== targetState) {
        await this.click(`toggle ${name}`, checkbox);
      }
    });
  }

  async remove(name: string) {
    const item = this.row(name);
    await item.hover();
    await this.click(`remove ${name}`, item.locator(".destroy"));
  }

  async removeFirst() {
    const firstItem = this.todoList.locator("li").first();
    await firstItem.hover();
    await this.click("Delete button", firstItem.locator(".destroy"));
  }

  async edit(
    name: string,
    newName: string,
    action: "Enter" | "Blur" | "Escape" = "Enter",
  ) {
    const row = this.row(name);
    await row.locator("label").dblclick();
    await this.fill("edit input", row.locator("input.edit"), newName);
    await this.step(`finish edit with ${action}`, async () => {
      if (action === "Enter") await this.page.keyboard.press("Enter");
      if (action === "Escape") await this.page.keyboard.press("Escape");
      if (action === "Blur") await this.page.locator("h1").click();
    });
  }

  async filterBy(status: "All" | "Active" | "Completed") {
    await this.step(`filter tasks by: ${status}`, async () => {
      const filterLink = this.page
        .locator(".filters")
        .getByRole("link", { name: status });
      await this.click(`${status} filter`, filterLink);
    });
  }

  async bulkToggle() {
    await this.click(`bulk toggle tasks`, this.toggleAll);
  }

  async clearCompleted() {
    await this.click(`clear completed tasks`, this.clearBtn);
  }

  async hoverTask(name: string) {
    await this.row(name).hover();
  }

  async getTaskCount(): Promise<number> {
    return this.todoList.locator("li").count();
  }

  async getTaskNames(): Promise<string[]> {
    return this.todoList.locator("li label").allInnerTexts();
  }

  async getLastTaskName(): Promise<string> {
    return this.todoList.locator("li label").last().innerText();
  }

  async expectTask(name: string, state: "completed" | "active" | "hidden") {
    const item = this.row(name);
    await this.step(`verify task "${name}" is ${state}`, async () => {
      if (state === "hidden") {
        await this.expectHidden(name, item);
      } else {
        const decoration = state === "completed" ? /line-through/ : "none";
        await this.expectStyle(
          "text decoration",
          item.locator("label"),
          "text-decoration",
          decoration,
        );
        state === "completed"
          ? await expect(item).toHaveClass(/completed/)
          : await expect(item).not.toHaveClass("completed");
      }
    });
  }

  async expectActiveCount(expectedCount: number) {
    // Handles plurals
    const suffix = expectedCount === 1 ? "item left" : "items left";
    const expectedText = `${expectedCount} ${suffix}`;
    await this.expectText("active count", this.todoCount, expectedText);
  }

  async expectTaskPosition(name: string, position: number) {
    const item = this.todoList.locator("li").nth(position - 1);
    await expect(item).toContainText(name);
  }

  async expectDeleteButtonVisibility(
    name: string,
    state: "visible" | "hidden",
  ) {
    const btn = this.row(name).locator(".destroy");
    state === "visible"
      ? await expect(btn).toBeVisible()
      : await expect(btn).toBeHidden();
  }

  async expectClearCompletedVisibility(state: "visible" | "hidden") {
    state === "visible"
      ? await expect(this.clearBtn).toBeVisible()
      : await expect(this.clearBtn).toBeHidden();
  }

  async expectTaskWidthFits(name: string) {
    const item = this.row(name);
    const containerWidth = await this.todoList.evaluate((el) => el.clientWidth);
    const itemWidth = await item.evaluate((el) => el.clientWidth);
    expect(itemWidth).toBeLessThanOrEqual(containerWidth);
  }

  async expectEditInputVisibility(name: string, state: "visible" | "hidden") {
    const editInput = this.row(name).locator("input.edit");
    state === "visible"
      ? await expect(editInput).toBeVisible()
      : await expect(editInput).toBeHidden();
  }

  async expectTaskText(name: string) {
    await expect(this.row(name)).toHaveText(name);
  }

  async expectNoTasksEditing() {
    await expect(this.todoList.locator("li.editing")).toHaveCount(0);
  }

  async expectEmptyList() {
    await expect(this.todoList.locator("li")).toHaveCount(0);
  }
}
