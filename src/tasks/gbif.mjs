
import { notifyDone, runTask } from '../util/cli-feedback.mjs'
import { execSync   }          from 'child_process'
import { webCtx     }          from '../util/context.mjs'
import   config                from '../util/config.mjs'
import   consola               from 'consola'

export default async(branch, args) => {
  if(args.length)
    await (runTask(branch))(gbifSite, `${branch.toUpperCase()}: GBIF enable: ${args[0]}`, args)
  else
    await (runTask(branch))(gbifAll, `${branch.toUpperCase()}: GBIF enable ALL sites`)
  notifyDone()()
  process.exit(0)
}


function gbifAll(branch) {
  const { sites } = config[branch]

  execSync(`cd ${webCtx}`)

  for (const site in sites)
    gbifSite(branch, site)
}

function gbifSite(branch, site) {

  execSync(`cd ${webCtx}`)

  console.log('')
  consola.info(`${branch.toUpperCase()} Site: ${site} -> enabling GBIF`)

  try{
    execSync(`ddev drush -y @${site} en gbifstats`)
    execSync(`ddev drush @${site} role-add-perm "anonymous" "'view GBIF Stats'"`)
    execSync(`ddev drush @${site} role-add-perm "authenticated" "'view GBIF Stats'"`)
    execSync(`ddev drush @${site} role-add-perm "content_manager" "'configure GBIF Stats','generate GBIF Stats'"`)
    execSync(`ddev drush @${site} role-add-perm "site_manager" "'generate GBIF Stats','configure GBIF Stats','generate GBIF Stats'"`) 
    execSync(`chromium-browser --headless --no-sandbox --verbose  --incognito  --ignore-certificate-errors --ignore-ssl-errors $(ddev drush @${site} user:login --mail=bioland-sm@chm-cbd.net /gbifstats/generate/${site.toUpperCase()})`)
    
    console.log('')
    consola.info(`${site}: gbif enabled and generated`)
  }catch(e){
    consola.error(`${site}: gbif  error`, e)
  }
}