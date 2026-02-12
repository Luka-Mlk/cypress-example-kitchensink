Feature: User completes a task

  Background:
    Given I have the following todo tasks:
      | value              | status    |
      | Buy coffee filters | active    |
      | Buy coffee         | completed |
      | Buy milk           | completed |
      | Invite guests      | active    |

  Scenario Outline: Toggle task status and verify counter and style
    When I mark the task <task_name> as <target_status>
    Then the task <task_name> should be <expected_check_state>
    And the task <task_name> should <strikethrough_action> a strikethrough style
    And the task counter should be <expected_count>

    Examples:
      | task_name            | target_status | expected_check_state | strikethrough_action | expected_count |
      | "Invite guests"      | "completed"   | "checked"            | "have"               | "1"            |
      | "Buy coffee"         | "active"      | "unchecked"          | "not have"           | "3"            |
      | "Buy coffee filters" | "completed"   | "checked"            | "have"               | "1"            |

  Scenario: Bulk toggle all tasks
    When I click the "Toggle All" button
    Then all tasks should be marked as "completed"
    And the task counter should be "0"

  Scenario: Toggle task status multiple times
    When I mark the task "Buy coffee filters" as "completed"
    And I mark the task "Buy coffee filters" as "active"
    Then the task "Buy coffee filters" should be "unchecked"
    And the task counter should be "2"
