
import { notifyDone, runTask }   from '../util/cli-feedback.mjs'
import { execSync  } from 'child_process'
import { webCtx, sitesCtx     }            from '../util/context.mjs'
import   config                  from '../util/config.mjs'


import consola from 'consola'

export default async(branch, args) => {

  console.log( args)
  if(args.length)
    await (runTask(branch))(loadDemoData, `${branch.toUpperCase()}: Load Demo Data on Site: ${args[0]}`, args)
  else if(branch !== 'demo') throw new Error(`Cannot load demo data for all sites on branch ${branch.toUpperCase()}`)
  else await (runTask(branch))(loadDemoDataAll, `${branch.toUpperCase()}: Load Demo Data on ALL sites`)

  notifyDone()()
  process.exit(0)
}



async function loadDemoDataAll(branch){ 
  const { sites } = config[branch]

  for (const site in sites)
    await loadDemoData(branch, site)
}


async function loadDemoData(branch, site){ 
  try {

    execSync(`cd ${webCtx}`)

    console.log('')
    consola.info(`${branch.toUpperCase()} Site: ${site} -> loading demo data`)

    execSync(`ddev drush @${site} sql:cli < /home/ubuntu/efs/tmp/demo.sql`)

    execSync(`cp /home/ubuntu/efs/tmp/files.tgz ${sitesCtx}/${site}/files.tgz`)
    execSync(`tar -C ${sitesCtx}/${site} -zxf ${sitesCtx}/${site}/files.tgz`)

    console.log('')
    consola.info(`${branch.toUpperCase()}: demo data loaded for site:${site}`)

    return
  }
  catch(e){
    consola.error(`${site}: mmo `, e)
  }
}