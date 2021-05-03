/* eslint-disable no-param-reassign */
import webdriver from 'selenium-webdriver'

const { By } = webdriver
const { until } = webdriver

const BROWSER_NAME = 'chrome'
const BROWSERSTACK_PROJECT = 'tab'
const BROWSERSTACK_BUILD = 'tab-'

const getAppBaseUrl = () => {
  const seleniumHostDefault = 'http://localhost:3000'
  const { SELENIUM_HOST } = process.env
  if (!SELENIUM_HOST) {
    // eslint-disable-next-line no-console
    console.warn(
      `Environment variable "SELENIUM_HOST" is not set. Using default of "${seleniumHostDefault}".`
    )
  }
  return process.env.SELENIUM_HOST || 'http://localhost:3000'
}

export const getAbsoluteUrl = (relativeUrl) =>
  `${getAppBaseUrl()}${relativeUrl}`

const initDriver = (config = { selenium: {}, browserstack: {}, build: {} }) => {
  const {
    selenium: {
      SELENIUM_DRIVER_TYPE = process.env.SELENIUM_DRIVER_TYPE,
      INTEGRATION_TEST_USER_EMAIL = process.env.INTEGRATION_TEST_USER_EMAIL,
      INTEGRATION_TEST_USER_PASSWORD = process.env
        .INTEGRATION_TEST_USER_PASSWORD,
    },
    browserstack: {
      BROWSERSTACK_USER = process.env.BROWSERSTACK_USER,
      BROWSERSTACK_KEY = process.env.BROWSERSTACK_KEY,
    },
    build: { TRAVIS_BUILD_NUMBER = process.env.TRAVIS_BUILD_NUMBER },
  } = config
  return (testName) => {
    let driver
    if (!SELENIUM_DRIVER_TYPE || SELENIUM_DRIVER_TYPE !== 'remote') {
      driver = new webdriver.Builder().forBrowser(BROWSER_NAME).build()
    } else {
      const capabilities = {
        browserName: BROWSER_NAME,
        'browserstack.user': BROWSERSTACK_USER,
        'browserstack.key': BROWSERSTACK_KEY,
        project: BROWSERSTACK_PROJECT,
        build: BROWSERSTACK_BUILD + TRAVIS_BUILD_NUMBER,
        name: testName,
      }

      driver = new webdriver.Builder()
        .usingServer('http://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build()
    }

    // Add some helper methods to the Selenium driver.  Mutating driver passed in
    driver.waitForElementExistsByCustomSelector = (selector) =>
      driver.wait(until.elementLocated(selector))

    driver.waitForElementExistsByTestId = (dataTestId) =>
      driver.wait(
        until.elementLocated(By.css(`[data-test-id='${dataTestId}']`))
      )

    driver.getElementByTestId = (dataTestId) =>
      driver.findElement(By.css(`[data-test-id='${dataTestId}']`))

    driver.getElementByCSSSelector = (selector) =>
      driver.findElement(By.css(selector))

    driver.setValue = (selector, value) =>
      driver.findElement(selector).sendKeys(value)

    driver.click = (selector) => driver.findElement(selector).click()

    driver.navigateTo = (url) => driver.navigate().to(getAbsoluteUrl(url))

    driver.signIn = async () => {
      // We set these private env vars directly in our CI tool.
      const testUserEmail = INTEGRATION_TEST_USER_EMAIL
      const testUserPassword = INTEGRATION_TEST_USER_PASSWORD
      if (!testUserEmail) {
        throw new Error(
          'You must provide an email via `process.env.INTEGRATION_TEST_USER_EMAIL`.'
        )
      }
      if (!testUserPassword) {
        throw new Error(
          'You must provide an email via `process.env.INTEGRATION_TEST_USER_PASSWORD`.'
        )
      }

      const emailSignInButtonSelector = By.css('[data-provider-id="password"]')
      const emailInputSelector = By.css('input[name="email"]')
      const passwordInputSelector = By.css('input[name="password"]')

      await driver.waitForElementExistsByCustomSelector(
        emailSignInButtonSelector
      )
      await driver.click(emailSignInButtonSelector)
      await driver.waitForElementExistsByCustomSelector(emailInputSelector)
      await driver.setValue(emailInputSelector, testUserEmail)
      await driver.click(By.css('button[type="submit"]'))
      await driver.waitForElementExistsByCustomSelector(passwordInputSelector)
      await driver.setValue(passwordInputSelector, testUserPassword)
      await driver.click(By.css('button[type="submit"]'))
    }

    // eslint-disable-next-line no-use-before-define
    return driver
  }
}
export default initDriver
