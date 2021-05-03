import initDriver from '../../utils/driver-mgr'
import getBasicLegacyTests from '../basics'
import getSearchTests from '../search'

describe('Tab: acceptance tests', () => {
  const basicTests = getBasicLegacyTests(initDriver())
  const searchTests = getSearchTests(initDriver())
  const tests = [...basicTests, ...searchTests]
  tests.forEach(({ description, test, testTimeout }) =>
    // eslint-disable-next-line jest/expect-expect
    it(description, test, testTimeout)
  )
})
