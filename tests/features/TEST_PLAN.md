# TodoMVC test suite

This document explains the strategy for automating the functional and regression testing of the Todo app included in the cypress repo. This framework strives to be maintainable, scalable, and a human-readable test suite using Playwright.

2. Test Architecture

The framework is designed with Separation of Concerns in mind to ensure high reliability and easy maintenance.
- Infrastructure Layer (`/infra`): Handles the Playwright configuration, browser context, global hooks, and logging.
- Business Layer (`/business`): Houses the domain specific logic of the app.
  - Pages: High-level classes mimiking different views from the app (currently only 1).
  - Components: Highly reusable classes loosely mimiking their UI counterparts from front-end.
  - Steps: Methods connecting Gherkin to the Component and Page logic.
- Feature Layer (`/features`): Business-readable requirements written in Gherkin syntax.

3. Test Scenarios

Tests are data driven by utilizing scnario outlines to validate that the app accepts various input types correctly and preserving space

```
Scenario Outline: Validate task input handling and security
  When I add a task with the value <input_value>
  Then the task should be rendered as plain text
  And the task list should contain <expected_output>

  Examples:
    | input_value                                | expected_output                            |
    | "Buy Coffee Filters"                       | "Buy Coffee Filters"                       |
    | "Здраво"                                   | "Здраво"                                   |
    | "😀"                                        | "😀"                                        |
    | "DROP TABLE users;"                        | "DROP TABLE users;"                        |
    | "<script>window.xss_test = true;</script>" | "<script>window.xss_test = true;</script>" |
```

4. Core Functional Areas

The following features are covered by individual feature files:

Creation: Verification of task entry and list population.

Completion: Toggling status, Toggle All logic, and strikethrough styling.

Editing: Renaming tasks, Escape to cancel, and Blur to save.

Deletion: Individual deletion via hover and Clear Completed bulk action.

Filtering: Visibility logic for All, Active, and Completed views.

Ordering: Ensuring tasks stay in the correct sequence after reloads.

5. Technical Strategy

**Language**: TypeScript

**Tooling**: Playwright based on POM pattern

**Reporting**: Allure
