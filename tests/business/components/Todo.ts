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

  private row(taskName: string): Locator {
    return this.todoList.locator("li").filter({ hasText: taskName });
  }

  async add(name: string) {
    await this.fill(`add task: ${name}`, this.input, name);
    await this.page.keyboard.press("Enter");
  }

  async toggle(name: string) {
    await this.click(`toggle ${name}`, this.row(name).locator(".toggle"));
  }

  async remove(name: string) {
    const item = this.row(name);
    await item.hover();
    await this.click(`remove ${name}`, item.locator(".destroy"));
  }

  async edit(
    name: string,
    newName: string,
    action: "Enter" | "Blur" | "Escape" = "Enter",
  ) {
    await this.step(`edit "${name}" to "${newName}" by ${action}`, async () => {
      const row = this.row(name);

      // Needs to be double clicked since input element isint visible before this action
      await row.locator("label").dblclick();

      // The actual input field appears
      const editInput = row.locator("input.edit");
      await this.fill("edit input", editInput, newName);

      switch (action) {
        case "Enter":
          await this.page.keyboard.press("Enter");
          break;
        case "Escape":
          await this.page.keyboard.press("Escape");
          break;
        case "Blur":
          // clicking away causes blur event
          await this.page.locator("h1").click();
          break;
      }
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
    await this.step("toggle all tasks", async () => {
      await this.click(`bulk toggle tasks`, this.toggleAll);
      await this.toggleAll.click();
    });
  }

  async clearCompleted() {
    await this.step("clear completed steps", async () => {
      await this.click(`clear completed steps`, this.clearBtn);
    });
  }

  async expectTask(name: string, state: "completed" | "active" | "hidden") {
    const item = this.row(name);

    await this.step(`verify task "${name}" is ${state}`, async () => {
      if (state === "hidden") {
        await this.expectHidden(name, item);
      } else {
        const isCompleted = state === "completed";
        const decoration = isCompleted ? /line-through/ : "none";

        await this.expectStyle(
          "text decoration",
          item.locator("label"),
          "text-decoration",
          decoration,
        );
        isCompleted
          ? await expect(item).toHaveClass(/completed/)
          : await expect(item).not.toHaveClass("completed");
      }
    });
  }

  async expectActiveCount(expectedCount: number) {
    await this.step(
      `verify active tasks counter is ${expectedCount}`,
      async () => {
        // Handles plurals
        const suffix = expectedCount === 1 ? "item left" : "items left";
        const expectedText = `${expectedCount} ${suffix}`;

        await this.expectText(
          "active tasks counter",
          this.todoCount,
          expectedText,
        );
      },
    );
  }
}
