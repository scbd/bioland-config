const locale      =   'en'
const locales     = [ 'ar', 'en', 'es', 'fr', 'ru', 'zh' ]
const environment =   'test'

const sites =  {
  acb : { locale,       locales: [ 'en', 'zh', 'ms', 'my', 'km', 'lo', 'fil', 'th', 'vi' ],  redirectTo: 'asean.chm-cbd.net', logo: 'ACB_ASEAN_Logo.png'  },
  be  : { locale,       locales: [ 'en', 'fr', 'nl', 'de'], urls: ['biodiv.be'], redirectTo: 'www.biodiv.be' },
  bf  : { locale: 'fr', locales: [ 'en', 'fr' ],             environment },
  bi  : { locale,       locales: [ 'en', 'fr' ] }, 
  bj  : { locale: 'fr', locales: [ 'en', 'fr' ] },
  bt  : { locale,       locales: [ 'dz' ] },
  bw  : { locale: 'en', locales: [ 'en', 'tn' ], environment },
  cd  : { locale: 'fr', locales: [ 'en', 'fr' ],             environment },
  cf  : { locale: 'fr', locales: [ 'en', 'fr' ] },
  cg  : { locale: 'fr', locales: [ 'en', 'fr' ] },  
  ch  : { locale: 'en', locales: [ 'en', 'fr', 'de', 'it' ], environment},
  ci  : { locale: 'fr', locales: [ 'en', 'fr' ]  },
  cm  : { locale: 'fr', locales: [ 'en', 'fr' ], redirectTo: 'cm.chm-cbd.net', urls: ['cameroon.chm-cbd.net', 'cameroun.chm-cbd.net'] },
  eg  : { locale: 'ar', locales: [ 'ar', 'en' ],             environment },
  et  : { locale,       locales: [ 'am', 'en' ] },
  fr  : { locale: 'fr', locales: [ 'en', 'fr' ], redirectTo: 'biodiv.mnhn.fr' },
  ga  : { locale,       locales: [ 'en', 'fr' ] },
  gh  : { locale,       locales: [ 'en', 'fr'],         environment },
  gn  : { locale: 'fr', locales: [ 'en', 'fr' ],        environment  },
  gw  : { locale: 'pt', locales: [ 'en', 'fr', 'pt' ],  environment }, 
  gy  : { locale,       locales: [ 'en'],               environment },
  id  : { locale,       locales: [ 'en', 'fr', 'id' ],  environment },
  ht  : { locale: 'fr', locales: [ 'en', 'fr'],  environment },  
  iq  : { locale: 'ar', locales: [ 'ar', 'en' ] },
  jo  : { locale,       locales: [ 'ar', 'en' ], environment },
  ke  : { locale,       locales: [ 'en' ], environment },
  km  : { locale,       locales: [ 'en', 'fr' ] },
  kw  : { locale: 'ar', locales: [ 'ar', 'en'], environment},
  la  : { locale: 'lo', locales, environment },
  lb  : { locale: 'ar', locales: [ 'ar', 'en'], environment },
  lk  : { locale,       locales, environment },
  ma  : { locale,       locales: [ 'ar', 'en', 'fr', 'es'], environment },
  mg  : { locale,       locales: [ 'en', 'fr' ], environment },
  ml  : { locale,       locales: [ 'en', 'fr' ] },
  mr  : { locale,       locales: [ 'ar','en', 'fr' ] },
  mu  : { locale,       locales: [ 'en', 'fr' ] },
  my  : { locale,       locales: [ 'en', 'fr', 'zh', 'ms'], environment },
  ni  : { locale: 'es', locales: [ 'en', 'es'], environment },
  ne  : { locale,       locales: [ 'en', 'fr']},
  nl  : { locale: 'nl', locales: [ 'en', 'nl'] },
  om  : { locale: 'ar', locales: [ 'en', 'ar'], environment },
  ph  : { locale,       locales: [ 'es', 'en', 'fr', 'fil'], environment },
  pk  : { locale,       locales: [ 'en', 'ur'], environment },
  ps  : { locale: 'ar', locales: [ 'en', 'ar'], environment },
  rw  : { locale: 'fr', locales: [ 'en', 'fr' ] },
  rs  : { locale: 'sr', locales: [ 'en', 'sr' ], environment},//, redirectTo: 'biodiverzitet-chm.rs'
  sa  : { locale: 'ar', locales: [ 'en', 'ar'], environment },
  sd  : { locale: 'ar', locales: [ 'en', 'ar'] },
  sg  : { locale,       locales: [ 'en', 'fr', 'zh', 'ms', 'ta'], environment },
  sy  : { locale: 'ar', locales: [ 'en', 'ar'], environment },
  td  : { locale: 'fr', locales: [ 'en', 'fr', 'ar'], environment },
  tg  : { locale,       locales: [ 'en', 'fr' ], environment },
  th  : { locale,       locales: [ 'en', 'fr', 'zh', 'th'], environment },
  tz  : { locale,       locales: [ 'en', 'sw'] },
  ug  : { locale,       locales: [ 'en' ], environment },
  vc  : { locale,       locales: [ 'en' ], environment },
  vn  : { locale: 'vi', locales: [ 'en', 'vi' ], environment },
  www : { locale,       locales },
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
  gkssb       : { locale, locales }
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