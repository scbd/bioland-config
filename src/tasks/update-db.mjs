import { notifyDone   , runTask } from '../util/cli-feedback.mjs'
import { execSync      }          from 'child_process'
import { webCtx        }          from '../util/context.mjs'
import { replaceInFile }          from '../util/files.mjs'
import   config                   from '../util/config.mjs'
import   consola                  from 'consola'
import   mysql                       from 'mysql2/promise'
import {  backUpSite } from './back-up.mjs'

export default async(branch, args) => {
  if(args.length)
    await (runTask(branch))(updateSite, `${branch.toUpperCase()}: drupal update db site: ${args[0]}`, args)
  else
    await (runTask(branch))(updateAll, `${branch.toUpperCase()}: drupal update db ALL sites`)

  notifyDone()()
  process.exit(0)
}

async function updateAll(branch) {
  const { sites } = config[branch]

  for (const site in sites)
    await updateSite(branch, site)
}

async function updateSite(branch, site) {
  try{
    execSync(`cd ${webCtx}`)
    
    console.log('')
    consola.info(`${branch.toUpperCase()} Site: ${site} -> updating db to new drupal`)

    execSync(`ddev drush @${site} sset system.maintenance_mode 1`)

    await backUpSite(branch, site, { preDrupalUpgrade: true })
    // await preUpgrade(branch, site)

    patchDrupal()
    patchDrupal01()
    patchDrupal02()

    execSync(`ddev drush -y @${site} updatedb -vvv`)

    // execSync(`aws s3 cp "s3://biolands/${branch}/${site}-latest-subqueue-drupal-upgrade.sql.gz" "/home/ubuntu/efs/tmp/${site}-latest-subqueue-drupal-upgrade.sql.gz" `)
    // execSync(`if test -f "/home/ubuntu/efs/tmp/${site}-latest-subqueue-drupal-upgrade.sql.gz"; then gunzip /home/ubuntu/efs/tmp/${site}-latest-subqueue-drupal-upgrade.sql.gz; fi;`)
    // execSync(`ddev drush @${site} sql:cli < /home/ubuntu/efs/tmp/${site}-latest-subqueue-drupal-upgrade.sql`)
    // execSync(`rm /home/ubuntu/efs/tmp/${site}-latest-subqueue-drupal-upgrade.sql`)

    execSync(`ddev drush -y @${site} cr`)
    
    console.log('')
    consola.info(`${site}: site updated`)

    execSync(`ddev drush @${site} sset system.maintenance_mode 0`)
  }catch(e){
    consola.error(`${site}: update error`, e)
  }
}

// fix AH01071 below
function patchDrupal(){
  const fileName     = '/web/core/lib/Drupal/Core/Entity/ContentEntityBase.php'
  const replaceCode  = 'if (!$this->getFieldDefinition($field_name)->isTranslatable()) {'
  const patchCode    = 'if ($this->getFieldDefinition($field_name) && !$this->getFieldDefinition($field_name)->isTranslatable()) {'

  replaceInFile(fileName, replaceCode, patchCode)
}

function patchDrupal01(){
  const fileName     = '/web/core/lib/Drupal/Core/Entity/Entity/EntityViewDisplay.php'
  const replaceCode  = '$view_langcode = $entity->language()->getId();'
  const patchCode    = '$view_langcode = ($entity->language() ? $entity->language()->getId() : NULL);'

  replaceInFile(fileName, replaceCode, patchCode)
}

function patchDrupal02(){
  const fileName     = '/web/core/lib/Drupal/Core/Entity/EntityAccessControlHandler.php'
  const replaceCode  = '$langcode = $entity->language()->getId();'
  const patchCode    = '$langcode = ($entity->language() ? $entity->language()->getId() : NULL);'

  replaceInFile(fileName, replaceCode, patchCode)
}

async function preUpgrade(branch, database){
  const { DB_USER:user, DB_PASS:password, DB_HOST:host } = process.env
  const { hostDbPort :port }                             = config[branch]

  const connection = await mysql.createConnection({ host, user, password, database,  port});

  // create the connection tmp_42864

  // const query2      = `SELECT CONCAT('DROP TABLE', TABLE_SCHEMA, '.', TABLE_NAME, ';') from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE 'tmp_42864%' AND TABLE_SCHEMA = ?;`
  

  // await connection.execute(query2, [database]);



  const query      = `SELECT CONCAT('DROP TABLE', TABLE_SCHEMA, '.', TABLE_NAME, ';') from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE 'entity_subqueu%' AND TABLE_SCHEMA = ?;`

  await connection.execute(query, [database]);



  // const query2      = `SELECT CONCAT('TRUNCATE TABLE', TABLE_SCHEMA, '.', TABLE_NAME, ';') from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE 'path%' AND TABLE_SCHEMA = ?;`
  
  // connection.execute(query2, [database]);

  // await connection.execute(query, [database]);

  // const connection = await mysql.createConnection({ host, user, password, database,  port});

  // const query      = `SELECT CONCAT('TRUNCATE TABLE', TABLE_SCHEMA, '.', TABLE_NAME, ';') from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE 'taxonomy%' AND TABLE_SCHEMA = ?;`

  // await connection.execute(query, [database]);

  return connection.destroy()
}