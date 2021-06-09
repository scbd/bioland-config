
import { notifyDone, runTask }   from '../util/cli-feedback.mjs'
import { execSync  } from 'child_process'
import { webCtx, sitesCtx     }            from '../util/context.mjs'
import   config                  from '../util/config.mjs'


import consola from 'consola'

export default async(branch, args) => {

  if(args.length)
    await (runTask(branch))(loadLatestData, `${branch.toUpperCase()}: Load Demo Data on Site: ${args[0]}`, args)
  else
    await (runTask(branch))(loadLatestDataAll, `${branch.toUpperCase()}: Load Demo Data on ALL sites`)

  notifyDone()()
  process.exit(0)
}



async function loadLatestDataAll(branch){ 
  const { sites } = config[branch]

  for (const site in sites)
    await loadDemoData(branch, site)
}


async function loadLatestData(branch, site){ 
  try {

    execSync(`cd ${webCtx}`)

    console.log('')
    consola.info(`${branch.toUpperCase()} Site: ${site} -> loading demo data`)

    execSync(`mkdir -p temp`)

    execSync(`aws s3 cp "s3://biolands/${branch}/${site}-latest.sql.gz" "temp/${site}-latest.sql.gz" `)
    execSync(`aws s3 cp "s3://biolands/${branch}/${site}-latest-site.tgz" "temp/${site}-latest-site.tgz" `)
    execSync(`if test -f "temp/${site}-latest.sql"; then rm  temp/${site}-latest.sql; fi;`)
    execSync(`gunzip temp/${site}-latest.sql.gz`)

    execSync(`ddev drush @${site} sql:cli < temp/${site}-latest.sql`)

    // execSync(`rm -rf ${sitesCtx}/${site}/files`)
    execSync(`tar -C ${sitesCtx}/${site} -zxf temp/${site}-latest-site.tgz`)

    execSync(`ddev drush @${site} cr`)

    console.log('')
    consola.info(`${branch.toUpperCase()}: demo data loaded for site:${site}`)

    return
  }
  catch(e){
    consola.error(`${site}: loadLatestData `, e)
  }
}