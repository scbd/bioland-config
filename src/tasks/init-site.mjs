
import { notifyDone, runTask }   from '../util/cli-feedback.mjs'
import { execSync  } from 'child_process'
import { webCtx, sitesCtx     }            from '../util/context.mjs'
import   config                  from '../util/config.mjs'

import { setBioTheme } from './not-user-commands/bl-init/index.mjs'
import { blUserFp } from './not-user-commands/bl-users.mjs'

import consola from 'consola'

export default async(branch, args) => {

  if(args.length)
    await (runTask(branch))(initSite, `${branch.toUpperCase()}: Initiating site: ${args[0]}`, args)
  else
    await (runTask(branch))(initSites, `${branch.toUpperCase()}: Initiating ALL sites`)

  notifyDone()()
}



async function initSites(branch){ 
  const { sites } = config[branch]

  for (const site in sites)
    await initSite(branch, site)
}


async function initSite(branch, site){ 
  try {

    execSync(`cd ${webCtx}`)

    await setBioTheme(branch, site)

    //blUserFp(branch, site)

    execSync(`ddev drush @${site} cr`)

    return
  }
  catch(e){
    consola.error(`${site}: initSite `, e)

    if(e?.response?.body?.errors)
      consola.error(e.response.body.errors)
  }
}