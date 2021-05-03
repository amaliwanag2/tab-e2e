import initDriver from '../../utils/driver-mgr'
import getBasicLegacyTests from '../basics'
import getSearchTests from '../search'

const config = {
  selenium: {
    SELENIUM_DRIVER_TYPE: process.env.SELENIUM_DRIVER_TYPE,
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
  const basicTests = getBasicLegacyTests(initDriver(config))
  const searchTests = getSearchTests(initDriver(config))
  const tests = [...basicTests, ...searchTests]
  tests.forEach(({ description, test, testTimeout }) =>
    // eslint-disable-next-line jest/expect-expect
    it(description, test, testTimeout)
  )
})
