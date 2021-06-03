
import { notifyDone, runTask }   from '../util/cli-feedback.mjs'
import { execSync  } from 'child_process'
import { webCtx, sitesCtx     }            from '../util/context.mjs'
import   config                  from '../util/config.mjs'


import consola from 'consola'

export default async(branch, args) => {

  if(args.length)
    await (runTask(branch))(loadDemoData, `${branch.toUpperCase()}: Load Demo Data on Site: ${args[0]}`, args)
  else
    await (runTask(branch))(loadDemoDataAll, `${branch.toUpperCase()}: Load Demo Data on ALL sites`)

  notifyDone()()
}



async function loadDemoDataAll(branch){ 
  const { sites } = config[branch]

  for (const site in sites)
    await loadDemoData(branch, site)
}


async function loadDemoData(branch, site){ 
  try {

    execSync(`cd ${webCtx}`)

    execSync(`ddev drush @${site} sql:cli < /home/ubuntu/efs/tmp/demo.sql`)

    execSync(`cp /home/ubuntu/efs/tmp/files.tgz ${sitesCtx}/${site}/files.tgz`)
    execSync(`tar -C ${sitesCtx}/${site} -zxf ${sitesCtx}/${site}/files.tgz`)

    execSync(`ddev drush @${site} cr`)

    return
  }
  catch(e){
    consola.error(`${site}: mmo `, e)
  }
}