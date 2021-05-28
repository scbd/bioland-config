import { notifyDone, runTask } from '../../util/cli-feedback.mjs'
import { execSync   }          from 'child_process'
import   config                from '../../util/config.mjs'
import { replaceInFile } from '../../util/files.mjs'
import { parse } from 'shell-quote'
import consola from 'consola'
import request from 'superagent'

export const createAdminTask = async(branch, { email, pass, name }) => {
  await (runTask(branch))(createAdmin, `Creating Admin User ${email}`, [{ email, pass, name }])
  
  notifyDone()()
}

export const createUserTask = async(branch, { email, pass, name }) => {
  await (runTask(branch))(createUser, `Creating User ${email}`, [{ email, pass, name }])
  
  notifyDone()()
}

export const changePasswordTask = async(branch, { pass, name }) => {
  await (runTask(branch))(changePassword , `Changing password for user: ${email}`, [{ pass, name }])
  
  notifyDone()()
}

export const cacheTask = async(branch) => {
  await (runTask(branch))(cacheRebuild , `Rebuilding caches: `)
  
  notifyDone()()
}

export const roleTask = async(branch, { email, roles }) => {
  await (runTask(branch))(role, `Adding role for user: ${email}`, [{ email, roles  }])
  
  notifyDone()()
}

export const gbifTask = async(branch) => {
  await (runTask(branch))(gbif, `enable gbif module`)
  
  notifyDone()()
}

export const updateTask = async(branch) => {
  await (runTask(branch))(update, `upgrade drupal`)
  
  notifyDone()()
}

export const  blUsersTask = async(branch) => {
  await (runTask(branch))(blUsers, `creating bioland users`)
  
  notifyDone()()
}

export const blConfigDefaultTask = async(branch) => {
  await (runTask(branch))(blConfigDefault, `bioland default config`)
  
  notifyDone()()
}

// ddev drush -y @acb cset slick.optionset.slideshow options.settings.autoplay 1
// TODO sql bioland---footer---bioland- update country codes
async function blConfigDefault(branch){ 
  const countryMap = await getCountries()

  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try {
      const logo = sites[site].logo? sites[site].logo : `${site}.png`

      execSync(`ddev drush -y @${site} cset slick.optionset.slideshow options.settings.autoplay 1`)
      execSync(`ddev drush -y @${site} cset biotheme.settings logo.path "public://${logo}"`)

      if(countryMap[site])
        execSync(`ddev drush -y @${site} cset biotheme.settings block.block.biolandfooterbiolandlinks.settings.label "'${parse(countryMap[site].name[sites[site].locale])}'"`)
    }
    catch(e){
      consola.error(`${site}:  blConfigDefault`, e)
    }
  }
}

async function getCountries(){
  const data = await request.get('https://api.cbd.int/api/v2015/countries/')
                      .then(({ body }) => body)

  const cMap = {}

  for (const aCountry of data) {
    cMap[aCountry.code.toLowerCase()] = aCountry
  }

  return cMap
}

function blUsers (branch) {
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  blUserCB (branch)
  blUserCBPass (branch)
  blUserCM(branch)
  blUserCMPass(branch)
  blUserSM(branch)
  blUserSMPass(branch)
  blUserSupport(branch)
  blUserSupportPass(branch) 
}

function blUserCB (branch) {
  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      const { CB_PASS, CM_PASS, SM_PASS, SUPPORT_PASS } = process.env

      execSync(`ddev drush @${site} user:create bioland-contributor --mail="bioland-contributor@chm-cbd.net" --password="${CB_PASS}" `)
      execSync(`ddev drush @${site} user:role:add "contributor" bioland-contributor@chm-cbd.net`)

      console.log('')
      consola.info(`${site}: contributor bioland-contributor@chm-cbd.net created`)
      console.log('')

    }catch(e){
      consola.error(`${site}: blUsers error`, e)
    }
  }
}
function blUserCBPass (branch) {
  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      const { CB_PASS, CM_PASS, SM_PASS, SUPPORT_PASS } = process.env

      execSync(`ddev drush @${site} user:password bioland-contributor@chm-cbd.net "${CB_PASS}" `)

      console.log('')
      consola.info(`${site}: contributor bioland-contributor@chm-cbd.net created`)
      console.log('')

    }catch(e){
      consola.error(`${site}: blUsers error`, e)
    }
  }
}

