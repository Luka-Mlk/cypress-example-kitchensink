Feature: User deletes a task

  Background:
    Given I have the following todo tasks:
      | value              | status    |
      | Buy coffee filters | active    |
      | Buy coffee         | completed |
      | Buy milk           | completed |
      | Invite guests      | active    |

  Scenario: Delete button visibility is controlled by hover
    Then the delete button for "Buy coffee" should be hidden
    When I hover over the "Buy coffee" task
    Then the delete button for "Buy coffee" should be visible

  Scenario Outline: Delete tasks in different states
    When I delete the task <task_name>
    Then the task <task_name> should not be visible
    And the task counter should be <expected_count>

    Examples:
      | task_name            | task_status | expected_count |
      | "Buy coffee filters" | "active"    | "1"            |
      | "Buy milk"           | "completed" | "2"            |

  Scenario: Delete all completed tasks
    When I click "Clear completed"
    Then the task "Buy coffee" should not be visible
    And the task "Buy milk" should not be visible
    And "Clear completed" should not be visible
    And the task counter should be "2"
