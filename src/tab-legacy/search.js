/* eslint-disable jest/no-jasmine-globals */
/* globals jasmine */
/* eslint-env jest */
// import webdriver from 'selenium-webdriver'
// import fetch from 'node-fetch'
// import {
//   getAbsoluteUrl,
//   waitForElementExistsByCustomSelector,
//   waitForElementExistsByTestId,
//   signIn,
//   navigateTo,
// } from '../utils/driver-mgr'
//
// const { By } = webdriver

const FIVE_MINUTES_IN_MS = 3e5
const testTimeoutdefault = FIVE_MINUTES_IN_MS
jasmine.DEFAULT_TIMEOUT_INTERVAL = testTimeoutdefault

// Disabling due to search UX changes:
// https://github.com/gladly-team/tab/pull/984

// const getSearchTests = (getDriver) => {
//   const tests = [
//     {
//       description: 'should redirect to auth from search',
//       test: async () => {
//         const { driver } = getDriver(
//           'Search: acceptance tests: should redirect to auth from search'
//         )
//         await navigateTo(driver, '/search/?q=hi%20there!')
//         await waitForElementExistsByTestId(driver, 'authentication-page')
//         await driver.quit()
//       },
//       testTimeout: testTimeoutdefault,
//     },
//     {
//       description: 'should load the search page after signing in',
//       test: async () => {
//         const {
//           driver,
//           config: {
//             selenium: {
//               INTEGRATION_TEST_USER_EMAIL,
//               INTEGRATION_TEST_USER_PASSWORD,
//             },
//           },
//         } = getDriver(
//           'Search: acceptance tests: should load the search page (with search query) after signing in'
//         )
//         await navigateTo(driver, '/search/?q=hi%20there!') // this should redirect to the auth page
//         await waitForElementExistsByTestId(driver, 'authentication-page')
//         await signIn(
//           driver,
//           INTEGRATION_TEST_USER_EMAIL,
//           INTEGRATION_TEST_USER_PASSWORD
//         )
//
//         // Make sure we navigate to the search results page after signing in.
//         await waitForElementExistsByTestId(driver, 'search-page')
//
//         // Make sure we show the original search query in the search input.
//         const inputElemCSSSelector = `[data-test-id='search-input'] > input`
//         await waitForElementExistsByCustomSelector(
//           driver,
//           By.css(inputElemCSSSelector)
//         )
//         await driver.findElement(
//           By.css(`[data-test-id='search-input'] > input`)
//         )
//
//         // Disabled due to changes:
//         // https://github.com/gladly-team/tab/pull/973
//         // const inputElem = await driver.findElement(
//         //   By.css(`[data-test-id='search-input'] > input`)
//         // )
//         // const inputVal = await inputElem.getAttribute('value')
//         // expect(inputVal).toEqual('hi there!')
//
//         await driver.quit()
//       },
//       testTimeout: testTimeoutdefault,
//     },
//     {
//       description:
//         'contains the expected prerendered HTML for the search results page',
//       test: async () => {
//         const url = getAbsoluteUrl('/search?q=tacos')
//
//         const response = await fetch(url)
//         const html = await response.text()
//
//         // Do a rough check that the prerendered HTML contains the expected
//         // components for the search results page and not the auth page.
//         expect(html.indexOf('data-test-id="search-page"')).toBeGreaterThan(-1)
//         expect(html.indexOf('data-test-id="authentication-page"')).toEqual(-1)
//         expect(html.indexOf('data-test-id="search-input"')).toBeGreaterThan(-1)
//         expect(html.indexOf('data-test-id="search-results"')).toBeGreaterThan(
//           -1
//         )
//       },
//       testTimeout: testTimeoutdefault,
//     },
//   ]
//   return tests
// }

const getSearchTests = () => []

export default getSearchTests
