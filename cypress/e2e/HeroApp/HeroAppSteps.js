/// <reference types="cypress" />

import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"
import HeroAppQuery from '../../support/Selectors/HeroAppQuery';
let encodedAuth

before(() => {
    // Trying to read process env from a previous Github workflow step
    cy.task('getGithubKeys').then((githubKeys) => {
        // authString = `${Cypress.env("username")}:${Cypress.env("password")}`;
        authString = `${githubKeys["Username"]}:${githubKeys["Password"]}`

        cy.logMsg(authString)
        encodedAuth = window.btoa(authString);
    })
})

When('I click on the {string} demo option', (option) => {
    
    // Preparing to intercept the /basic_auth request and add the auth header once we click on login
    cy.intercept('GET', '**/basic_auth', (req) => {
        req.headers['authorization'] = `Basic ${encodedAuth}`
    })

    HeroAppQuery.selectors(option).click()
})

Given('I Debugg', () => {
    
})