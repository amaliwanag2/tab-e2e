import getBasicLegacyTests from './tab-legacy/basics'
import getSearchTests from './tab-legacy/search'
import getUserSignupTests from './tab-legacy/userSignup'
import initDriver from './utils/driver-mgr'
import getSquadTests from './tab-web/squads'
// config = { selenium: {}, browserstack: {}, build: {}, mailosaur: {} }
// see driver-mgr for full shape
const init = (config = {}) => {
  // TODO: do some config validation before using it.
  const getDriver = initDriver(config)
  const basicLegacyTests = getBasicLegacyTests(getDriver)
  const searchTests = getSearchTests(getDriver)
  const userSignupTests = getUserSignupTests(getDriver)
  const squadTests = getSquadTests(getDriver)
  return [
    ...userSignupTests,
    ...basicLegacyTests,
    ...searchTests,
    ...squadTests,
  ]
}
export default init
