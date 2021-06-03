import { notifyDone, runTask } from '../util/cli-feedback.mjs'
import { execSync   }          from 'child_process'
import { webCtx     }          from '../util/context.mjs'
import   config                from '../util/config.mjs'
import   consola               from 'consola'


export default async(branch, args) => {
  if(args.length)
    await (runTask(branch))(backUpSite, `${branch.toUpperCase()}: Backing up site: ${args[0]}`, args)
  else
    await (runTask(branch))(backUpAll, `${branch.toUpperCase()}: Backing up all sites`)

  notifyDone()()
}

async function backUpAll(branch){
  const { sites }  = config[branch]

  for (const site in sites)
    await backUpSite(branch, site)
}

function getTimeParams(branch){
  const   now               = new Date()
  const   year              = now.getFullYear()
  const   month             = ('0' + (now.getMonth() + 1)).slice(-2)
  const   day               = ('0' + now.getDate()).slice(-2)
  const   hour              = now.getHours()
  const   min               = now.getMinutes()
  const   seconds           = now.getSeconds()
  const   dateTime          = `${year}-${month}-${day}-T-${hour}-${min}-${seconds}`
  const   S3_URL            = `s3://biolands/${branch}`
  const   S3_URL_YEAR_MONTH = `${S3_URL}/${year}-${month}`

  return { S3_URL, S3_URL_YEAR_MONTH, dateTime }
}

export function backUpSite(branch, site, { preDrupalUpgrade } = { preDrupalUpgrade: false }){
  const { S3_URL , S3_URL_YEAR_MONTH, dateTime } = getTimeParams(branch)
  const { isLocal                              } = config       [branch]

  backUpPathAlias(branch, site)
  execSync(`cd ${webCtx}`)

  const preDrupalUpgradeFlag = preDrupalUpgrade? '-drupal-upgrade' : ''

  execSync(`mkdir -p ${webCtx}/dumps/${site}`)
  execSync(`ddev drush "@${site}" sql:dump --structure-tables-list=cache,cache_*,watchdog --gzip --result-file="dumps/${site}/${site}-${dateTime}${preDrupalUpgradeFlag}.sql"`)
  execSync(`tar -czf "${webCtx}/dumps/${site}/${site}-${dateTime}-site${preDrupalUpgradeFlag}.tgz" "${webCtx}/sites/${site}"`)

  console.log('')
  consola.info(`${site}: dumped and files tared and gzipped`)

  if(isLocal) return //do not send to s3

  execSync(`aws s3 cp "${webCtx}/dumps/${site}/${site}-${dateTime}-site.tgz" "${S3_URL_YEAR_MONTH}/${site}/${site}-${dateTime}-site${preDrupalUpgradeFlag}.tgz"`)
  execSync(`aws s3 cp "${webCtx}/dumps/${site}/${site}-${dateTime}.sql.gz" "${S3_URL_YEAR_MONTH}/${site}/${site}-${dateTime}${preDrupalUpgradeFlag}.sql.gz"`)

  console.log('')
  consola.info(`${site}: transfered to ${S3_URL_YEAR_MONTH}/${site}/${site}-${dateTime}`)

  if(!preDrupalUpgradeFlag) execSync(`aws s3 cp "${webCtx}/dumps/${site}/${site}-${dateTime}-site.tgz" "${S3_URL}/${site}-latest-site.tgz"`)
  if(!preDrupalUpgradeFlag) execSync(`aws s3 cp "${webCtx}/dumps/${site}/${site}-${dateTime}.sql.gz" "${S3_URL}/${site}-latest.sql.gz"`)

  console.log('')
  consola.info(`${site}: transfered to ${S3_URL}}/${site}-latest-*`)

  execSync(`rm ${webCtx}/dumps/${site}/${site}-${dateTime}-site.tgz`)
  execSync(`rm ${webCtx}/dumps/${site}/${site}-${dateTime}.sql.gz`)

  consola.info(`${site}: backup files removed`)
}

function backUpPathAlias(branch, site, { preDrupalUpgrade } = { preDrupalUpgrade: false }){
  const { S3_URL_YEAR_MONTH, dateTime } = getTimeParams( branch)
  const { isLocal                     } = config        [branch]

  execSync(`cd ${webCtx}`)
  //const taxons = `taxonomy_term_data,taxonomy_term_field_data,taxonomy_term__field_cbd_country_group,taxonomy_term__field_cbd_id,taxonomy_term__field_country_cbd_guid,taxonomy_term__field_date,taxonomy_term__field_gef_id,taxonomy_term__field_image,taxonomy_term__field_image_url,taxonomy_term__field_index,taxonomy_term__field_iso3l_code,taxonomy_term__field_iso_code,taxonomy_term__field_is_un_country,taxonomy_term__field_machine_name,taxonomy_term__field_official_name,taxonomy_term__field_planning_item_type,taxonomy_term__field_protected_planet_id,taxonomy_term__field_un_number,taxonomy_term__field_un_official_short_name,taxonomy_term__field_un_region,taxonomy_term__field_url,taxonomy_term__field_www_id, taxonomy_term__parent`
  
  execSync(`mkdir -p ${webCtx}/dumps/${site}`)

  const preDUpgradeFlag = preDrupalUpgrade? '-drupal-upgrade' : ''

  execSync(`ddev drush "@${site}" sql:dump --tables-list=path_* --gzip --result-file="dumps/${site}/${site}-${dateTime}-path-alias${preDrupalUpgrade}.sql"`)
  execSync(`ddev drush "@${site}" sql:dump --tables-list=taxonomy_* --gzip --result-file="dumps/${site}/${site}-${dateTime}-taxon${preDrupalUpgrade}.sql"`)

  if(isLocal) return

  execSync(`aws s3 cp "${webCtx}/dumps/${site}/${site}-${dateTime}-path-alias.sql.gz" "${S3_URL_YEAR_MONTH}/${site}/${site}-${dateTime}-path-alias${preDrupalUpgrade}.sql.gz"`)
  execSync(`aws s3 cp "${webCtx}/dumps/${site}/${site}-${dateTime}-taxon.sql.gz" "${S3_URL_YEAR_MONTH}/${site}/${site}-${dateTime}-taxon${preDrupalUpgrade}.sql.gz"`)

  execSync(`rm ${webCtx}/dumps/${site}/${site}-${dateTime}-path-alias.sql.gz`)
  execSync(`rm ${webCtx}/dumps/${site}/${site}-${dateTime}-taxon.sql.gz`)
}