function blUserCM (branch) {
  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      const { CB_PASS, CM_PASS, SM_PASS, SUPPORT_PASS } = process.env

      execSync(`ddev drush @${site} user:create bioland-cm --mail="bioland-cm@chm-cbd.net" --password="${CM_PASS}" `)
      execSync(`ddev drush @${site} user:role:add "content_manager" bioland-cm@chm-cbd.net`)

      console.log('')
      consola.info(`${site}: content_manager bioland-cm@chm-cbd.net created`)
      console.log('')

    }catch(e){
      consola.error(`${site}: blUsers error`, e)
    }
  }
}

function blUserCMPass (branch) {
  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      const { CB_PASS, CM_PASS, SM_PASS, SUPPORT_PASS } = process.env

      execSync(`ddev drush @${site} user:password bioland-cm@chm-cbd.net "${CM_PASS}" `)

      console.log('')
      consola.info(`${site}: content_manager bioland-cm@chm-cbd.net created`)
      console.log('')

    }catch(e){
      consola.error(`${site}: blUsers error`, e)
    }
  }
}

function blUserSM (branch) {
  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      const { CB_PASS, CM_PASS, SM_PASS, SUPPORT_PASS } = process.env

      execSync(`ddev drush @${site} user:create bioland-sm --mail="bioland-sm@chm-cbd.net" --password="${SM_PASS}" `)
      execSync(`ddev drush @${site} user:role:add "site_manager" bioland-sm@chm-cbd.net`)

      console.log('')
      consola.info(`${site}: content_manager bioland-sm@chm-cbd.net created`)
      console.log('')

    }catch(e){
      consola.error(`${site}: blUsers error`, e)
    }
  }
}

function blUserSMPass (branch) {
  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      const { CB_PASS, CM_PASS, SM_PASS, SUPPORT_PASS } = process.env

      execSync(`ddev drush @${site} user:password bioland-sm@chm-cbd.net "${SM_PASS}" `)

      console.log('')
      consola.info(`${site}: content_manager bioland-sm@chm-cbd.net created`)
      console.log('')

    }catch(e){
      consola.error(`${site}: blUsers error`, e)
    }
  }
}

function blUserSupport (branch) {
  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      const { CB_PASS, CM_PASS, SM_PASS, SUPPORT_PASS } = process.env

      execSync(`ddev drush @${site} user:create support --mail="support@chm-cbd.net" --password="${SUPPORT_PASS}" `)
      execSync(`ddev drush @${site} user:role:add "administrator" support@chm-cbd.net`)

      console.log('')
      consola.info(`${site}: administrator support@chm-cbd.net created`)
      console.log('')

    }catch(e){
      consola.error(`${site}: blUsers error`, e)
    }
  }
}

function blUserSupportPass (branch) {
  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      const { CB_PASS, CM_PASS, SM_PASS, SUPPORT_PASS } = process.env

      execSync(`ddev drush @${site} user:password support@chm-cbd.net "${SUPPORT_PASS}" `)

      console.log('')
      consola.info(`${site}: administrator support@chm-cbd.net created`)
      console.log('')

    }catch(e){
      consola.error(`${site}: blUsers error`, e)
    }
  }
}

function createAdmin (branch, { email, pass, name }) {
  const { sites } = config[branch]
  const homeDir  = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      execSync(`ddev drush @${site} user:create ${name} --mail="${email}" --password="${pass}" `)
      execSync(`ddev drush @${site} user:role:add "administrator" ${email}`)

      console.log('')
      consola.info(`${site}: administrator ${email} created`)
      console.log('')
    }catch(e){
      consola.warn(`${site}: administrator ${email} exists`)
      execSync(`ddev drush @${site} user:role:add "administrator" ${email}`)
      consola.warn(`${site}: administrator role added to ${email}`)
    }
  }

}

function createUser (branch, { email, pass, name }) {
  const { sites } = config[branch]
  const homeDir   = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome  = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      execSync(`ddev drush @${site} user:create ${name} --mail="${email}" --password="${pass}" `)

      console.log('')
      consola.info(`${site}: user ${email} created`)
    }catch(e){
      consola.warn(`${site}: user ${email} exists`)
    }
  }
}

function changePassword (branch, { pass, name }) {
  const { sites } = config[branch]
  const homeDir   = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome  = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      execSync(`ddev drush @${site} user:password ${name} "${pass}" `)

      console.log('')
      consola.info(`${site}: change password for user ${name}`)
    }catch(e){
      consola.error(`${site}: change password for user ${name}`, e)
    }
  }
}

