import getBasicLegacyTests from './tab-legacy/basics'
import getSearchTests from './tab-legacy/search'
import getUserSignupTests from './tab-legacy/userSignup'
import initDriver from './utils/driver-mgr'

// config = { selenium: {}, browserstack: {}, build: {}, mailosaur: {} }
// see driver-mgr for full shape
const init = (config = {}) => {
  const getDriver = initDriver(config)
  const basicLegacyTests = getBasicLegacyTests(getDriver)
  const searchTests = getSearchTests(getDriver)
  const userSignupTests = getUserSignupTests(getDriver)
  return [...userSignupTests, ...basicLegacyTests, ...searchTests]
}
export default init
