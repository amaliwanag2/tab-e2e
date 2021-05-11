// Tests aren't necessary unless developing on the Mailosaur client.
/* eslint jest/no-jasmine-globals:0 jest/no-disabled-tests:0 */
/* globals jasmine */

import MailKitty from '../utils/mailosaurClient'

const testTimeout = 70e3
jasmine.DEFAULT_TIMEOUT_INTERVAL = testTimeout
describe('Search: acceptance tests', () => {
  afterEach(() => {})

  it.skip(
    'should return a new client when you invoke build',
    async () => {
      const newClient = await MailKitty.build()
      expect(newClient instanceof MailKitty).toBe(true)
    },
    testTimeout
  )

  it.skip(
    'should have a new email generated and part of',
    async () => {
      const newClient = await MailKitty.build()
      expect(
        newClient.email.includes(
          `@${process.env.MAILOSAUR_SERVER_ID}.mailosaur.net`
        )
      ).toBe(true)
    },
    testTimeout
  )

  it.skip(
    'returns the url from the verify email link',
    async () => {
      const newClient = await MailKitty.build({
        emailOverride: process.env.MAILOSAUR_QA_EMAIL,
        receivedAfter: new Date(2021, 3, 1),
      })
      const url = await newClient.getLink()
      // eslint-disable-next-line no-console
      console.log(url)
      expect(typeof url).toBe('string')
    },
    testTimeout
  )
})
