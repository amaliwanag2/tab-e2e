import { By } from 'selenium-webdriver'
import {
  waitForElementExistsByCustomSelector,
  //   signIn,
  signUp,
  navigateTo,
  setValue,
  click,
  waitAndClick,
} from '../utils/driver-mgr'
import EmailClient from '../utils/mailosaurClient'

/* eslint-disable jest/no-jasmine-globals */
/* eslint-env jest */
const TEN_MINUTES_IN_MS = 6e5
const testTimeoutdefault = TEN_MINUTES_IN_MS

const getUserSignupTests = (getDriver) => {
  const tests = [
    // {
    //   description: 'should successfully sign up and create a user in Chrome v4',
    //   test: async () => {
    //     const {
    //       driver,
    //       config: {
    //         mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
    //       },
    //     } = getDriver('Tab: acceptance tests: should sign up v4')
    //     try {
    //       await navigateTo(driver, '/cats/')
    //       await waitAndClick(driver, By.css('button'))
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.css(`[aria-label='Add to Chrome'`)
    //       )
    //       await navigateTo(driver, '/newtab/first-tab')
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath('//span[text()="Sign in with email"]')
    //       )
    //       const backgroundImages = await driver.findElements(
    //         By.css(`[data-test-id='cats-background']`)
    //       )
    //       expect(backgroundImages.length).toEqual(1)
    //       const mailClient = await EmailClient.build({
    //         MAILOSAUR_API_KEY,
    //         MAILOSAUR_SERVER_ID,
    //       })

    //       await signUp(driver, mailClient.email, mailClient.password)
    //       const link = await mailClient.getLink()
    //       await driver.navigate().to(link)
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath('//button[text()="Continue"]')
    //       )
    //       await click(driver, By.xpath('//button[text()="Continue"]'))
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.id('username-input')
    //       )
    //       await setValue(
    //         driver,
    //         By.id('username-input'),
    //         mailClient.email.split('@')[0]
    //       )
    //       await click(driver, By.xpath('//span[text()="Next"]'))
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath('//span[text()="Next"]')
    //       )
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath('//h5[text()="Your tabs are doing great things"]')
    //       )
    //       const firstTitle = await driver.findElements(
    //         By.xpath('//h5[text()="Your tabs are doing great things"]')
    //       )
    //       expect(firstTitle.length).toEqual(1)
    //       await click(driver, By.xpath('//span[text()="Next"]'))
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
    //       )
    //       const thirdTitle = await driver.findElements(
    //         By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
    //       )
    //       expect(thirdTitle.length).toEqual(1)
    //       await click(driver, By.xpath('//span[text()="Next"]'))
    //       await waitAndClick(driver, By.xpath(`//span[text()="I'M READY!"]`))
    //       await new Promise((res) => setTimeout(() => res(), 1000))
    //       await navigateTo(driver, '/newtab')
    //       const iconPath = '//a[@href="/newtab/account/"]'
    //       await waitAndClick(driver, By.xpath(iconPath))
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath(`//p[text()="${mailClient.email}"]`)
    //       )
    //       await waitAndClick(driver, By.xpath('//span[text()="Log Out"]'))
    //       await signIn(driver, mailClient.email, mailClient.password)
    //     } finally {
    //       await driver.quit()
    //     }
    //   },
    //   testTimeout: testTimeoutdefault,
    // },
    // {
    //   description:
    //     'should successfully sign up and create a user in Chrome v4 referral',
    //   test: async () => {
    //     const {
    //       driver,
    //       config: {
    //         mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
    //       },
    //     } = getDriver('Tab: acceptance tests: should sign up v4 referral ')
    //     try {
    //       await navigateTo(driver, '/cats/?u=wgcuq')
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath('//div[text()="Your friend sent you a gift"]')
    //       )
    //       const referralText = await driver.findElements(
    //         By.xpath('//div[text()="Your friend sent you a gift"]')
    //       )
    //       expect(referralText.length).toEqual(1)
    //       await waitAndClick(driver, By.css('button'))
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.css(`[aria-label='Add to Chrome'`)
    //       )
    //       await navigateTo(driver, '/newtab/first-tab')
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath('//span[text()="Sign in with email"]')
    //       )
    //       const backgroundImages = await driver.findElements(
    //         By.css(`[data-test-id='cats-background']`)
    //       )
    //       expect(backgroundImages.length).toEqual(1)
    //       const mailClient = await EmailClient.build({
    //         MAILOSAUR_API_KEY,
    //         MAILOSAUR_SERVER_ID,
    //       })

    //       await signUp(driver, mailClient.email, mailClient.password)
    //       const link = (await mailClient.getLink()).replace('dev-', 'test-')
    //       await driver.navigate().to(link)
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath('//button[text()="Continue"]')
    //       )
    //       await click(driver, By.xpath('//button[text()="Continue"]'))
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.id('username-input')
    //       )
    //       await setValue(
    //         driver,
    //         By.id('username-input'),
    //         mailClient.email.split('@')[0]
    //       )
    //       await click(driver, By.xpath('//span[text()="Next"]'))
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath('//span[text()="Next"]')
    //       )
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath('//h5[text()="Your tabs are doing great things"]')
    //       )
    //       const firstTitle = await driver.findElements(
    //         By.xpath('//h5[text()="Your tabs are doing great things"]')
    //       )
    //       expect(firstTitle.length).toEqual(1)
    //       await click(driver, By.xpath('//span[text()="Next"]'))
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
    //       )
    //       const thirdTitle = await driver.findElements(
    //         By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
    //       )
    //       expect(thirdTitle.length).toEqual(1)
    //       await click(driver, By.xpath('//span[text()="Next"]'))
    //       await waitAndClick(driver, By.xpath(`//span[text()="I'M READY!"]`))
    //       await new Promise((res) => setTimeout(() => res(), 1000))
    //       const referralImpactText = await driver.findElements(
    //         By.xpath(
    //           `//p[text()="Your friend started you off with 5 cat treats, which are crucial to getting shelter cats adopted. Open a new tab now to earn your 6th treat! We'll track how many treats you've given on the top of the page:"]`
    //         )
    //       )
    //       expect(referralImpactText.length).toEqual(1)
    //       await navigateTo(driver, '/newtab')
    //       const iconPath = '//a[@href="/newtab/account/"]'
    //       await waitAndClick(driver, By.xpath(iconPath))
    //       await waitForElementExistsByCustomSelector(
    //         driver,
    //         By.xpath(`//p[text()="${mailClient.email}"]`)
    //       )
    //       await waitAndClick(driver, By.xpath('//span[text()="Log Out"]'))
    //       await signIn(driver, mailClient.email, mailClient.password)
    //     } finally {
    //       await driver.quit()
    //     }
    //   },
    //   testTimeout: testTimeoutdefault,
    // },
    {
      description:
        'should successfully sign up create a mission, and send email invites',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver('Tab: acceptance tests: should sign up v4')
        try {
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

          await signUp(driver, mailClient.email, mailClient.password)
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
          //   await waitForElementExistsByCustomSelector(
          //     driver,
          //     By.xpath(`//span[text()="create a squad`)
          //   )
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
            mailClient.email.split('@')[0]
          )
          await waitAndClick(driver, By.xpath(`//span[text()="next"]`))
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath(`//div[label[contains(., 'Your name')]]/div/input`)
          )
          await setValue(
            driver,
            By.xpath(`//div[label[contains(., 'Your name')]]/div/input`),
            'test user'
          )
          // make second email
          const secondUserMailClient = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath(`//div[label[contains(., 'Recipients')]]/div/input`)
          )
          await setValue(
            driver,
            By.xpath(`//div[label[contains(., 'Recipients')]]/div/input`),
            secondUserMailClient.email
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
          await new Promise((res) => setTimeout(() => res(), 1000))
          await navigateTo(driver, '/newtab')
          const iconPath = '//a[@href="/newtab/account/"]'
          await waitAndClick(driver, By.xpath(iconPath))
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath(`//p[text()="${mailClient.email}"]`)
          )
          await waitAndClick(driver, By.xpath('//span[text()="Log Out"]'))
          const referralLink = await secondUserMailClient.getEmailInvite()
          console.log(referralLink)
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
          console.log(testUrl)
          await driver.navigate().to(testUrl)
          await navigateTo(driver, '/newtab/first-tab')
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath('//span[text()="Sign in with email"]')
          )
          const backgroundImages2 = await driver.findElements(
            By.css(`[data-test-id='cats-background']`)
          )
          expect(backgroundImages2.length).toEqual(1)

          await signUp(
            driver,
            secondUserMailClient.email,
            secondUserMailClient.password
          )
          console.log('before link2')
          const link2 = (await secondUserMailClient.getLink()).replace(
            'dev-',
            'test-'
          )
          console.log(link2, 'link2')
          await driver.navigate().to(link2)
          console.log('after link2')
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
            secondUserMailClient.email.split('@')[0]
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
          const firstTitle2 = await driver.findElements(
            By.xpath('//h5[text()="Your tabs are doing great things"]')
          )
          expect(firstTitle2.length).toEqual(1)
          await click(driver, By.xpath('//span[text()="Next"]'))
          await click(driver, By.xpath('//span[text()="Next"]'))
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
          )
          const thirdTitle2 = await driver.findElements(
            By.xpath(`//h5[text()="It doesn't cost you a thing"]`)
          )
          expect(thirdTitle2.length).toEqual(1)
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
          await navigateTo(driver, '/newtab/missions/')
          //   const iconPath = '//a[@href="/newtab/account/"]'
          //   await waitAndClick(driver, By.xpath(iconPath))
          //   await waitForElementExistsByCustomSelector(
          //     driver,
          //     By.xpath(`//p[text()="${mailClient.email}"]`)
          //   )
          //   await waitAndClick(driver, By.xpath('//span[text()="Log Out"]'))
          //   await signIn(driver, mailClient.email, mailClient.password)
        } finally {
          //   await driver.quit()
        }
      },
      testTimeout: testTimeoutdefault,
    },
  ]
  return tests
}

export default getUserSignupTests
