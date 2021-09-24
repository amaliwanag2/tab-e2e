import {
  waitForElementExistsByTestId,
  signIn,
  navigateTo,
} from '../utils/driver-mgr'
/* eslint-env jest */
const FIVE_MINUTES_IN_MS = 3e5
const testTimeoutdefault = FIVE_MINUTES_IN_MS
jest.setTimeout(testTimeoutdefault)

const getBasicLegacyTests = (getDriver) => {
  const tests = [
    {
      description: 'should load the auth page',
      test: async () => {
        const { driver } = getDriver(
          'Tab: acceptance tests: should load auth page'
        )
        await navigateTo(driver, '/newtab/')
        await waitForElementExistsByTestId(driver, 'authentication-page')
        expect(true).toBe(true)
        await driver.quit()
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description: 'should go to the new tab dashboard after signing in',
      test: async () => {
        const {
          driver,
          config: {
            selenium: {
              INTEGRATION_TEST_USER_EMAIL,
              INTEGRATION_TEST_USER_PASSWORD,
            },
          },
        } = getDriver(
          'Tab: acceptance tests: should go to the new tab dashboard after signing in'
        )
        await navigateTo(driver, '/newtab/') // this should redirect to the auth page
        await waitForElementExistsByTestId(driver, 'authentication-page')
        await signIn(
          driver,
          INTEGRATION_TEST_USER_EMAIL,
          INTEGRATION_TEST_USER_PASSWORD
        )
        await waitForElementExistsByTestId(driver, 'app-dashboard')
        await driver.quit()
      },
      testTimeout: testTimeoutdefault,
    },
  ]
  return tests
}

// boiler plate to test tests in same file

export default getBasicLegacyTests
