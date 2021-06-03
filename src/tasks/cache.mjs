
import { notifyDone, runTask } from '../util/cli-feedback.mjs'
import { execSync   }          from 'child_process'
import   config                from '../util/config.mjs'
import { webCtx     }          from '../util/context.mjs'

export default async(branch, args) => {
  if(args.length)
    await (runTask(branch))(cache, `${branch.toUpperCase()}: Rebuilding cache site: ${args[0]}`, args)
  else
    await (runTask(branch))(cacheAll, `${branch.toUpperCase()}: Rebuilding cache  ALL sites`)
  notifyDone()()
}

function cacheAll(branch) {
  const { sites } = config[branch]

  execSync(`cd ${webCtx}`)

  for (const site in sites)
    cache(branch, site)
}


function cache(branch, site) {

  execSync(`cd ${webCtx}`)

  try{
    execSync(`ddev drush @${site} cr`)

    console.log('')
    consola.info(`${site}: cache rebuilt`)
  }catch(e){
    consola.error(`${site}: cache rebuild error`, e)
  }

}