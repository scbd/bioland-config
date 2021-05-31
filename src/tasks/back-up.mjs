
import { notifyDone, runTask } from '../util/cli-feedback.mjs'
import { execSync, spawnSync   }          from 'child_process'
import   config                    from '../util/config.mjs'
import { webCtx         }            from '../util/context.mjs'
import consola from 'consola'

export const backUpSite = async(branch, args) => {
  await (runTask(branch))(bk, `${branch.toUpperCase()}: Backing up site: ${args[2]}`, args)
  
  notifyDone()()
}

export default async (branch)=>{
  await (runTask(branch))(bk, `${branch.toUpperCase()}: Backing up all sites`)
  
  notifyDone()()
}


function bk(branch){
  const { sites }  = config[branch]

  for (const site in sites)
    processSite(branch, site)

}

function processSite(branch, site){
  const   now      = new Date()
  const   year     = now.getFullYear()
  const   month    = ('0' + (now.getMonth() + 1)).slice(-2)
  const   day      = ('0' + now.getDate()).slice(-2)
  const   hour     = now.getHours()
  const   min      = now.getMinutes()
  const   seconds  = now.getSeconds()
  const   dateTime = `${year}-${month}-${day}-T-${hour}-${min}-${seconds}`
  const   S3_URL   = `s3://biolands/${branch}/${year}-${month}`
  
  execSync(`cd ${webCtx}`)

  execSync(`mkdir -p ${webCtx}/dumps/${site}`)
  execSync(`ddev drush "@${site}" sql:dump --structure-tables-list=cache,cache_*,watchdog --gzip --result-file="dumps/${site}/${site}-${dateTime}.sql"`)
  execSync(`tar -czf "${webCtx}/dumps/${site}/${site}-${dateTime}-site.tgz" "${webCtx}/sites/${site}"`)

  console.log('')
  consola.info(`${site}: dumped and files tared and gzipped`)

  execSync(`aws s3 cp "${webCtx}/dumps/${site}/${site}-${dateTime}-site.tgz" "${S3_URL}/${site}/${site}-${dateTime}-site.tgz"`)
  execSync(`aws s3 cp "${webCtx}/dumps/${site}/${site}-${dateTime}.sql.gz" "${S3_URL}/${site}/${site}-${dateTime}.sql.gz"`)

  console.log('')
  consola.info(`${site}: transfered to ${S3_URL}/${site}/${site}-${dateTime}`)

  execSync(`rm ${webCtx}/dumps/${site}/${site}-${dateTime}-site.tgz`)
  execSync(`rm ${webCtx}/dumps/${site}/${site}-${dateTime}.sql.gz`)

  consola.info(`${site}: backup files removed`)
}