const locale      =   'en'
const locales     = [ 'ar', 'en', 'es', 'fr', 'ru', 'zh' ]
const environment =   'test'

const sites =  {
  ht  : { locale: 'fr', locales: [ 'en', 'fr'],  environment },  
  ni  : { locale: 'es', locales: [ 'en', 'es'], environment },
  vc  : { locale,       locales: [ 'en' ], environment },

  seed        : { locale, locales },
  rjh         : { locale, locales, environment },
  rqk         : { locale, locales, environment },
  ray         : { locale, locales, environment }
}

const c = (() =>{
    const name          = 'bioland'
    const httpPort      = '5566'
    const httpsPort     = '5567'
    const hostDbPort    = '3600'
    const routePriority =  2
    const siteCodes     = Object.keys(sites)

    addHostToSites(sites)

    return { name, sites, siteCodes, routePriority, httpPort, httpsPort, hostDbPort }
})()

export const config = c

export default c

function getHost(siteCode, {redirectTo, environment}){
  if(redirectTo) return redirectTo

  if(environment) return `${siteCode}.test.chm-cbd.net`

  return `${siteCode}.chm-cbd.net`
}

function addHostToSites(sites){
  for (let sideCode of Object.keys(sites))
    sites[sideCode].host = getHost(sideCode, sites[sideCode])
}