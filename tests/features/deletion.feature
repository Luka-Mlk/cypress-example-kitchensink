Feature: User deletes a task

  Background:
    Given I have the following todo tasks:
      | name               | status    |
      | Buy coffee filters | active    |
      | Buy coffee         | completed |
      | Buy milk           | completed |
      | Invite guests      | active    |

  Scenario: Delete button visibility is controlled by hover
    Then The delete button for "Buy coffee" should be hidden
    When I hover over the "Buy coffee" task
    Then The delete button for "Buy coffee" should be visible

  Scenario Outline: Delete tasks in different states
    When I delete the task <task_name>
    Then The task <task_name> should not be visible
    And The task counter should be <expected_count>

    Examples:
      | task_name            | task_status | expected_count |
      | "Buy coffee filters" | "active"    | "1"            |
      | "Buy milk"           | "completed" | "2"            |

  Scenario: Delete all completed tasks
    When I click "Clear completed"
    Then The task "Buy coffee" should not be visible
    And The task "Buy milk" should not be visible
    And "Clear completed" should not be visible
    And The task counter should be "2"
