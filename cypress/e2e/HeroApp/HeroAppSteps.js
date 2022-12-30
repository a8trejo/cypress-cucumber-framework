/// <reference types="cypress" />

import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"
import HeroAppQuery from '../../support/Selectors/HeroAppQuery';
let encodedAuth

before(() => {
    if(Cypress.env('CYPRESS_TEST_TRIGGER') === 'workflow_dispatch') {
        // Trying to read process env from a previous Github workflow step
        cy.task('getGithubKeys').then((githubKeys) => {
            // authString = `${Cypress.env("username")}:${Cypress.env("password")}`;
            authString = `${githubKeys["Username"]}:${githubKeys["Password"]}`

            cy.logMsg(authString)
            encodedAuth = window.btoa(authString);
        })
    } else {
        authString = `admin:admin`
        encodedAuth = window.btoa(authString);
    }
})

When('I click on the {string} demo option', (option) => {
    
    // Preparing to intercept the /basic_auth request and add the auth header once we click on login
    cy.intercept('GET', '**/basic_auth', (req) => {
        req.headers['authorization'] = `Basic ${encodedAuth}`
    })

    HeroAppQuery.selectors(option).click()
})

Given('I can see the Basic Auth header', () => {
    const authorizedMsg = "Congratulations! You must have the proper credentials"
    HeroAppQuery.selectors("authorizedMsg").should('contain', authorizedMsg)    
})

Given('I Debugg', () => {
    
})