function role (branch, { email, roles }) {
  const { sites } = config[branch]
  const homeDir   = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome  = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      execSync(`ddev drush @${site} user:role:add "${roles}" ${email}`)

      console.log('')
      consola.info(`${site}: change role for user ${email} ${roles}`)
    }catch(e){
      consola.error(`${site}: change role for user ${email} ${roles}`, e)
    }
  }
}

function cacheRebuild (branch) {
  const { sites } = config[branch]
  const homeDir   = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome  = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      execSync(`ddev drush @${site} cr`)

      console.log('')
      consola.info(`${site}: cache rebuilt`)
    }catch(e){
      consola.error(`${site}: cache rebuild error`, e)
    }
  }
}

function gbif(branch) {
  const { sites } = config[branch]
  const homeDir   = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome  = `${homeDir}/web`

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      execSync(`ddev drush -y @${site} en gbifstats`)
      execSync(`ddev drush @${site} role-add-perm "anonymous" "'view GBIF Stats'"`)
      execSync(`ddev drush @${site} role-add-perm "authenticated" "'view GBIF Stats'"`)
      execSync(`ddev drush @${site} role-add-perm "content_manager" "'configure GBIF Stats','generate GBIF Stats'"`)
      execSync(`ddev drush @${site} role-add-perm "site_manager" "'generate GBIF Stats','configure GBIF Stats','generate GBIF Stats'"`) 
      execSync(`chromium-browser --headless --no-sandbox --verbose  --incognito  --ignore-certificate-errors --ignore-ssl-errors $(ddev drush @${site} user:login --mail=randy.houlahan@cbd.int /gbifstats/generate/${site.toUpperCase()})`)
      
      console.log('')
      consola.info(`${site}: cache rebuilt`)
    }catch(e){
      consola.error(`${site}: cache rebuild error`, e)
    }
  }
}

function update(branch) {
  const { sites } = config[branch]
  const homeDir   = process.env.BL_HOME? process.env.BL_HOME : `/home/ubuntu/${branch}`
  const siteHome  = `${homeDir}/web`

  patchDrupal()

  execSync(`cd ${siteHome}`)

  for (const site in sites) {
    try{
      execSync(`ddev drush -y @${site} updatedb -vvv`)

      console.log('')
      consola.info(`${site}: cache rebuilt`)
    }catch(e){
      consola.error(`${site}: cache rebuild error`, e)
    }
  }
}

// fix AH01071 below
function patchDrupal(){
  const fileName    = '/web/core/lib/Drupal/Core/Entity/ContentEntityBase.php'
  const replaceCode = 'if (!$this->getFieldDefinition($field_name)->isTranslatable()) {'
  const patchCode    = 'if ($this->getFieldDefinition($field_name) && !$this->getFieldDefinition($field_name)->isTranslatable()) {'


  replaceInFile(fileName, replaceCode, patchCode)
}

// AH01071: Got error 'PHP message: Error: Call to a member function isTranslatable() on null in /var/www/html/web/core/lib/Drupal/Core/Entity/ContentEntityBase.php on line 211 #0 /var/www/html/web/core/lib/Drupal/Core/Entity/Sql/SqlContentEntityStorage.php(530): Drupal\\Core\\Entity\\ContentEntityBase->__construct(Array, 'entity_subqueue', 'slideshow', Array)\n#1 /var/www/html/web/core/lib/Drupal/Core/Entity/Sql/SqlContentEntityStorage.php(449): Drupal\\Core\\Entity\\Sql\\SqlContentEntityStorage->mapFromStorageRecords(Array)\n#2 /var/www/html/web/core/lib/Drupal/Core/Entity/Sql/SqlContentEntityStorage.php(415): Drupal\\Core\\Entity\\Sql\\SqlContentEntityStorage->getFromStorage(Array)\n#3 /var/www/html/web/core/lib/Drupal/Core/Entity/EntityStorageBase.php(300): Drupal\\Core\\Entity\\Sql\\SqlContentEntityStorage->doLoadMultiple(Array)\n#4 /var/www/html/web/core/modules/views/src/Plugin/views/query/Sql.php(1610): Drupal\\Core\\Entity\\EntityStorageBase->loadMultiple(Array)\n#5 /var/www/html/web/core/modules/views/src/Plugin/views/query/Sql.php(...'