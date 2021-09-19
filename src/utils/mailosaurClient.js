import MailosaurClient from 'mailosaur'
import promiseRetry from 'promise-retry'

/**
 * Email Client Builder.
 * call EmailClient.build({params}) to receive a client
 * @param {string} emailOverride - an override email instead of getting a newly generated email address
 * @param {Date} returnedAfter - to search all emails returned after a certain date
 * @return {Class} An instance of EmailClient, a mock function
 * * @method getLink - gets the email validation link for the email address it generated
 * * @property  email - a randomly generated email address to send and receive emails from
 */
class EmailClient {
  constructor(
    email,
    password,
    initializedClient,
    receivedAfter,
    MAILOSAUR_SERVER_ID
  ) {
    this.mailosaur = initializedClient
    this.email = email
    this.password = password
    this.serverId = MAILOSAUR_SERVER_ID
    this.receivedAfter = receivedAfter
  }

  static async build({
    emailOverride,
    receivedAfter,
    MAILOSAUR_API_KEY = process.env.MAILOSAUR_API_KEY,
    MAILOSAUR_SERVER_ID = process.env.MAILOSAUR_SERVER_ID,
  } = {}) {
    const mailosaur = new MailosaurClient(MAILOSAUR_API_KEY)
    const email =
      emailOverride ||
      (await mailosaur.servers.generateEmailAddress(MAILOSAUR_SERVER_ID))
    const password = Math.random().toString(36).slice(-8)
    return new EmailClient(
      email,
      password,
      mailosaur,
      receivedAfter,
      MAILOSAUR_SERVER_ID
    )
  }

  async getLink() {
    const criteria = {
      sentTo: this.email,
      subject: 'Verify your email for For a Cause',
    }
    const email = await promiseRetry(
      async () =>
        this.mailosaur.messages.get(this.serverId, criteria, {
          receivedAfter: this.receivedAfter,
        }),
      { maxTimeout: 5000 }
    )
    const firstLink = email.html.links[0]
    return firstLink.text
  }

  async getEmailInvite() {
    const criteria = {
      sentTo: this.email,
    }
    const email = await promiseRetry(
      async () =>
        this.mailosaur.messages.get(this.serverId, criteria, {
          receivedAfter: this.receivedAfter,
        }),
      { maxTimeout: 5000 }
    )
    return email.html.links[0].href
  }
}
export default EmailClient
