/// <reference types="cypress" />

import { defineStep } from "@badeball/cypress-cucumber-preprocessor";
import HeroAppQuery from '../Selectors/HeroAppQuery'

defineStep('I open the {string} demo page', (pageName) => {
    cy.login(pageName)
})

defineStep('I can say Hi to Github Actions', () => {
    let envKey = Cypress.env('envKey')
    cy.task('getGithubKeys').then((githubKeys) => {
        // Either process.env.VAR_NAME or config.env.VAR_NAME work to read ENV Variables of the Github Workflow in setupNodeEvents
        cy.logMsg("Github Secret for ACTION_TEST is " + githubKeys.process_env_CYPRESS_ACTION_TEST)
        cy.logMsg("Cypress Env Var for ACTION_TEST is " + githubKeys.config_ACTION_TEST)
        cy.logMsg("Environment under Test is: " + envKey)
    })
})