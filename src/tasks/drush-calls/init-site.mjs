import { execSync   }          from 'child_process'
import   config                from '../../util/config.mjs'

import consola from 'consola'
import request from 'superagent'

export default async function initSite(branch, { site }){ 
  const countryMap = await getCountries()

  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  try {
    execSync(`cd ${siteHome}`)

    if(countryMap[site])
      execSync(`ddev drush -y @${site} cset block.block.biolandfooterbiolandlinks settings.label "\"${parse(countryMap[site].name[sites[site].locale])}\""`)

    console.log('')
    consola.info(`${site}: logo updated`)


    
    execSync(`ddev drush @${site} cr`)

    console.log('')
    consola.info(`${site}: cache rebuilt`)
  }
  catch(e){
    consola.error(`${site}: initSite `, e)
  }
}

function siteExists(branch, siteCode){
  
}