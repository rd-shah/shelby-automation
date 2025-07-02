Feature: Accounts Payable module navigation and visibility

  Scenario: User navigates to Accounts Payable and sees the module
    Given the user is logged in to the Shelby financial application
    When the user navigates to the Accounts Payable module
    Then the Accounts Payable page should be displayed
    Then hovering over Enter menu should show the "Enter Transaction" option
    Then the user should be able to create Non Avid Invoice  transaction
    Then Click on Add new transaction button for creating ACH transaction
    Then click on Add new transaction button for Avid pay transaction
    Then post the created Non Avid Invoice transaction
    Then navigate to Payment processing screen 
    Then post the ACH Invoice transaction

    