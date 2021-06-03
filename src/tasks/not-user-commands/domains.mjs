import   config          from '../../util/config.mjs'
import   isPlainObject   from 'lodash.isplainobject'
import { writeFile } from '../../util/files.mjs'
import   consola         from 'consola'

export const getDomains = (branch)=>{
  return branchDomains (branch, false)
}

export const getBaseDomains = (branch)=>{
  return branchDomains (branch, true)
}

export const getBaseDomainsByZoneId = (branch, zoneId)=>{
  return getByZoneId (branch, zoneId, true)
}

export const getDomainsByZoneId = (branch, zoneId)=>{
  return getByZoneId (branch, zoneId, false)
}

export const getZoneIds = (branch) => {
  const { getHostedZoneId } = config[ branch ]
  const   zoneIds           = []
  const   urls              = branchDomains (branch, false)

  for (const aUrl of urls)
    if(getHostedZoneId(aUrl))
      zoneIds.push(getHostedZoneId(aUrl))

  return unique(zoneIds)
}

function getByZoneId(branch, zoneId, isBase = false){
  const { getHostedZoneId } = config[ branch ]
  const   domains           = branchDomains (branch, isBase)

  return domains.filter(aUrl => getHostedZoneId(aUrl) === zoneId)
}

function branchDomains (branch, base = false){
  const { sites }    = config[ branch ]
  const   mapDomains = base? (({ baseUrls }) => ( baseUrls || [])) : (({ urls }) => ( urls || []))
  const   urls       = (Object.values(sites).map(mapDomains)).flat().sort()
  const   fileName   = base? `${branch}-base-domains.txt` : `${branch}-domains.txt`

  let data = ''

  for (const aUrl of unique(urls)) 
    data += `${aUrl}\n`
  
  writeFile(process.env.INIT_CWD, fileName, data)

  return unique(urls)
}

function unique (array) {
  return Array.from(new Set(array.map((el)=>{ if(isPlainObject(el)) return JSON.stringify(el); else return el}))).map(jsonParse)
}

function jsonParse(el){ try{ return JSON.parse(el); }catch(e){ return el; } }