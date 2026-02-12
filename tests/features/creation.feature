Feature: User creates a task

  Background:
    Given I have cleared the default tasks
    And the input field is visible

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

  Scenario: Create a task that is too long
    When I add a task with "1000" characters
    Then the task element should not exceed the width of the parent container

  Scenario: Task counter reflects only active tasks
    When I populate the list with:
      | value              | status    |
      | Buy coffee filters | active    |
      | Buy coffee         | completed |
      | Buy milk           | completed |
      | Make coffee        | active    |
    Then the task counter should be "2"
