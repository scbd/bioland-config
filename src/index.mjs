const locale      =   'en'
const locales     = [ 'ar', 'en', 'es', 'fr', 'ru', 'zh' ]
const environment =   'test'

const sites =  {
  acb : { locale,       locales: [ 'en', 'zh', 'ms', 'my', 'km', 'lo', 'fil', 'th', 'vi' ],  redirectTo: 'asean.chm-cbd.net', logo: 'ACB_ASEAN_Logo.png'  },
  af  : { locale, locales, environment },
  ag  : { locale, locales: [ 'en' ], environment },
  am  : { locale, locales, environment },  
  ao  : { locale: 'pt', locales: [ 'pt', 'ar', 'en', 'es', 'fr', 'ru', 'zh' ],  environment },
  ar  : { locale: 'en', locales: [ 'en', 'es' ], environment },
  az  : { locale: 'az',       locales, environment },
  bd  : { locale, locales:['bn',...locales], environment },
  be  : { locale,       locales: [ 'en', 'fr', 'nl', 'de'], urls: ['biodiv.be'], redirectTo: 'www.biodiv.be' },
  bf  : { locale: 'fr', locales: [ 'en', 'fr' ],             environment },
  bi  : { locale,       locales: [ 'en', 'fr' ] }, 
  bj  : { locale: 'fr', locales: [ 'en', 'fr' ] },
  bo  : { locale, locales, environment },
  bn  : { locale, locales:['ms',...locales], environment },
  bt  : { locale,       locales: [ 'dz' ] },
  bw  : { locale: 'en', locales: [ 'en', 'tn' ], environment },
  bz  : { locale, locales, environment },
  cd  : { locale: 'fr', locales: [ 'en', 'fr' ],             environment },
  cf  : { locale: 'fr', locales: [ 'en', 'fr' ] },
  cg  : { locale: 'fr', locales: [ 'en', 'fr' ] },  
  ch  : { locale: 'en', locales: [ 'en', 'fr', 'de', 'it' ], environment},
  ci  : { locale: 'fr', locales: [ 'en', 'fr' ]  },
  ck  : { locale, locales, environment },
  cm  : { locale: 'fr', locales: [ 'en', 'fr' ], redirectTo: 'cm.chm-cbd.net', urls: ['cameroon.chm-cbd.net', 'cameroun.chm-cbd.net'] },
  co  : { locale, locales, environment },
  cz  : { locale, locales, environment },
  dm  : { locale, locales, environment },
  dz : { locale, locales, environment },
  ec  : { locale, locales, environment },
  ee  : { locale, locales, environment },
  eg  : { locale: 'ar', locales: [ 'ar', 'en' ],             environment },
  er  : { locale, locales, environment },
  et  : { locale,       locales: [ 'am', 'en' ] },
  fj  : { locale, locales, environment },
  fi  : { locale, locales, environment },
  fm  : { locale, locales, environment },
  fr  : { locale: 'fr', locales: [ 'en', 'fr' ], redirectTo: 'biodiv.mnhn.fr' },
  ga  : { locale,       locales: [ 'en', 'fr' ] },
  gb  : { locale, locales, environment },
  ge  : { locale, locales, environment },
  gh  : { locale,       locales: [ 'en', 'fr'],         environment },
  gm  : { locale: 'en', locales: [ 'en' ],             environment },
  gn  : { locale: 'fr', locales: [ 'en', 'fr' ]},
  gq  : { locale, locales, environment },
  gw  : { locale: 'pt', locales: [ 'en', 'fr', 'pt' ],  environment }, 
  gy  : { locale,       locales: [ 'en'],               environment },
  hu  : { locale, locales, environment },
  id  : { locale,       locales: [ 'en', 'fr', 'id' ],  environment },
  ie  : { locale, locales, environment },
  il  : { locale, locales, environment },
  ht  : { locale: 'fr', locales: [ 'en', 'fr'],  environment },  
  iq  : { locale: 'ar', locales: [ 'ar', 'en' ] },
  jo  : { locale,       locales: [ 'ar', 'en' ], environment },
  ke  : { locale,       locales: [ 'en' ]},
  kg  : { locale, locales:['ky',...locales], environment },
  ki  : { locale, locales, environment },
  km  : { locale,       locales: [ 'en', 'fr' ] },
  kn  : { locale, locales, environment },
  kp  : { locale, locales, environment },
  kr  : { locale, locales: ['ko', ...locales], environment },
  kw  : { locale: 'ar', locales: [ 'ar', 'en'], environment},
  la  : { locale,       locales, environment },
  lb  : { locale: 'ar', locales: [ 'ar', 'en'], environment },
  li  : { locale, locales, environment },
  lk  : { locale,       locales },
  ls  : { locale,       locales, environment },
  lt  : { locale, locales, environment },
  ma  : { locale,       locales: [ 'ar', 'en', 'fr'] },
  mc  : { locale, locales, environment },
  me  : { locale, locales, environment },
  mg  : { locale,       locales: [ 'en', 'fr' ], environment },
  mk  : { locale, locales, environment },
  ml  : { locale,       locales: [ 'en', 'fr' ] },
  mn  : { locale, locales: ['mn', ...locales], environment },
  mm  : { locale, locales: ['my', ...locales], environment },
  mr  : { locale,       locales: [ 'ar','en', 'fr' ] },
  mu  : { locale,       locales: [ 'en', 'fr' ] },
  my  : { locale,       locales: [ 'en', 'fr', 'zh', 'ms'], environment },
  mw  : { locale,       locales: [ 'en'] },
  mz : { locale, locales, environment },
  na  : { locale,       locales: [ 'en' ], environment },
  ni  : { locale: 'es', locales: [ 'en', 'es'], environment },
  ne  : { locale,       locales: [ 'en', 'fr']},
  nl  : { locale: 'nl', locales: [ 'en', 'nl'] },
  np  : { locale, locales: ['ne', ...locales], environment },
  nr  : { locale,       locales, environment },
  nu  : { locale,       locales, environment }, 
  om  : { locale: 'ar', locales: [ 'en', 'ar'], environment },
  pa  : { locale,       locales, environment },
  pe  : { locale,       locales, environment },
  pg  : { locale,       locales, environment },
  ph  : { locale,       locales: [ 'es', 'en', 'fr', 'fil'], environment },
  pk  : { locale,       locales: [ 'en', 'ur'], environment },
  ps  : { locale: 'ar', locales: [ 'en', 'ar'] },
  pt  : { locale, locales, environment },
  py  : { locale,       locales, environment },
  qa  : { locale,       locales, environment },
  rw  : { locale: 'fr', locales: [ 'en', 'fr' ] },
  rs  : { locale: 'sr', locales: [ 'en', 'sr' ], environment},//, redirectTo: 'biodiverzitet-chm.rs'
  sa  : { locale: 'ar', locales: [ 'en', 'ar'], environment },
  sb  : { locale, locales, environment },
  sd  : { locale: 'ar', locales: [ 'en', 'ar'] },
  sg  : { locale,       locales: [ 'en', 'fr', 'zh', 'ms', 'ta'], environment },
  si  : { locale, locales, environment },
  sl  : { locale,       locales, environment },
  sm  : { locale, locales, environment },
  sn  : { locale, locales, environment },
  so  : { locale, locales, environment },
  sr  : { locale,       locales: ['nl', ...locales], environment },
  st  : { locale, locales, environment },
  ss  : { locale,       locales, environment },
  sy  : { locale: 'ar', locales: [ 'en', 'ar'], environment },
  sz  : { locale,       locales: [ 'ss', ...locales ], environment },
  td  : { locale: 'fr', locales: [ 'en', 'fr', 'ar'], environment },
  tg  : { locale,       locales: [ 'en', 'fr' ] },
  th  : { locale,       locales: [ 'en', 'fr', 'zh', 'th'], environment },
  tj : { locale, locales, environment },
  tl : { locale, locales, environment },
  tm : { locale, locales, environment },
  tn : { locale, locales, environment },
  tr : { locale, locales, environment },
  tv  : { locale,       locales: [ 'en'], environment },
  tz  : { locale,       locales: [ 'en', 'sw'] },
  ua  : { locale, locales, environment },
  ug  : { locale,       locales: [ 'en' ], environment },
  us  : { locale, locales, environment },
  uz  : { locale,       locales, environment },
  vc  : { locale,       locales: [ 'en' ], environment },
  vn  : { locale: 'vi', locales: [ 'en', 'vi' ], environment },
  vu  : { locale, locales, environment },
  www : { locale,       locales },
  ye  : { locale,       locales: [ 'en', 'ar'] },
  zm  : { locale,       locales: [ 'en' ] },
  zw  : { locale,       locales: [ 'en' ] },

  'asean-demo': { locale, locales,  environment},
  'geo-bon'   : { locale, locales, environment },
  'han-demo'  : { locale, locales },
  demo        : { locale, locales },
  training    : { locale, locales },
  seed        : { locale, locales },
  rjh         : { locale, locales, environment },
  rqk         : { locale, locales, environment },
  ray         : { locale, locales, environment },
  gkssb       : { locale, locales },
  oek         : { locale, locales, environment },
  'test-ma'   : { locale, locales, },
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