// demo bf bj cm cd ci gn gw mg ma me tg ch my th ph sg id gy om ps ug eg nl bt lb kw 27

import { locale, locales } from '../util.mjs'

const environment = 'test'

export default {
  demo: { chmGovernment: 'MYS', environment, logo: 'fiji.png', locale, locales }, // bioland-v3.5.1

  bf  : { chmGovernment: 'BFA', environment, locale, locales },
  bj  : { chmGovernment: 'BEN', environment, locale, locales },
  cm  : { chmGovernment: 'CMR', environment, locale, locales },
  cd  : { chmGovernment: 'COD', environment, locale, locales },
  ci  : { chmGovernment: 'CIV', environment, locale, locales },
  gn  : { chmGovernment: 'GIN', environment, locale, locales },
  gw  : { chmGovernment: 'GNB', environment, locale, locales },
  mg  : { chmGovernment: 'MDG', environment, locale, locales },
  ma  : { chmGovernment: 'MAR', environment, locale, locales },
  tg  : { chmGovernment: 'TGO', environment, locale, locales },
  ch  : { chmGovernment: 'CHE', environment, locale, locales },

  // bioland20200310
  // my th ph sg id  5
  my  : { chmGovernment: 'MYS', environment, locale, locales },
  th  : { chmGovernment: 'THA', environment, locale, locales },
  ph  : { chmGovernment: 'PHL', environment, locale, locales },
  sg  : { chmGovernment: 'SGP', environment, locale, locales },
  id  : { chmGovernment: 'IDN', environment, locale, locales },

  // bioland-v3.5.1
  // gy om ps ug 5
  gy  : { chmGovernment: 'GUY', environment, locale, locales },
  om  : { chmGovernment: 'OMN', environment, locale, locales },
  ps  : { chmGovernment: 'PSE', environment, locale, locales },
  ug  : { chmGovernment: 'UGA', environment, locale, locales },                              

  // bioland-v3.6
  // eg 1
  eg  : { chmGovernment: 'EGY', environment, locale, locales },

  // bioland-v3.7
  // han-demo nl bt lb kw 4
  nl: { chmGovernment: 'NLD', environment, locale, locales },
  bt: { chmGovernment: 'BTN', environment, locale, locales },
  lb: { chmGovernment: 'LBN', environment, locale, locales  },
  kw: { killCache: true, chmGovernment: 'KWT', environment, locale:'ar', locales:['ar', 'en'] }, // prod

  // new
  vn: { chmGovernment: 'VNM', environment, locale, locales }
}

// export default {
//   demo: { chmGovernment: 'MYS', environment, logo: 'fiji.png', locale, locales }, // bioland-v3.5.1

//   bf  : { chmGovernment: 'BFA', environment, urls: ['test-bf.chm-cbd.net'], locale, locales },
//   bj  : { chmGovernment: 'BEN', environment, urls: ['test-bj.chm-cbd.net'], locale, locales },
//   cm  : { chmGovernment: 'CMR', environment, urls: ['test-cm.chm-cbd.net'], locale, locales },
//   cd  : { chmGovernment: 'COD', environment, urls: ['test-cd.chm-cbd.net'], locale, locales },
//   ci  : { chmGovernment: 'CIV', environment, urls: ['test-ci.chm-cbd.net'], locale, locales },
//   gn  : { chmGovernment: 'GIN', environment, urls: ['test-gn.chm-cbd.net'], locale, locales },
//   gw  : { chmGovernment: 'GNB', environment, urls: ['test-gw.chm-cbd.net'], locale, locales },
//   mg  : { chmGovernment: 'MDG', environment, urls: ['test-mg.chm-cbd.net'], locale, locales },
//   ma  : { chmGovernment: 'MAR', environment, urls: ['test-ma.chm-cbd.net'], locale, locales },
//   me  : { chmGovernment: 'MNE', environment, urls: ['test-me.chm-cbd.net'], locale, locales },
//   tg  : { chmGovernment: 'TGO', environment, urls: ['test-tg.chm-cbd.net'], locale, locales },
//   ch  : { chmGovernment: 'CHE', environment, urls: ['test-ch.chm-cbd.net'], locale, locales },

//   // bioland20200310
//   // my th ph sg id  5
//   my  : { chmGovernment: 'MYS', environment, urls: ['test-my.chm-cbd.net'], locale, locales },
//   th  : { chmGovernment: 'THA', environment, urls: ['test-th.chm-cbd.net'], locale, locales },
//   ph  : { chmGovernment: 'PHL', environment, urls: ['test-ph.chm-cbd.net'], locale, locales },
//   sg  : { chmGovernment: 'SGP', environment, urls: ['test-sg.chm-cbd.net'], locale, locales },
//   id  : { chmGovernment: 'IDN', environment, urls: ['test-id.chm-cbd.net'], locale, locales },

//   // bioland-v3.5.1
//   // gy om ps ug 5
//   gy  : { chmGovernment: 'GUY', environment, urls: ['new-gy.chm-cbd.net'], locale, locales },
//   om  : { chmGovernment: 'OMN', environment, urls: ['new-om.chm-cbd.net'], locale, locales },
//   ps  : { chmGovernment: 'PSE', environment, urls: ['new-ps.chm-cbd.net'], locale, locales },
//   ug  : { chmGovernment: 'UGA', environment, urls: ['new-ug.chm-cbd.net'], locale, locales },                              

//   // bioland-v3.6
//   // eg 1
//   eg  : { chmGovernment: 'EGY', environment, urls: ['new-eg.chm-cbd.net'], locale, locales },

//   // bioland-v3.7
//   // han-demo nl bt lb kw 4
//   nl: { chmGovernment: 'NLD', environment, urls: ['test-nl.chm-cbd.net'], locale, locales },
//   bt: { chmGovernment: 'BTN', environment, urls: ['test-bt.chm-cbd.net'], locale, locales },
//   lb: { chmGovernment: 'LBN', environment, urls: ['test-lb.chm-cbd.net'], locale },
//   kw: { killCache: true, chmGovernment: 'KWT', environment, urls: ['test-kw.chm-cbd.net'], locale:'ar', locales:['ar', 'en'] }, // prod

//   // new
//   vn: { chmGovernment: 'VNM', environment, locale, locales }
// }