Feature: Task Filtering and Visibility

  Background:
    Given I have the following todo tasks:
      | value          | status    |
      | Active task    | active    |
      | Completed task | completed |

  Scenario Outline: Verify filter visibility logic
    When I select the <filter_name> filter
    Then I should see <visible_item>
    And I should not see <hidden_item>

    Examples:
      | filter_name | visible_item     | hidden_item      |
      | "Active"    | "Active task"    | "Completed task" |
      | "Completed" | "Completed task" | "Active task"    |

  Scenario: Filtering an empty list
    Given I have cleared the default tasks
    When I select the "Completed" filter
    Then I should see no tasks in the list
    And "Clear completed" should not be visible

  Scenario: Task state change updates the current filter view
    Given I have selected the "Active" filter
    When I mark the task "Active task" as "completed"
    Then I should not see "Active task"
    And the task counter should be "0"
