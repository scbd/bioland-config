import   sites                                         from './sites.mjs'
import { isLocal, makeUrls, getHostedZoneId, getFqdn } from '../util.mjs'

const { TEST_SMTP_USERNAME: username, TEST_SMTP_PASSWORD: password } = process.env

export default (() => {

  const name          = 'demo'
  const httpPort      = '5544'
  const httpsPort     = '5547'
  const hostDbPort    = '43600'
  const siteCodes     = Object.keys(sites)
  const routePriority = 1

  const baseUrls               = isLocal? [`bioland.${name}`] : [`${name}.chm-cbd.net`]
  const defaultSmtpCredentials = username && password? { username, password} : undefined

  makeUrls(name, sites, baseUrls, isLocal, httpPort)

  return { name, sites, siteCodes, routePriority, httpPort, httpsPort, hostDbPort, isLocal, defaultSmtpCredentials, getFqdn, getHostedZoneId}
})()