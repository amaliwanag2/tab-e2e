/* eslint-disable no-param-reassign */
import webdriver from 'selenium-webdriver'

const { By } = webdriver
const { until } = webdriver

const BROWSER_NAME = 'chrome'
const BROWSERSTACK_PROJECT = 'tab'
const BROWSERSTACK_BUILD = 'tab-'

const TWENTY_SECONDS_IN_MS = 20e3

const getAppBaseUrl = () => {
  // TODO: remove defaults
  const seleniumHostDefault = 'https://test-tab2017.gladly.io'

  // TODO: remove all use env vars from this package. All vars should
  // be passed via the config.
  const { SELENIUM_HOST } = process.env
  if (!SELENIUM_HOST) {
    // eslint-disable-next-line no-console
    console.warn(
      `Environment variable "SELENIUM_HOST" is not set. Using default of "${seleniumHostDefault}".`
    )
  }
  return process.env.SELENIUM_HOST || 'https://test-tab2017.gladly.io'
}

export const getAbsoluteUrl = (relativeUrl) =>
  `${getAppBaseUrl()}${relativeUrl}`

const initDriver = (config = { selenium: {}, browserstack: {}, build: {} }) => {
  // TODO: config properties should be camelCase.
  const {
    selenium: { SELENIUM_DRIVER_TYPE = process.env.SELENIUM_DRIVER_TYPE },
    browserstack: {
      BROWSERSTACK_USER = process.env.BROWSERSTACK_USER,
      BROWSERSTACK_KEY = process.env.BROWSERSTACK_KEY,
    },
    // TODO: generalize this to "buildId".
    // TODO: we may want a way to identify the calling app (which
    //   app's CI process initiated the test run).
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

    // eslint-disable-next-line no-use-before-define
    return { config, driver }
  }
}
export default initDriver

export const waitForElementExistsByCustomSelector = (driver, selector) =>
  driver.wait(until.elementLocated(selector), TWENTY_SECONDS_IN_MS)

export const waitForElementExistsByTestId = (driver, dataTestId) =>
  driver.wait(
    until.elementLocated(By.css(`[data-test-id='${dataTestId}']`)),
    TWENTY_SECONDS_IN_MS
  )

export const getElementByTestId = (driver, dataTestId) =>
  driver.findElement(By.css(`[data-test-id='${dataTestId}']`))

export const getElementByCSSSelector = (driver, selector) =>
  driver.findElement(By.css(selector))

export const setValue = (driver, selector, value) =>
  driver.findElement(selector).sendKeys(value)

export const click = (driver, selector) => driver.findElement(selector).click()

export const waitAndClick = async (driver, selector) => {
  await waitForElementExistsByCustomSelector(driver, selector)
  await click(driver, selector)
}
export const navigateTo = (driver, url) =>
  driver.navigate().to(getAbsoluteUrl(url))

export const signIn = async (
  driver,
  INTEGRATION_TEST_USER_EMAIL,
  INTEGRATION_TEST_USER_PASSWORD
) => {
  // We set these private env vars directly in our CI tool.
  const testUserEmail = INTEGRATION_TEST_USER_EMAIL
  const testUserPassword = INTEGRATION_TEST_USER_PASSWORD
  if (!testUserEmail) {
    // TODO: don't refer to env vars but rather the config property.
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

  await waitForElementExistsByCustomSelector(driver, emailSignInButtonSelector)
  await click(driver, emailSignInButtonSelector)
  await waitForElementExistsByCustomSelector(driver, emailInputSelector)
  await setValue(driver, emailInputSelector, testUserEmail)
  await click(driver, By.css('button[type="submit"]'))
  await waitForElementExistsByCustomSelector(driver, passwordInputSelector)
  await setValue(driver, passwordInputSelector, testUserPassword)
  await click(driver, By.css('button[type="submit"]'))
}
export const signUp = async (
  driver,
  INTEGRATION_TEST_USER_EMAIL,
  INTEGRATION_TEST_USER_PASSWORD
) => {
  // We set these private env vars directly in our CI tool.
  const testUserEmail = INTEGRATION_TEST_USER_EMAIL
  const testUserPassword = INTEGRATION_TEST_USER_PASSWORD
  if (!testUserEmail) {
    throw new Error('You must provide an email.')
  }
  if (!testUserPassword) {
    throw new Error('You must provide a password.')
  }

  const emailSignInButtonSelector = By.css('[data-provider-id="password"]')
  const emailInputSelector = By.css('input[name="email"]')
  const passwordInputSelector = By.css('input[name="newPassword"]')

  await waitForElementExistsByCustomSelector(driver, emailSignInButtonSelector)
  await click(driver, emailSignInButtonSelector)
  await waitForElementExistsByCustomSelector(driver, emailInputSelector)
  await setValue(driver, emailInputSelector, testUserEmail)
  await click(driver, By.css('button[type="submit"]'))
  await waitForElementExistsByCustomSelector(driver, passwordInputSelector)
  await setValue(driver, passwordInputSelector, testUserPassword)
  await click(driver, By.css('button[type="submit"]'))
}
