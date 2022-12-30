/// <reference types="cypress" />

class HeroAppQuery {
    static selectors (webElement) {
        switch (webElement) {
            case "Basic Auth": return cy.get("li>a").contains("Basic Auth")
            case "authorizedMsg": return cy.get(".example p")
        }
    }
}

export default HeroAppQuery;
