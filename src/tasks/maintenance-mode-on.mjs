
import { notifyDone, runTask }   from '../util/cli-feedback.mjs'
import { execSync  } from 'child_process'
import { webCtx, sitesCtx     }            from '../util/context.mjs'
import   config                  from '../util/config.mjs'


import consola from 'consola'

export default async(branch, args) => {

  if(args.length)
    await (runTask(branch))(mmo, `${branch.toUpperCase()}: Initiating maintenance mode on Site: ${args[0]}`, args)
  else
    await (runTask(branch))(mmoAll, `${branch.toUpperCase()}: Initiating maintenance mode on ALL sites`)

  notifyDone()()
  process.exit(0)
}



async function mmoAll(branch){ 
  const { sites } = config[branch]

  for (const site in sites)
    await mmo(branch, site)
}


async function mmo(branch, site){ 
  try {

    execSync(`cd ${webCtx}`)

    console.log('')
    consola.info(`${branch.toUpperCase()} Site: ${site} -> maintenance mode on`)
    
    execSync(`ddev drush @${site} sset system.maintenance_mode 1`)

    execSync(`ddev drush @${site} cr`)

    return
  }
  catch(e){
    consola.error(`${site}: mmo `, e)
  }
}