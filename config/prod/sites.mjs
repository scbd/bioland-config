import { locale, locales } from '../util.mjs'

export default {
  www : { chmGovernment: 'FJI', locale, locales: [ 'en', 'fr', 'ru', 'ar', 'es', 'zh'] },

  //bioland0928
  be  : { chmGovernment: 'BEL',  urls: [ 'biodiv.be', 'www.biodiv.be' ],  locale, locales: [ 'en', 'fr', 'nl', 'de']  },//redirectTo: 'www.biodiv.be',
  bi  : { chmGovernment: 'BDI',  locale, locales: [ 'en', 'fr' ] }, 

  // bioland20200310 'www.asean.chm-cbd.net',
  acb : { chmGovernment: 'PHL', urls:['asean.chm-cbd.net'], redirectTo: 'asean.chm-cbd.net', locale, locales: [ 'en', 'zh', 'ms', 'my', 'km', 'lo', 'fil', 'th', 'vi' ], logo: 'ACB_ASEAN_Logo.png'  },

  // bioland-v3.5.1
  fr  : { chmGovernment: 'FRA', urls: [ 'biodiv.mnhn.fr'],  locale: 'fr', locales: [ 'en', 'fr' ] },//redirectTo: 'biodiv.mnhn.fr',
  zw  : { chmGovernment: 'ZWE', locale, locales },

  // other
  ca  : { chmGovernment: 'CAN', urls: [ 'biodivcanada.chm-cbd.net'], redirectTo: 'biodivcanada.chm-cbd.net', locale, locales: [ 'en', 'fr' ] }
}