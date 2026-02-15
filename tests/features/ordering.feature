Feature: Ordering of tasks

  Background:
    Given I have cleared the default tasks

  Scenario: Tasks are ordered by when they are created
    When I add the following tasks:
      | name   | status |
      | Task A | active |
      | Task B | active |
    Then "Task A" should be at position "1"
    And "Task B" should be at position "2"

  Scenario: Order is maintained after a page reload
    Given I have the following tasks in order:
      | name       | status |
      | Buy milk   | active |
      | Clean room | active |
    When I reload the page
    Then "Buy milk" should be at position "1"
    And "Clean room" should be at position "2"
