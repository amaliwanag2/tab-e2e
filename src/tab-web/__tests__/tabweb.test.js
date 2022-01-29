import initDriver from '../../utils/driver-mgr'
import getSquadTests from '../squads'

const config = {
  selenium: {
    SELENIUM_DRIVER_TYPE: process.env.SELENIUM_DRIVER_TYPE,
    // TODO: move these out of the Selenium object
    // TODO: potentially deprecate using a fixed user, given we can
    //   create new users on the fly
    INTEGRATION_TEST_USER_EMAIL: process.env.INTEGRATION_TEST_USER_EMAIL,
    INTEGRATION_TEST_USER_PASSWORD: process.env.INTEGRATION_TEST_USER_PASSWORD,
  },
  browserstack: {
    BROWSERSTACK_USER: process.env.BROWSERSTACK_USER,
    BROWSERSTACK_KEY: process.env.BROWSERSTACK_KEY,
  },
  build: { TRAVIS_BUILD_NUMBER: process.env.TRAVIS_BUILD_NUMBER },
}
describe('Tab: acceptance tests', () => {
  jest.retryTimes(2)
  const squadTests = getSquadTests(initDriver(config))
  const tests = [...squadTests]
  tests.forEach(({ description, test, testTimeout }) =>
    // eslint-disable-next-line jest/expect-expect, jest/no-disabled-tests, jest/valid-title
    it.skip(description, test, testTimeout)
  )
})
