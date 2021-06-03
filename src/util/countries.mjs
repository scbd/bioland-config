import request from 'superagent'
import allCodes from './all-country-codes.mjs'
const globals = {}

export const getCountries = async ()=>{
  if(globals.cMap) return globals.cMap

  const data = await request.get('https://api.cbd.int/api/v2015/countries/')
                      .then(({ body }) => body)

  const cMap = {}

  for (const aCountry of data) {
    cMap[aCountry.code.toLowerCase()] = aCountry
  }

  globals.cMap = cMap

  return cMap
}


export const getIsoAlpha3 = (code) =>{
  if(code==='eu') return 'EU'
  if(!code) throw new Error('getIsoAlpha3: passed code undefined')

  const country = (allCodes.filter((c) => c['alpha-2'] === code.toUpperCase()))[0]

  if(!country) throw new Error(`getIsoAlpha3: ${code} not found in countries`)

  return country['alpha-3']
}