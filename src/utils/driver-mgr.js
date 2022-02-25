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

// https://stackoverflow.com/a/39914235/1332513
// eslint-disable-next-line no-promise-executor-return
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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

export const logOut = async (driver, mailClient) => {
  await navigateTo(driver, '/newtab')
  const iconPath = '//a[@href="/newtab/account/"]'
  await waitAndClick(driver, By.xpath(iconPath))
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(`//p[text()="${mailClient.email}"]`)
  )
  await waitAndClick(driver, By.xpath('//span[text()="Log Out"]'))
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath('//span[text()="Sign in with email"]')
  )
  await sleep(3000)
}

export const setCats = async (driver) => {
  await navigateTo(driver, '/cats/')
  await waitAndClick(driver, By.css('button'))
  await waitForElementExistsByCustomSelector(
    driver,
    By.css(`[aria-label='Add to Chrome'`)
  )
  await navigateTo(driver, '/newtab/first-tab')
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath('//span[text()="Sign in with email"]')
  )
}

export const setCause = async (
  driver,
  landingPath,
  // eslint-disable-next-line no-unused-vars
  isReferral = false
) => {
  await navigateTo(driver, landingPath)

  // TODO: reenable when implemented or remove. The new version of the
  // landing page does not have a referral message.
  // if (isReferral) {
  //   await waitForElementExistsByCustomSelector(
  //     driver,
  //     By.xpath('//div[text()="Your friend sent you a gift"]')
  //   )
  // }

  await waitAndClick(driver, By.css('button'))
  await waitForElementExistsByCustomSelector(
    driver,
    By.css(`[aria-label='Add to Chrome'`)
  )
  await navigateTo(driver, '/newtab/first-tab')
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath('//span[text()="Sign in with email"]')
  )
}

export const completeIntroFlow = async (
  driver,
  mailClient,
  squads = false,
  referralText = null,
  text = 'Help more cats with squads'
) => {
  const link = (await mailClient.getLink()).replace('dev-', 'test-')
  await driver.navigate().to(link)
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath('//button[text()="Continue"]')
  )
  await click(driver, By.xpath('//button[text()="Continue"]'))
  await waitForElementExistsByCustomSelector(driver, By.id('username-input'))
  await setValue(
    driver,
    By.id('username-input'),
    mailClient.email.split('@')[0]
  )
  await sleep(1000)
  await click(driver, By.xpath('//span[text()="Next"]'))
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath('//h5[text()="Your tabs are doing great things"]')
  )
  await click(driver, By.xpath('//span[text()="Next"]'))
  if (squads) {
    await waitForElementExistsByCustomSelector(
      driver,
      By.xpath('//span[text()="Next"]')
    )
    await waitForElementExistsByCustomSelector(
      driver,
      By.xpath(`//h5[text()="${text}"]`)
    )
    await click(driver, By.xpath('//span[text()="Next"]'))
  }
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
  )
  await click(driver, By.xpath('//span[text()="Next"]'))
  await waitAndClick(driver, By.xpath(`//span[text()="I'M READY!"]`))
  await sleep(1000)
  if (referralText) {
    await driver.findElements(By.xpath(`//h5[text()="${referralText}"]`))
  }
  await navigateTo(driver, '/newtab')
}

