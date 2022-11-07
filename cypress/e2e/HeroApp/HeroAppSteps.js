/// <reference types="cypress" />

import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"
import HeroAppQuery from '../../support/Selectors/HeroAppQuery';

When('I click on the {string} demo option', (option) => {
    // Define and Encode the authentication string
    const authString = `${Cypress.env("username")}:${Cypress.env("password")}`;
    cy.logMsg(authString)

    const encodedAuth = window.btoa(authString);

    // Preparing to intercept the /basic_auth request and add the auth header once we click on login
    cy.intercept('GET', '**/basic_auth', (req) => {
        req.headers['authorization'] = `Basic ${encodedAuth}`
    })

    HeroAppQuery.selectors(option).click()
})

Given('I Debugg', () => {
    
})