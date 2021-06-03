import   config          from '../util/config.mjs'
import   isPlainObject   from 'lodash.isplainobject'

function branchDomains (branch, base = false){
  const { sites }    = config[branch]
  const   mapDomains = base? (({ baseUrls }) => ( baseUrls || [])) : (({ urls }) => ( urls || []))
  const   urls       = (Object.values(sites).map(mapDomains)).flat().sort()
  const   fileName   = base? `${branch}-base-domains.txt` : `${branch}-domains.txt`

  let data = ''

  for (const aUrl of unique(urls)) 
    data += `${aUrl} `
  
  console.log(data)
}

function unique (array) {
  return Array.from(new Set(array.map((el)=>{ if(isPlainObject(el)) return JSON.stringify(el); else return el}))).map(jsonParse)
}

function jsonParse(el){ try{ return JSON.parse(el); }catch(e){ return el; } }

branchDomains(process.argv[2], !!process.argv[3])