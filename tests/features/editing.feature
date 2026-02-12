Feature: User edits a task

  Background:
    Given I have the following todo tasks:
      | value       | status    |
      | Buy milk    | completed |
      | Buy coffee  | active    |
      | Grind beans | active    |

  Scenario Outline: Rename tasks with different states
    When I rename the task <task_name_old> to <task_name_new>
    Then I should see <task_name_new> in the list
    And I should not see <task_name_old> in the list

    Examples:
      | task_name_old | task_name_new  |
      | "Buy coffee"  | "Buy espresso" |
      | "Buy milk"    | "Buy oat milk" |

  Scenario: Cancel editing by pressing Escape
    When I start editing "Grind beans" but press "Escape"
    Then the task should still be "Grind beans"
    And the edit input should not be visible

  Scenario: Save edit by clicking away
    When I change "Buy coffee" to "Buy arabica"
    And I click outside the task
    Then I should see "Buy arabica" in the list

  Scenario: Prevent empty task names
    When I rename the task "Grind beans" to ""
    Then the task "Grind beans" should be removed from the list
