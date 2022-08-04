const locale  = 'en';
const locales = [ 'ar', 'en', 'es', 'fr', 'ru', 'zh' ];

const sites =  {
  acb : { locale, locales: [ 'en', 'zh', 'ms', 'my', 'km', 'lo', 'fil', 'th', 'vi' ], urls: ['www.asean.chm-cbd.net'], redirectTo: 'asean.chm-cbd.net', logo: 'ACB_ASEAN_Logo.png'  },
  be  : { locale, locales: [ 'en', 'fr', 'nl', 'de'], urls: ['biodiv.be'], redirectTo: 'www.biodiv.be' },
  bf  : { locale: 'fr', locales:[ 'en', 'fr' ], environment: 'test' },
  bi  : { locale, locales: [ 'en', 'fr' ] }, 
  bj  : { locale: 'fr', locales:[ 'en', 'fr' ], environment: 'test' },
  bt  : { locale, locales: [ 'dz' ] },
  cd  : { locale: 'fr', locales:[ 'en', 'fr' ], environment: 'test' },
  cf  : { locale: 'fr', locales:[ 'en', 'fr' ] },
  cg  : { locale: 'fr', locales:[ 'en', 'fr' ] },  
  ch  : { locale: 'en', locales:[ 'en', 'fr', 'de', 'it' ], environment: 'test'},
  ci  : { locale: 'fr', locales:[ 'en', 'fr' ]  },
  cm  : { locale: 'fr', locales:[ 'en', 'fr' ], environment: 'test' },
  eg  : { locale: 'ar', locales:[ 'ar', 'en' ], environment: 'test' },
  et  : { locale, locales:[ 'am', 'en' ] },
  fr  : { locale: 'fr', locales: [ 'en', 'fr' ], redirectTo:'biodiv.mnhn.fr' },
  ga  : { locale, locales:[ 'en', 'fr' ] },
  gh  : { locale, locales:[ 'en', 'fr'], environment: 'test' },
  gn  : { locale: 'fr', locales:[ 'en', 'fr' ], environment: 'test'  },
  gw  : { locale: 'pt', locales:[ 'en', 'fr', 'pt' ], environment: 'test' }, 
  gy  : { locale, locales:['en'], environment: 'test' },
  id  : { locale, locales: [ 'en', 'fr', 'id' ], environment: 'test' },
  iq  : { locale: 'ar', locales:[ 'ar', 'en' ] },
  jo  : { locale, locales:[ 'ar', 'en' ], environment: 'test' },
  ke  : { locale, locales:[ 'en' ], environment: 'test' },
  km  : { locale, locales:[ 'en', 'fr' ] },
  kw  : { locale: 'ar', locales:['ar', 'en'], environment: 'test'},
  lb  : { locale: 'ar', locales:['ar', 'en'], environment: 'test' },
  lk  : { locale, locales, environment: 'test' },
  ma  : { locale, locales: ['ar', 'en', 'fr', 'es'], environment: 'test' },
  mg  : { locale, locales:[ 'en', 'fr' ], environment: 'test' },
  ml  : { locale, locales:[ 'en', 'fr' ] },
  mr  : { locale, locales:[ 'ar','en', 'fr' ] },
  mu  : { locale, locales:[ 'en', 'fr' ] },
  my  : { locale, locales:[ 'en', 'fr', 'zh', 'ms'], environment: 'test' },
  ne  : { locale, locales: ['en', 'fr'], environment: 'test' },
  nl  : { locale:'nl', locales: ['en', 'nl'] },
  om  : { locale: 'ar', locales: ['en', 'ar'], environment: 'test' },
  ph  : { locale, locales:['es', 'en', 'fr', 'fil'], environment: 'test' },
  ps  : { locale: 'ar', locales: ['en', 'ar'], environment: 'test' },
  rw  : { locale: 'fr', locales:[ 'en', 'fr' ] },
  sa  : { locale: 'ar', locales: ['en', 'ar'], environment: 'test' },
  sd  : { locale: 'ar', locales: ['en', 'ar'] },
  sg  : { locale, locales: ['en', 'fr', 'zh', 'ms', 'ta'], environment: 'test' },
  sy  : { locale: 'ar', locales: ['en', 'ar'], environment: 'test' },
  td  : { locale: 'fr', locales: ['en', 'fr', 'ar'], environment: 'test' },
  tg  : { locale, locales:[ 'en', 'fr' ], environment: 'test' },
  th  : { locale, locales: ['en', 'fr', 'zh', 'th'], environment: 'test' },
  tz  : { locale, locales: ['en', 'sw'] },
  ug  : { locale, locales: [ 'en' ], environment: 'test' },
  vn  : { locale: 'vi', locales: [ 'en', 'vi' ], environment: 'test' },
  www : { locale, locales },
  ye  : { locale, locales: ['en', 'ar'] },
  zm  : { locale, locales: [ 'en' ] },
  zw  : { locale, locales: [ 'en' ] },

  'han-demo'  : { locale, locales },
  demo        : { locale, locales },
  training    : { locale, locales },
  seed        : { locale, locales },
}

const c = (() =>{
    const name          = 'bioland'
    const httpPort      = '5566'
    const httpsPort     = '5567'
    const hostDbPort    = '3600'
    const routePriority =  2
    const siteCodes     = Object.keys(sites)

    return { name, sites, siteCodes, routePriority, httpPort, httpsPort, hostDbPort }
})()

export const config = c

export default c