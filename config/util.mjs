import consola from "consola"
import { getIsoAlpha3 } from '../src/util/countries.mjs'

const HostedZoneIdMap = initHostedZoneMap()
const FqdnMap         = initFqdnMap()

export const isLocal =  !!process.env.BL_LOCAL
export const locale  =  'en'
export const locales = ['en']

export const makeUrls = (branch, sites, baseUrls, isLocal, port)=>{
  for (const code in sites) {
    const urls = baseUrls.map((urlBase)=> `${code}.${urlBase}`)

    sites[code].baseUrls = urls

    if(!isLocal && sites[code].urls) sites[code].urls.push(...urls)
    else sites[code].urls = urls

    if(sites[code].redirectTo)
      sites[code].urls = sites[code].urls.filter((url)=>url !== sites[code].redirectTo)
    
    if(urls.length == 1 && !sites[code].redirectTo && sites[code].urls.length > 1)
      sites[code].redirectTo = urls[0]
  }
  for (const code in sites) {
    sites[code].urlObjects = []

    for (const url of sites[code].urls)
      sites[code].urlObjects.push({ url , name: getServiceName(url) })

    sites[code].host = getHostUrl(branch, sites[code], isLocal, port)
  }

  for (const code in sites) {
    if(sites[code].chmGovernment) continue
    
    sites[code].chmGovernment = getIsoAlpha3(code)
  }
}

function getHostUrl(branch, { redirectTo, urls }, isLocal, port){

  const onlyOne = urls.length == 1? urls[0] : ''
  const base =   urls.filter(x => !getServiceName(x) || getServiceName(x) === branch)
  const target = redirectTo || onlyOne || base

  return isLocal? `http://${target}:${port}` : `https://${target}`


}
// get cdn or server if multiple sub domains
export const getFqdn = (url)=>{
  const rootDomain      = '.chm-cbd.net'
  const key             = getHostBaseKey(url)

  if(!key) return  FqdnMap.get('default')

  const rootStringIndex = url.indexOf(rootDomain)
  const isChmCbd        = key === rootDomain
  const subDomain       = isChmCbd? url.substr(0, rootStringIndex) : ''
  const subDomains      = subDomain && subDomain.includes('.')? subDomain : ''

  if(subDomains) return 'us2.bioland.infra.cbd.int'

  return FqdnMap.get(key)
}

export const getHostedZoneId = (url)=>{
  const key = getHostBaseKey(url)

  return key? HostedZoneIdMap.get(key) : ''
}

function getHostBaseKey(testUrl){

  if(testUrl.endsWith('.prod.chm-cbd.net')) return '.prod.chm-cbd.net'
  if(testUrl.endsWith('.test.chm-cbd.net')) return '.test.chm-cbd.net'
  if(testUrl.endsWith('.demo.chm-cbd.net')) return '.demo.chm-cbd.net'
  if(testUrl.endsWith('.chm-cbd.net'))      return '.chm-cbd.net'

  return ''
}

function getServiceName(testUrl){

  if(testUrl.endsWith('.prod.chm-cbd.net')) return 'prod'
  if(testUrl.endsWith('.test.chm-cbd.net')) return 'test'
  if(testUrl.endsWith('.demo.chm-cbd.net')) return 'demo'
  if(testUrl.endsWith('.chm-cbd.net'))      return ''

  return 'tls'
}

function initHostedZoneMap (){
  const map = new Map()

  map.set('.prod.chm-cbd.net', 'Z00889532KKAN75PD7Q0H')
  map.set('.test.chm-cbd.net', 'Z02360093U5TPDSVFLSQA')
  map.set('.demo.chm-cbd.net', 'Z09134566NYGZI85MI7J')
  map.set('.chm-cbd.net'    , 'Z17YZYXL9GEG03')

  return map
}

function initFqdnMap (){
  const map = new Map()

  map.set('.prod.chm-cbd.net', 'cdn2.bioland.infra.cbd.int')
  map.set('.test.chm-cbd.net', 'cdn2.bioland.infra.cbd.int')
  map.set('.demo.chm-cbd.net', 'cdn2.bioland.infra.cbd.int')
  map.set('.chm-cbd.net'     , 'cdn1.bioland.infra.cbd.int')
  map.set('default'          , 'cdn1.bioland.infra.cbd.int')

  return map
}

const all = ['ad', 'ae', 'af', 'ag', 'al', 'am', 'ao', 'ar', 'at', 'au', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bn', 'bo', 'br', 'bs', 'bt', 'bw', 'by', 'bz', 'ca', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr', 'cu', 'cv', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'ee', 'eg', 'er', 'es', 'et', 'eu', 'fi', 'fj', 'fm', 'fr', 'ga', 'gb', 'gd', 'ge', 'gh', 'gm', 'gn', 'gq', 'gr', 'gt', 'gw', 'gy', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'in', 'iq', 'ir', 'is', 'it', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mr', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'ne', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pe', 'pg', 'ph', 'pk', 'pl', 'ps', 'pt', 'pw', 'py', 'qa', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'sv', 'sy', 'sz', 'td', 'tg', 'th', 'tj', 'tl', 'tm', 'tn', 'to', 'tr', 'tt', 'tv', 'tz', 'ua', 'ug', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vn', 'vu', 'ws', 'ye', 'za', 'zm', 'zw']

const test          = [ 'bf', 'bj', 'bt', 'cd', 'ch', 'ci', 'cm', 'demo', 'eg', 'gn', 'gw', 'gy', 'id', 'kw', 'lb', 'ma', 'mg', 'my', 'ne', 'nl', 'om', 'ph', 'ps', 'sg', 'tg', 'th', 'ug', 'vn' ]
const prod          = [ 'acb', 'be', 'bi', 'ca', 'fr', 'zw' ]
const prodRedirects = [ 'ba', 'sc', 'cn', 'iq', 'jp', 'my', 'mm', 'kr', 'by', 'hr', 'cz', 'ee', 'hu', 'pl', 'ru', 'rs', 'si', 'do', 'gd', 'jm', 'mx', 'au', 'at', 'ad', 'eu', 'fi', 'nl', 'se', 'at', 'cu', 'kh' ]
const ptks          = [ 'bf', 'bj', 'bt', 'cd', 'cf', 'cg', 'ci', 'cm', 'dj', 'et', 'ga', 'gh', 'gn', 'iq', 'jo', 'km', 'lr', 'ma', 'mg', 'ml', 'mr', 'mu', 'ne', 'rw', 'sd', 'td', 'tg', 'tz', 'ye', 'zm', 'gy', 'cz', 'de', 'gd', 'hu', 'nl', 'pw']
