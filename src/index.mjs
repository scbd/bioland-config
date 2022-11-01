const locale      =   'en'
const locales     = [ 'ar', 'en', 'es', 'fr', 'ru', 'zh' ]
const environment =   'test'

const sites =  {
  acb : { locale,       locales: [ 'en', 'zh', 'ms', 'my', 'km', 'lo', 'fil', 'th', 'vi' ], urls: ['www.asean.chm-cbd.net'], redirectTo: 'asean.chm-cbd.net', logo: 'ACB_ASEAN_Logo.png'  },
  be  : { locale,       locales: [ 'en', 'fr', 'nl', 'de'], urls: ['biodiv.be'], redirectTo: 'www.biodiv.be' },
  bi  : { locale,       locales: [ 'en', 'fr' ] },
  bt  : { locale,       locales: [ 'dz' ] },
  cf  : { locale: 'fr', locales: [ 'en', 'fr' ] },
  cg  : { locale: 'fr', locales: [ 'en', 'fr' ] }, 
  ci  : { locale: 'fr', locales: [ 'en', 'fr' ]  },
  et  : { locale,       locales: [ 'am', 'en' ] },
  ga  : { locale,       locales: [ 'en', 'fr' ] },
  fr  : { locale: 'fr', locales: [ 'en', 'fr' ], redirectTo: 'biodiv.mnhn.fr' },
  ht  : { locale: 'fr', locales: [ 'en', 'fr'],  environment },
  iq  : { locale: 'ar', locales: [ 'ar', 'en' ] },
  km  : { locale,       locales: [ 'en', 'fr' ] },
  ml  : { locale,       locales: [ 'en', 'fr' ] },
  mr  : { locale,       locales: [ 'ar','en', 'fr' ] },
  mu  : { locale,       locales: [ 'en', 'fr' ] },
  ni  : { locale: 'es', locales: [ 'en', 'es'], environment },
  nl  : { locale: 'nl', locales: [ 'en', 'nl'] },
  rw  : { locale: 'fr', locales: [ 'en', 'fr' ] },
  sd  : { locale: 'ar', locales: [ 'en', 'ar'] },
  tz  : { locale,       locales: [ 'en', 'sw'] },
  www : { locale,       locales },
  vc  : { locale,       locales: [ 'en' ], environment },
  ye  : { locale,       locales: [ 'en', 'ar'] },
  zm  : { locale,       locales: [ 'en' ] },
  zw  : { locale,       locales: [ 'en' ] },

  'han-demo'  : { locale, locales },
  demo        : { locale, locales },
  training    : { locale, locales },
  seed        : { locale, locales },
  rjh         : { locale, locales, environment },
  rqk         : { locale, locales, environment },
  ray         : { locale, locales, environment },
  dart        : { locale, locales, environment },
  gin         : { locale, locales },
  claro       : { locale, locales },
  mediteran   : { locale, locales },
  material    : { locale, locales },
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