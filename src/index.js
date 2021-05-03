import getBasicLegacyTests from './tab-legacy/basics'
import getSearchTests from './tab-legacy/search'
import initDriver from './utils/driver-mgr'

const init = (config = {}) => {
  const getDriver = initDriver(config)
  const basicLegacyTests = getBasicLegacyTests(getDriver)
  const searchTests = getSearchTests(getDriver)
  return [...basicLegacyTests, ...searchTests]
}
export default init
