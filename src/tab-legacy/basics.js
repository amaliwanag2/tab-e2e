import {
  waitForElementExistsByTestId,
  signIn,
  navigateTo,
} from '../utils/driver-mgr'
/* eslint-disable jest/no-jasmine-globals */
/* eslint-env jest */
/* globals jasmine */
const testTimeoutdefault = 70e3
jasmine.DEFAULT_TIMEOUT_INTERVAL = testTimeoutdefault

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
        console.log(
          driver,
          INTEGRATION_TEST_USER_EMAIL,
          INTEGRATION_TEST_USER_PASSWORD
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
