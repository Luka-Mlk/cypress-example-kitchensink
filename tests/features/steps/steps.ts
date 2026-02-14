import { Given, When, Then } from "@fixtures";

Given("I have the following todo tasks:", async ({}, dataTable: Object) => {
  // Step: Given I have the following todo tasks:
  // From: features/completion.feature:4:5
});

When(
  "I mark the task {string} as {string}",
  async ({}, arg: string, arg1: string) => {
    // Step: When I mark the task "Invite guests" as "completed"
    // From: features/completion.feature:12:5
  },
);

Then(
  "the task {string} should be {string}",
  async ({}, arg: string, arg1: string) => {
    // Step: Then the task "Invite guests" should be "checked"
    // From: features/completion.feature:13:5
  },
);

Then(
  "the task {string} should {string} a strikethrough style",
  async ({}, arg: string, arg1: string) => {
    // Step: And the task "Invite guests" should "have" a strikethrough style
    // From: features/completion.feature:14:5
  },
);

Then("the task counter should be {string}", async ({}, arg: string) => {
  // Step: And the task counter should be "1"
  // From: features/completion.feature:15:5
});

When("I click the {string} button", async ({}, arg: string) => {
  // Step: When I click the "Toggle All" button
  // From: features/completion.feature:24:5
});

Then("all tasks should be marked as {string}", async ({}, arg: string) => {
  // Step: Then all tasks should be marked as "completed"
  // From: features/completion.feature:25:5
});

Given("I have cleared the default tasks", async ({}) => {
  // Step: Given I have cleared the default tasks
  // From: features/creation.feature:4:5
});

Given("the input field is visible", async ({}) => {
  // Step: And the input field is visible
  // From: features/creation.feature:5:5
});

When("I add a task with the value {string}", async ({}, arg: string) => {
  // Step: When I add a task with the value "Buy Coffee Filters"
  // From: features/creation.feature:8:5
});

Then("the task should be rendered as plain text", async ({}) => {
  // Step: Then the task should be rendered as plain text
  // From: features/creation.feature:9:5
});

Then("the task list should contain {string}", async ({}, arg: string) => {
  // Step: And the task list should contain "Buy Coffee Filters"
  // From: features/creation.feature:10:5
});

When("I add a task with {string} characters", async ({}, arg: string) => {
  // Step: When I add a task with "1000" characters
  // From: features/creation.feature:21:5
});

Then(
  "the task element should not exceed the width of the parent container",
  async ({}) => {
    // Step: Then the task element should not exceed the width of the parent container
    // From: features/creation.feature:22:5
  },
);

When("I populate the list with:", async ({}, dataTable: Object) => {
  // Step: When I populate the list with:
  // From: features/creation.feature:25:5
});

Then(
  "the delete button for {string} should be hidden",
  async ({}, arg: string) => {
    // Step: Then the delete button for "Buy coffee" should be hidden
    // From: features/deletion.feature:12:5
  },
);

When("I hover over the {string} task", async ({}, arg: string) => {
  // Step: When I hover over the "Buy coffee" task
  // From: features/deletion.feature:13:5
});

Then(
  "the delete button for {string} should be visible",
  async ({}, arg: string) => {
    // Step: Then the delete button for "Buy coffee" should be visible
    // From: features/deletion.feature:14:5
  },
);

When("I delete the task {string}", async ({}, arg: string) => {
  // Step: When I delete the task "Buy coffee filters"
  // From: features/deletion.feature:17:5
});

Then("the task {string} should not be visible", async ({}, arg: string) => {
  // Step: Then the task "Buy coffee filters" should not be visible
  // From: features/deletion.feature:18:5
});

When("I click {string}", async ({}, arg: string) => {
  // Step: When I click "Clear completed"
  // From: features/deletion.feature:27:5
});

Then("{string} should not be visible", async ({}, arg: string) => {
  // Step: And "Clear completed" should not be visible
  // From: features/deletion.feature:30:5
});

When(
  "I rename the task {string} to {string}",
  async ({}, arg: string, arg1: string) => {
    // Step: When I rename the task "Buy coffee" to "Buy espresso"
    // From: features/editing.feature:11:5
  },
);

Then("I should see {string} in the list", async ({}, arg: string) => {
  // Step: Then I should see "Buy espresso" in the list
  // From: features/editing.feature:12:5
});

Then("I should not see {string} in the list", async ({}, arg: string) => {
  // Step: And I should not see "Buy coffee" in the list
  // From: features/editing.feature:13:5
});

When(
  "I start editing {string} but press {string}",
  async ({}, arg: string, arg1: string) => {
    // Step: When I start editing "Grind beans" but press "Escape"
    // From: features/editing.feature:21:5
  },
);

Then("the task should still be {string}", async ({}, arg: string) => {
  // Step: Then the task should still be "Grind beans"
  // From: features/editing.feature:22:5
});

Then("the edit input should not be visible", async ({}) => {
  // Step: And the edit input should not be visible
  // From: features/editing.feature:23:5
});

When("I change {string} to {string}", async ({}, arg: string, arg1: string) => {
  // Step: When I change "Buy coffee" to "Buy arabica"
  // From: features/editing.feature:26:5
});

When("I click outside the task", async ({}) => {
  // Step: And I click outside the task
  // From: features/editing.feature:27:5
});

Then(
  "the task {string} should be removed from the list",
  async ({}, arg: string) => {
    // Step: Then the task "Grind beans" should be removed from the list
    // From: features/editing.feature:32:5
  },
);

When("I select the {string} filter", async ({}, arg: string) => {
  // Step: When I select the "Active" filter
  // From: features/filtering.feature:10:5
});

Then("I should see {string}", async ({}, arg: string) => {
  // Step: Then I should see "Active task"
  // From: features/filtering.feature:11:5
});

Then("I should not see {string}", async ({}, arg: string) => {
  // Step: And I should not see "Completed task"
  // From: features/filtering.feature:12:5
});

Then("I should see no tasks in the list", async ({}) => {
  // Step: Then I should see no tasks in the list
  // From: features/filtering.feature:22:5
});

Given("I have selected the {string} filter", async ({}, arg: string) => {
  // Step: Given I have selected the "Active" filter
  // From: features/filtering.feature:26:5
});

When("I add the following tasks:", async ({}, dataTable: Object) => {
  // Step: When I add the following tasks:
  // From: features/ordering.feature:7:5
});

Then(
  "{string} should be at position {string}",
  async ({}, arg: string, arg1: string) => {
    // Step: Then "Task A" should be at position "1"
    // From: features/ordering.feature:11:5
  },
);

Given("I have the following tasks in order:", async ({}, dataTable: Object) => {
  // Step: Given I have the following tasks in order:
  // From: features/ordering.feature:15:5
});

When("I reload the page", async ({}) => {
  // Step: When I reload the page
  // From: features/ordering.feature:19:5
});
