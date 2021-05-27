const HostedZoneIdMap = initHostedZoneMap()
const FqdnMap         = initFqdnMap()

export const isLocal =  !!process.env.BL_LOCAL
export const locale  =  'en'
export const locales = ['en']

export const makeUrls = (sites, baseUrls)=>{
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
  }
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
  map.set('.chm-cbd.net'     , 'Z17YZYXL9GEG03')

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
// function getAllServiceNames(sites){
//   const services = []

//   for (const code in sites)
//     services.push(...sites[code].serviceNames)

//   return Array.from(new Set(services))
// }