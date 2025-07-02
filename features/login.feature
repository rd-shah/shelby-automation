Feature: Login and Logout of Shelby financial application

  Scenario: User logs in and logs out successfully
    Given the user navigates to the login page
    When the user logs in with valid credentials
    Then the username "System Administrator" should be displayed
    When the user logs out
    Then the user should be redirected to the login page