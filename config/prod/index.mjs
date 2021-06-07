import sites     from './sites.mjs'
import redirects from './redirects.mjs'
import { isLocal, makeUrls, getHostedZoneId, getFqdn } from '../util.mjs'

const { PROD_SMTP_USERNAME: username, PROD_SMTP_PASSWORD: password } = process.env

export default (() => {

  const name          = 'prod'
  const httpPort      = '5566'
  const httpsPort     = '5567'
  const hostDbPort    = '3600'
  const routePriority =  2
  const siteCodes     = Object.keys(sites)

  const baseUrls               = isLocal             ? [`bioland.${name}`]   : [`${name}.chm-cbd.net`,'chm-cbd.net']
  const defaultSmtpCredentials = username && password? { username, password} : undefined

  makeUrls(name, sites, baseUrls, isLocal, httpPort)

  return { name, sites, siteCodes, routePriority, httpPort, httpsPort, isLocal, hostDbPort, defaultSmtpCredentials, getFqdn, getHostedZoneId, redirects }
})()