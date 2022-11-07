/// <reference types="cypress" />

import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"
import HeroAppQuery from '../../support/Selectors/HeroAppQuery';

// I click on the "Basic Auth" demo option
before(() => {
    // Define and Encode the authentication string
    const authString = `${Cypress.env("username")}:${Cypress.env("password")}`;
    const encodedAuth = Buffer.from(authString).toString('base64')

    // Preparing to intercept the /basic_auth request and add the auth header once we click on login
    cy.intercept('GET', '**/basic_auth', (req) => {
        req.headers['authorization'] = `Basic ${encodedAuth}`
    })
})

When('I click on the {string} demo option', (option) => {
    HeroAppQuery.selectors(option).click()
})

Given('I Debugg', () => {
    
})