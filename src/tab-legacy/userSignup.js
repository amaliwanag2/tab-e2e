import { By } from 'selenium-webdriver'
import {
  waitForElementExistsByCustomSelector,
  signIn,
  signUp,
  navigateTo,
  setValue,
  click,
  waitAndClick,
} from '../utils/driver-mgr'
import EmailClient from '../utils/mailosaurClient'

/* eslint-disable jest/no-jasmine-globals */
/* eslint-env jest */
/* globals jasmine */
const testTimeoutdefault = 100e3
jasmine.DEFAULT_TIMEOUT_INTERVAL = testTimeoutdefault

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
        const backgroundImages = await driver.findElements(
          By.css(`[data-test-id='cats-background']`)
        )
        expect(backgroundImages.length).toEqual(0)
        await signUp(driver, mailClient.email, 'password')
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
        await waitAndClick(driver, By.css(`[data-test-id='app-menu-sign-out']`))
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//span[text()="Sign in with email"]')
        )
        await await signIn(driver, mailClient.email, 'password')
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
        const backgroundImages = await driver.findElements(
          By.css(`[data-test-id='cats-background']`)
        )
        expect(backgroundImages.length).toEqual(0)
        await signUp(driver, mailClient.email, 'password')
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
        await waitAndClick(driver, By.css(`[data-test-id='app-menu-sign-out']`))
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//span[text()="Sign in with email"]')
        )
        await await signIn(driver, mailClient.email, 'password')
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description: 'should successfully sign up and create a user in Chrome v4',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver('Tab: acceptance tests: should sign up v4')
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
        const backgroundImages = await driver.findElements(
          By.css(`[data-test-id='cats-background']`)
        )
        expect(backgroundImages.length).toEqual(1)
        const mailClient = await EmailClient.build({
          MAILOSAUR_API_KEY,
          MAILOSAUR_SERVER_ID,
        })

        await signUp(driver, mailClient.email, 'password')
        const link = await mailClient.getLink()
        await driver.navigate().to(link)
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//button[text()="Continue"]')
        )
        await click(driver, By.xpath('//button[text()="Continue"]'))
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
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//span[text()="Next"]')
        )
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//h5[text()="Your tabs are doing great things"]')
        )
        const firstTitle = await driver.findElements(
          By.xpath('//h5[text()="Your tabs are doing great things"]')
        )
        expect(firstTitle.length).toEqual(1)
        await click(driver, By.xpath('//span[text()="Next"]'))
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//h5[text()="Make a difference right meow"]')
        )
        const secondTitle = await driver.findElements(
          By.xpath('//h5[text()="Make a difference right meow"]')
        )
        expect(secondTitle.length).toEqual(1)
        await click(driver, By.xpath('//span[text()="Next"]'))
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
        )
        const thirdTitle = await driver.findElements(
          By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
        )
        expect(thirdTitle.length).toEqual(1)
        await click(driver, By.xpath('//span[text()="Next"]'))
        await waitAndClick(driver, By.xpath(`//span[text()="I'M READY!"]`))
        await new Promise((res) => setTimeout(() => res(), 1000))
        await navigateTo(driver, '/newtab')
        const iconPath = '//a[@href="/newtab/account/"]'
        await waitAndClick(driver, By.xpath(iconPath))
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath(`//p[text()="${mailClient.email}"]`)
        )
        await waitAndClick(driver, By.xpath('//span[text()="Log Out"]'))
        await signIn(driver, mailClient.email, 'password')
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description:
        'should successfully sign up and create a user in Chrome v4 referral',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver('Tab: acceptance tests: should sign up v4 referral ')
        await navigateTo(driver, '/cats/?u=gladly')
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//div[text()="Your friend sent you a gift"]')
        )
        const referralText = await driver.findElements(
          By.xpath('//div[text()="Your friend sent you a gift"]')
        )
        expect(referralText.length).toEqual(1)
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
        const backgroundImages = await driver.findElements(
          By.css(`[data-test-id='cats-background']`)
        )
        expect(backgroundImages.length).toEqual(1)
        const mailClient = await EmailClient.build({
          MAILOSAUR_API_KEY,
          MAILOSAUR_SERVER_ID,
        })

        await signUp(driver, mailClient.email, 'password')
        const link = (await mailClient.getLink()).replace('dev-', 'test-')
        await driver.navigate().to(link)
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//button[text()="Continue"]')
        )
        await click(driver, By.xpath('//button[text()="Continue"]'))
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
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//span[text()="Next"]')
        )
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//h5[text()="Your tabs are doing great things"]')
        )
        const firstTitle = await driver.findElements(
          By.xpath('//h5[text()="Your tabs are doing great things"]')
        )
        expect(firstTitle.length).toEqual(1)
        await click(driver, By.xpath('//span[text()="Next"]'))
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath('//h5[text()="Make a difference right meow"]')
        )
        const secondTitle = await driver.findElements(
          By.xpath('//h5[text()="Make a difference right meow"]')
        )
        expect(secondTitle.length).toEqual(1)
        await click(driver, By.xpath('//span[text()="Next"]'))
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
        )
        const thirdTitle = await driver.findElements(
          By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
        )
        expect(thirdTitle.length).toEqual(1)
        await click(driver, By.xpath('//span[text()="Next"]'))
        await waitAndClick(driver, By.xpath(`//span[text()="I'M READY!"]`))
        await new Promise((res) => setTimeout(() => res(), 1000))
        const referralImpactText = await driver.findElements(
          By.xpath(
            `//p[text()="Your friend started you off with 5 cat treats, which are crucial to getting shelter cats adopted. Open a new tab now to earn your 6th treat! We'll track how many treats you've given on the top of the page:"]`
          )
        )
        expect(referralImpactText.length).toEqual(1)
        await navigateTo(driver, '/newtab')
        const iconPath = '//a[@href="/newtab/account/"]'
        await waitAndClick(driver, By.xpath(iconPath))
        await waitForElementExistsByCustomSelector(
          driver,
          By.xpath(`//p[text()="${mailClient.email}"]`)
        )
        await waitAndClick(driver, By.xpath('//span[text()="Log Out"]'))
        await signIn(driver, mailClient.email, 'password')
      },
      testTimeout: testTimeoutdefault,
    },
  ]
  return tests
}

export default getUserSignupTests
