import { Given, When, Then } from "@fixtures";

Given(
  "I have the following todo tasks:",
  async ({ todoPage }, dataTable: { hashes: () => any[] }) => {
    await todoPage.open();
    await todoPage.clearState();
    await todoPage.setupTasks(dataTable.hashes());
  },
);

When(
  "I mark the task {string} as {string}",
  async ({ todoPage }, name: string, status: "active" | "completed") => {
    await todoPage.completeTask(name, status);
  },
);

Then(
  "The task {string} should be {string}",
  async (
    { todoPage },
    name: string,
    state: "checked" | "unchecked" | "hidden",
  ) => {
    if (state === "hidden") {
      await todoPage.verifyTaskState(name, "hidden");
    } else {
      await todoPage.verifyTaskChecked(name, state);
    }
  },
);

Then(
  "The task {string} should {string} a strikethrough style",
  async ({ todoPage }, name: string, action: "have" | "not have") => {
    const state = action === "have" ? "completed" : "active";
    await todoPage.verifyTaskState(name, state);
  },
);

Then(
  "The task counter should be {string}",
  async ({ todoPage }, count: string) => {
    // Parse string "1" to number
    await todoPage.verifyRemainingCount(parseInt(count, 10));
  },
);

When(
  "I click the {string} button",
  async ({ todoPage }, buttonName: string) => {
    if (buttonName === "Toggle All") {
      await todoPage.toggleAllTasks();
    } else if (buttonName === "Clear completed") {
      await todoPage.clearAllCompleted();
    } else {
      throw new Error(
        `Button "${buttonName}" is not defined in the Page Class logic.`,
      );
    }
  },
);

Then(
  "All tasks should be marked as {string}",
  async ({ todoPage }, status: "completed" | "active") => {
    await todoPage.verifyAllTasksState(status);
  },
);

Given("I have cleared the default tasks", async ({ todoPage }) => {
  await todoPage.open();
  await todoPage.clearState();
});

Given("The input field is visible", async ({ todoPage }) => {
  await todoPage.verifyInputVisibility("visible");
});

When(
  "I add a task with the value {string}",
  async ({ todoPage }, value: string) => {
    await todoPage.addNewTask(value);
  },
);

Then("The task should be rendered as plain text", async () => {
  // Semantic marker.
});

Then(
  "The task list should contain {string}",
  async ({ todoPage }, expected: string) => {
    await todoPage.verifyTaskText(expected);
  },
);

When(
  "I add a task with {string} characters",
  async ({ todoPage }, length: string) => {
    const charCount = parseInt(length, 10);
    const longTaskName = "a".repeat(charCount);

    await todoPage.addNewTask(longTaskName);
  },
);

Then(
  "The task element should not exceed the width of the parent container",
  async ({ todoPage }) => {
    await todoPage.verifyLastTaskWidth();
  },
);

When(
  "I populate the list with:",
  async ({ todoPage }, dataTable: { hashes: () => any[] }) => {
    await todoPage.setupTasks(dataTable.hashes());
  },
);

Then(
  "The delete button for {string} should be hidden",
  async ({ todoPage }, name: string) => {
    await todoPage.verifyDeleteButtonState(name, "hidden");
  },
);

When("I hover over the {string} task", async ({ todoPage }, name: string) => {
  await todoPage.hoverTask(name);
});

Then(
  "The delete button for {string} should be visible",
  async ({ todoPage }, name: string) => {
    await todoPage.verifyDeleteButtonState(name, "visible");
  },
);

When("I delete the task {string}", async ({ todoPage }, name: string) => {
  await todoPage.removeTask(name);
});

Then(
  "The task {string} should not be visible",
  async ({ todoPage }, name: string) => {
    await todoPage.verifyTaskState(name, "hidden");
  },
);

When("I click {string}", async ({ todoPage }, action: string) => {
  await todoPage.clickButtonByText(action);
});

Then("{string} should not be visible", async ({ todoPage }, text: string) => {
  await todoPage.verifyTaskState(text, "hidden");
});

When(
  "I rename the task {string} to {string}",
  async ({ todoPage }, oldName: string, newName: string) => {
    await todoPage.renameTask(oldName, newName);
  },
);

Then(
  "I should see {string} in the list",
  async ({ todoPage }, name: string) => {
    await todoPage.verifyTaskText(name);
  },
);

Then(
  "I should not see {string} in the list",
  async ({ todoPage }, name: string) => {
    await todoPage.verifyTaskState(name, "hidden");
  },
);

When(
  "I start editing {string} and press {string}",
  async ({ todoPage }, name: string, key: "Escape" | "Enter" | "Blur") => {
    // We pass the same name as newName to simulate starting the edit
    // and then cancelling/closing with the specific key action.
    await todoPage.renameTask(name, "New Edit", key);
  },
);

Then(
  "The task should still be {string}",
  async ({ todoPage }, name: string) => {
    // Verifies the text remains unchanged or is restored to the original value
    await todoPage.verifyTaskText(name);
  },
);

Then("The edit input should not be visible", async ({ todoPage }) => {
  await todoPage.verifyNoTaskIsEditing();
});

When(
  "I change {string} to {string}",
  async ({ todoPage }, oldName: string, newName: string) => {
    await todoPage.renameTask(oldName, newName);
  },
);

When("I click outside the task", async ({ todoPage }) => {
  await todoPage.clickOutside();
});

Then(
  "the task {string} should be removed from the list",
  async ({ todoPage }, name: string) => {
    await todoPage.verifyTaskState(name, "hidden");
  },
);

When(
  "I select the {string} filter",
  async ({ todoPage }, filterName: "All" | "Active" | "Completed") => {
    await todoPage.filterTasks(filterName);
  },
);

Then("I should see {string}", async ({ todoPage }, name: string) => {
  await todoPage.verifyTaskText(name);
});

Then("I should not see {string}", async ({ todoPage }, name: string) => {
  await todoPage.verifyTaskState(name, "hidden");
});

Then("I should see no tasks in the list", async ({ todoPage }) => {
  await todoPage.verifyNoTasksVisible();
});

Given(
  "I have selected the {string} filter",
  async ({ todoPage }, filterName: "All" | "Active" | "Completed") => {
    // Background/Setup step to set the initial filter state
    await todoPage.filterTasks(filterName);
  },
);

When(
  "I add the following tasks:",
  async ({ todoPage }, dataTable: { hashes: () => any[] }) => {
    // Iterates through the table and adds each task one by one
    for (const row of dataTable.hashes()) {
      await todoPage.addNewTask(row.name);
    }
  },
);

Then(
  "{string} should be at position {string}",
  async ({ todoPage }, name: string, position: string) => {
    // Convert string "1" to number
    await todoPage.verifyTaskPosition(name, parseInt(position, 10));
  },
);

Given(
  "I have the following tasks in order:",
  async ({ todoPage }, dataTable: { hashes: () => any[] }) => {
    await todoPage.open();
    await todoPage.clearState();
    await todoPage.setupTasks(dataTable.hashes());
  },
);

When("I reload the page", async ({ todoPage }) => {
  await todoPage.reload();
});
