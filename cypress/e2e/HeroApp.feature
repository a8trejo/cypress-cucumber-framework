Feature: HeroApp WebPage Automation

Background: Authorized access
    Given I open the 'HeroApp' demo page

Scenario: Open and close a basic auth promt
    When I click on the "Basic Auth" demo option
    Then I can see the Basic Auth header
    # Then I can add my credentials
    Then I can say Hi to Github Actions
