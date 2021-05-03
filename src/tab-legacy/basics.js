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
        const driver = getDriver('Tab: acceptance tests: should load auth page')
        await driver.navigateTo('/newtab/')
        await driver.waitForElementExistsByTestId('authentication-page')
        expect(true).toBe(true)
        await driver.quit()
      },
      testTimeout: testTimeoutdefault,
    },
    {
      description: 'should go to the new tab dashboard after signing in',
      test: async () => {
        const driver = getDriver(
          'Tab: acceptance tests: should go to the new tab dashboard after signing in'
        )
        await driver.navigateTo('/newtab/') // this should redirect to the auth page
        await driver.waitForElementExistsByTestId('authentication-page')
        await driver.signIn()
        await driver.waitForElementExistsByTestId('app-dashboard')
        await driver.quit()
      },
      testTimeout: testTimeoutdefault,
    },
  ]
  return tests
}

// boiler plate to test tests in same file

export default getBasicLegacyTests
