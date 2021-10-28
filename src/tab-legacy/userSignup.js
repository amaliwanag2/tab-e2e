import { By } from 'selenium-webdriver'
import {
  waitForElementExistsByCustomSelector,
  signIn,
  signUp,
  navigateTo,
  setValue,
  click,
  waitAndClick,
  setCause,
  completeIntroFlow,
  logOut,
} from '../utils/driver-mgr'
import EmailClient from '../utils/mailosaurClient'

/* eslint-env jest */
const TEN_MINUTES_IN_MS = 6e5
const testTimeoutdefault = TEN_MINUTES_IN_MS

const getUserSignupTests = (getDriver) => {
  const tests = [
    {
      description:
        'should successfully sign up and create a user in Chrome Legacy',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver('Tab: acceptance tests: should sign up legacy ')
        try {
          await navigateTo(driver, '')
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
          const mailClient = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          await signUp(driver, mailClient.email, mailClient.password)
          const link = await mailClient.getLink()
          await driver.navigate().to(link)
          await waitAndClick(driver, By.xpath('//button[text()="Continue"]'))
          await waitForElementExistsByCustomSelector(
            driver,
            By.id('username-input')
          )
          await setValue(
            driver,
            By.id('username-input'),
            mailClient.email.split('@')[0]
          )
          await click(driver, By.xpath('//span[text()="Next"]'))
          await waitAndClick(driver, By.xpath('//span[text()="Next"]'))
          await waitAndClick(driver, By.css(`[aria-label='Next'`))
          await waitAndClick(driver, By.css(`[aria-label='Next'`))
          await waitAndClick(driver, By.css(`[aria-label='Last'`))
          await waitAndClick(driver, By.xpath('//span[text()="Skip for now"]'))
          await waitAndClick(driver, By.css(`[data-test-id='settings-button']`))
          await waitAndClick(
            driver,
            By.css(`[data-test-id='app-menu-sign-out']`)
          )
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath('//span[text()="Sign in with email"]')
          )
          await signIn(driver, mailClient.email, mailClient.password)
        } finally {
          await driver.quit()
        }
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description:
        'should successfully sign up and create a user in Chrome Legacy referral flow',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver('Tab: acceptance tests: should sign up legacy referral')
        try {
          await navigateTo(driver, '?u=gladly')
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
          const mailClient = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          await signUp(driver, mailClient.email, mailClient.password)
          const link = await mailClient.getLink()
          await driver.navigate().to(link)
          await waitAndClick(driver, By.xpath('//button[text()="Continue"]'))
          await waitForElementExistsByCustomSelector(
            driver,
            By.id('username-input')
          )
          await setValue(
            driver,
            By.id('username-input'),
            mailClient.email.split('@')[0]
          )
          await click(driver, By.xpath('//span[text()="Next"]'))
          await waitAndClick(driver, By.xpath('//span[text()="Next"]'))
          await waitAndClick(driver, By.css(`[aria-label='Next'`))
          await waitAndClick(driver, By.css(`[aria-label='Next'`))
          await waitAndClick(driver, By.css(`[aria-label='Last'`))
          await waitAndClick(driver, By.xpath('//span[text()="Skip for now"]'))
          await waitAndClick(driver, By.css(`[data-test-id='settings-button']`))
          await waitAndClick(
            driver,
            By.css(`[data-test-id='app-menu-sign-out']`)
          )
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath('//span[text()="Sign in with email"]')
          )
          await signIn(driver, mailClient.email, mailClient.password)
        } finally {
          await driver.quit()
        }
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description:
        'should successfully sign up and create a user in Chrome v4 cats',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver('Tab: acceptance tests: should sign up v4')
        try {
          const user1 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          await setCause(driver, '/cats/')
          await signUp(driver, user1.email, user1.password)
          await completeIntroFlow(driver, user1)
          await logOut(driver, user1)
        } finally {
          await driver.quit()
        }
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description:
        'should successfully sign up and create a user in Chrome v4 referral cats',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver('Tab: acceptance tests: should sign up v4 referral ')
        try {
          const user1 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          await setCause(driver, '/cats/?u=test1', true)
          await signUp(driver, user1.email, user1.password)
          await completeIntroFlow(
            driver,
            user1,
            false,
            "Your friend started you off with 5 cat treats, which are crucial to getting shelter cats adopted. Open a new tab now to earn your 6th treat! We'll track how many treats you've given on the top of the page:"
          )
          await logOut(driver, user1)
        } finally {
          await driver.quit()
        }
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description:
        'should successfully sign up and create a user in Chrome v4 for teamseas',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver('Tab: acceptance tests: should sign up v4')
        try {
          const user1 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          await setCause(driver, '/teamseas/')
          await signUp(driver, user1.email, user1.password)
          await completeIntroFlow(driver, user1)
          await logOut(driver, user1)
        } finally {
          await driver.quit()
        }
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description:
        'should successfully sign up and create a Referral user in Chrome v4 for teamseas',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver('Tab: acceptance tests: should sign up v4')
        try {
          const user1 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          await setCause(driver, '/teamseas/?u=test1', true)
          await signUp(driver, user1.email, user1.password)
          await completeIntroFlow(
            driver,
            user1,
            false,
            "Your friend gave you a boost: you've already removed 5 plastic water bottles' worth of trash from our rivers and oceans! Open a new tab now to clean up your 6th water bottle. We'll track how many water bottles' worth of trash you've helped clean up on the top of the page:"
          )
          await logOut(driver, user1)
        } finally {
          await driver.quit()
        }
      },
      testTimeout: testTimeoutdefault,
    },
  ]
  return tests
}

export default getUserSignupTests
