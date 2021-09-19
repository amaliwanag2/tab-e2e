import { By } from 'selenium-webdriver'
import {
  waitForElementExistsByCustomSelector,
  signIn,
  signUp,
  logOut,
  waitAndClick,
  setCats,
  completeIntroFlow,
  createMission,
  inviteUser,
  signUpViaEmailInvite,
  completeMission,
  restartMission,
} from '../utils/driver-mgr'
import EmailClient from '../utils/mailosaurClient'

/* eslint-disable jest/no-jasmine-globals */
/* eslint-env jest */
const TEN_MINUTES_IN_MS = 6e5
const testTimeoutdefault = TEN_MINUTES_IN_MS

const getUserSignupTests = (getDriver) => {
  const tests = [
    {
      description:
        'Testing new user signup squad creation, email invite, and restart mission',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver(
          'Squads: Testing new user signup squad creation, email invite, and restart mission'
        )
        try {
          // User1 signs up, creates mission, invites new user User2.
          // User2 accepts email invite, signs up, completes mission, restarts mission.
          //  User1 signs back in, sees completed mission, joins restarted mission
          const user1 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          const user2 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          await setCats(driver)
          await signUp(driver, user1.email, user1.password)
          await completeIntroFlow(driver, user1)
          await createMission(driver, user1, user2)
          await logOut(driver, user1)

          await signUpViaEmailInvite(driver, user2)
          await completeIntroFlow(driver, user2, true)
          await completeMission(driver)
          await restartMission(driver)
          await logOut(driver, user2)
          await signIn(driver, user1.email, user1.password)
          // see mission completed and accept pending invite
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath('//p[text()="Mission Completed!"]')
          )
          await waitAndClick(driver, By.xpath('//span[text()="View Details"]'))
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath('//p[text()="Mission Complete"]')
          )
          await waitAndClick(driver, By.xpath('//span[text()="Accept"]'))
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath('//p[text()="started"]')
          )
        } finally {
          await driver.quit()
        }
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description:
        'Testing Exisiting user signup and adding squadmate to ongoing mission',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver(
          'Squads: Testing Exisiting user signup and adding squadmate to ongoing mission'
        )
        try {
          // User1 signs up.  User 2 signs up, creates mission, invites existing User1 via email.
          // User1 signs in, accepts invite, starts mission.  User1 invites User3 via email.
          // User3 signs up and sees mission
          const user1 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          const user2 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          const user3 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          await setCats(driver)
          await signUp(driver, user1.email, user1.password)
          await completeIntroFlow(driver, user1)
          await logOut(driver, user1)

          await signUp(driver, user2.email, user2.password)
          await completeIntroFlow(driver, user2)
          await createMission(driver, user2, user1)
          await logOut(driver, user2)

          await signIn(driver, user1.email, user1.password)
          await waitAndClick(driver, By.xpath('//span[text()="Accept"]'))
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath('//p[text()="started"]')
          )
          await waitAndClick(
            driver,
            By.css(`[data-test-id='addSquadMateButton']`)
          )
          await inviteUser(driver, user1, user3)
          await logOut(driver, user1)

          await signUpViaEmailInvite(driver, user3)
          await completeIntroFlow(driver, user3, true)
        } finally {
          await driver.quit()
        }
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description: 'Testing Exisiting user declining squad invite',
      test: async () => {
        const {
          driver,
          config: {
            mailosaur: { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID } = {},
          },
        } = getDriver(
          'Testing Exisiting user declining squad invite: User1 signs up.'
        )
        try {
          const user1 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          const user2 = await EmailClient.build({
            MAILOSAUR_API_KEY,
            MAILOSAUR_SERVER_ID,
          })
          // User1 signs up.  User 2 signs up, creates mission, invites existing User1 via email.
          // User1 signs in, rejects mission invite, sees ability to create own squad.
          // User2 signs in, sees rejected invite and mission pending
          await setCats(driver)
          await signUp(driver, user1.email, user1.password)
          await completeIntroFlow(driver, user1)
          await logOut(driver, user1)
          await signUp(driver, user2.email, user2.password)
          await completeIntroFlow(driver, user2)
          await createMission(driver, user2, user1)
          await logOut(driver, user2)

          await signIn(driver, user1.email, user1.password)
          await waitAndClick(driver, By.xpath('//span[text()="Reject"]'))
          await logOut(driver, user1)
          await signIn(driver, user2.email, user2.password)
          await waitForElementExistsByCustomSelector(
            driver,
            By.xpath('//span[contains(text(),"mission pending")]')
          )
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
