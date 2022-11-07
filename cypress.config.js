const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

const fs = require('fs-extra');
let githubActionsKeys = {}

async function setupNodeEvents(on, config) {
    await preprocessor.addCucumberPreprocessorPlugin(on, config);
  
    on(
      "file:preprocessor",
      createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      })
    );
    
    cleanReports();
    readGitHubSecrets(config);
  
    on('task', {
      logMsg(msg) {
        console.log(msg);
        return null;
      },
      getGithubKeys: () => {
        return githubActionsKeys;
      },
    });

    const envKey = config.env.envKey || 'default';
    config.env.TEST_TRIGGER = 'local';

    if (envKey !== 'default') {
      return getConfigByFile(envKey, config);
    } else {
      return config;
    }
  }
  
module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    specPattern: ["**/*.feature", "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"],
    pageLoadTimeout: 90000,
    responseTimeout: 45000,
    defaultCommandTimeout: 6000,
    video: true,
    chromeWebSecurity: false,
    screenshotsFolder: "cypress/results/screenshots",
    videosFolder: "cypress/results/videos",
    downloadsFolder: "cypress/results/downloads",
    supportFile: 'cypress/support/e2e.js',
    reporter: "cypress-multi-reporters",
    reporterOptions: {
        "configFile": "cypress/config/reporter-configs.json"
    },
    env: {
        "TAGS": "not @skip",
        "expandCollapseTime": 1500,
        "ACTION_TEST": "[SHOULD BE OVERWRITTEN]",
        "SeleniumEasy": "https://demo.seleniumeasy.com/",
        "HeroApp": "https://the-internet.herokuapp.com/"
    },
    setupNodeEvents,
  }
})

function cleanReports() {
    const reportPath = './cypress/results/reports';
    if (fs.existsSync(reportPath)) {
        fs.rmdirSync('./cypress/results/reports', { recursive: true });
    }
};

function getConfigByFile(envKey, config) {
  let fileName = `cypress_${envKey}.json`
  console.log("Config file: " + fileName);

  let rawData = fs.readFileSync(`cypress/config/${fileName}`);
  let newConfig = JSON.parse(rawData);

  config = {...config, ...newConfig}
  return config;
};

function readGitHubSecrets(config) {
    githubActionsKeys["process_env_CYPRESS_ACTION_TEST"] = process.env.CYPRESS_ACTION_TEST
    githubActionsKeys["config_ACTION_TEST"] = config.env.ACTION_TEST

    githubActionsKeys["Username"] = process.env.USER_DEV
    githubActionsKeys["Password"] = process.env.PASS_DEV
}