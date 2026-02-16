Feature: User edits a task

  Background:
    Given I have the following todo tasks:
      | name        | status    |
      | Buy milk    | completed |
      | Buy coffee  | active    |
      | Grind beans | active    |

  Scenario Outline: Rename tasks with different states
    When I change <task_name_old> to <task_name_new>
    Then I should see <task_name_new> in the list
    And I should not see <task_name_old> in the list

    Examples:
      | task_name_old | task_name_new  |
      | "Buy coffee"  | "Buy espresso" |
      | "Buy milk"    | "Buy oat milk" |

  Scenario: Cancel editing by pressing Escape
    When I start editing "Grind beans" and press "Escape"
    Then The task should still be "Grind beans"
    And The edit input should not be visible

  Scenario: Save edit by clicking away
    When I change "Buy coffee" to "Buy arabica"
    And I click outside the task
    Then I should see "Buy arabica" in the list

  Scenario: Prevent empty task names
    When I change "Grind beans" to ""
    Then The task "Grind beans" should not be visible