export const inviteUser = async (driver, invitingUser, invitedUser) => {
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(`//div[label[contains(., 'Your name')]]/div/input`)
  )
  await setValue(
    driver,
    By.xpath(`//div[label[contains(., 'Your name')]]/div/input`),
    'test user'
  )
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(`//div[label[contains(., 'Recipients')]]/div/input`)
  )
  await setValue(
    driver,
    By.xpath(`//div[label[contains(., 'Recipients')]]/div/input`),
    invitedUser.email
  )
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(`//div[label[contains(., 'Message')]]/div/textarea`)
  )
  await setValue(
    driver,
    By.xpath(`//div[label[contains(., 'Message')]]/div/textarea`),
    'test Message'
  )
  await waitAndClick(driver, By.xpath(`//span[text()="Send Invite"]`))
  await sleep(1000)
}
export const inviteUserFromHomePage = async (
  driver,
  invitingUser,
  invitedUser
) => {
  await waitAndClick(driver, By.xpath('//span[text()="Hooray!"]'))
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(`//div[label[contains(., 'Your name')]]/div/input`)
  )
  await setValue(
    driver,
    By.xpath(`//div[label[contains(., 'Your name')]]/div/input`),
    'test user'
  )
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(`//div[label[contains(., 'Recipients')]]/div/input`)
  )
  await setValue(
    driver,
    By.xpath(`//div[label[contains(., 'Recipients')]]/div/input`),
    invitedUser.email
  )
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(`//div[label[contains(., 'Message')]]/div/textarea`)
  )
  await setValue(
    driver,
    By.xpath(`//div[label[contains(., 'Message')]]/div/textarea`),
    'test Message'
  )
  await waitAndClick(driver, By.xpath(`//span[text()="Send Invite"]`))
  await sleep(1000)
  await driver.navigate().refresh()
}
export const createMission = async (driver, invitingUser, invitedUser) => {
  await waitAndClick(
    driver,
    By.xpath('//span[contains(text(),"create a squad")]')
  )
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(`//div[label[contains(., 'Squad Name')]]/div/input`)
  )
  await setValue(
    driver,
    By.xpath(`//div[label[contains(., 'Squad Name')]]/div/input`),
    invitingUser.email.split('@')[0]
  )
  await waitAndClick(driver, By.xpath(`//span[text()="next"]`))
  await inviteUser(driver, invitingUser, invitedUser)
}
export const signUpViaEmailInviteNewHomePage = async (
  driver,
  user,
  homepageText = 'The easiest way to save our seas'
) => {
  const referralLink = await user.getEmailInvite()
  await driver.navigate().to(referralLink)
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(`//h1[text()="${homepageText}"]`)
  )
  const testUrl = (await driver.getCurrentUrl())
    .toString()
    .replace('tab.', 'test-tab2017.')
  await driver.navigate().to(testUrl)
  await waitAndClick(driver, By.css('button'))
  await waitForElementExistsByCustomSelector(
    driver,
    By.css(`[aria-label='Add to Chrome'`)
  )
}
export const signUpViaEmailInvite = async (driver, user) => {
  const referralLink = await user.getEmailInvite()
  await driver.navigate().to(referralLink)
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath(
      '//div[text()="Your friend has invited you to help join their rescue mission"]'
    )
  )
  const testUrl = (await driver.getCurrentUrl())
    .toString()
    .replace('tab.', 'test-tab2017.')
  await driver.navigate().to(testUrl)
  await waitAndClick(driver, By.css('button'))
  await waitForElementExistsByCustomSelector(
    driver,
    By.css(`[aria-label='Add to Chrome'`)
  )
  await navigateTo(driver, '/newtab/first-tab')
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath('//span[text()="Sign in with email"]')
  )
  await signUp(driver, user.email, user.password)
}

export const completeMission = async (driver) => {
  await waitAndClick(driver, By.xpath('//span[text()="View Details"]'))
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath('//h6[text()="Mission Started"]')
  )
  await navigateTo(driver, '/newtab')
  await driver.navigate().refresh()
  await sleep(2500)
  await driver.navigate().refresh()
  await sleep(2500)
  await driver.navigate().refresh()
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath('//p[text()="Mission Completed!"]')
  )
}
export const restartMission = async (driver) => {
  await waitAndClick(driver, By.xpath('//span[text()="View Details"]'))
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath('//h5[text()="Mission Complete"]')
  )
  await waitAndClick(driver, By.xpath('//span[text()="RESTART MISSION"]'))
  await waitForElementExistsByCustomSelector(
    driver,
    By.xpath('//h6[text()="Awaiting Squadmates"]')
  )
}
