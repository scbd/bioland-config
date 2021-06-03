import { execSync, } from 'child_process'
import { webCtx   }  from '../../util/index.mjs'
import   config      from '../../util/config.mjs'
import   consola     from 'consola'



export function blUsersPass (branch) {
  execSync(`cd ${webCtx }`)

  blUsersCBPass      (branch)
  blUsersCMPass      (branch)
  blUsersSMPass      (branch)
  blUsersSupportPass (branch)
}

export function blUserPass (branch, site) {
  execSync(`cd ${webCtx }`)

  blUserCBPass      (branch, site)
  blUserCMPass      (branch, site)
  blUserSMPass      (branch, site)
  blUserSupportPass (branch, site)
}

export function blUsers (branch) {
  execSync(`cd ${webCtx }`)

  blUsersCB          (branch)
  blUsersCBPass      (branch)
  blUsersCM          (branch)
  blUsersCMPass      (branch)
  blUsersSM          (branch)
  blUsersSMPass      (branch)
  blUsersSupport     (branch)
  blUsersSupportPass (branch) 
}

export function blUser (branch, site) {
  execSync(`cd ${webCtx }`)

  blUserCB          (branch, site)
  blUserCBPass      (branch, site)
  blUserCM          (branch, site)
  blUserCMPass      (branch, site)
  blUserSM          (branch, site)
  blUserSMPass      (branch, site)
  blUserSupport     (branch, site)
  blUserSupportPass (branch, site)
}

function blUsersCB (branch) {
  const { sites } = config[branch]

  execSync(`cd ${webCtx }`)

  for (const site in sites)
    blUserCB (branch, site)
}

function blUserCB (branch, site) {
  execSync(`cd ${webCtx }`)

  try{
    const { CB_PASS } = process.env

    execSync(`ddev drush @${site} user:create bioland-contributor --mail="bioland-contributor@chm-cbd.net" --password="${CB_PASS}" --quiet`)
    execSync(`ddev drush @${site} user:role:add "contributor" bioland-contributor@chm-cbd.net`)

    console.log('')
    consola.info(`${site}: contributor bioland-contributor@chm-cbd.net created`)
    console.log('')

  }catch(e){
      consola.error(`${site}: blUser error`, e)
  }
}

function blUsersCBPass (branch) {
  const { sites } = config[branch]

  execSync(`cd ${webCtx }`)

  for (const site in sites)
    blUserCBPass (branch, site)
}

function blUserCBPass (branch, site) {

  execSync(`cd ${webCtx }`)
  
  try{
    const { CB_PASS } = process.env

    execSync(`ddev drush @${site} user:password bioland-contributor@chm-cbd.net "${CB_PASS}" `)

    console.log('')
    consola.info(`${site}: contributor bioland-contributor@chm-cbd.net created`)
    console.log('')

  }catch(e){
    consola.error(`${site}: blUserCBPass error`, e)
  }
}

function blUsersCM (branch) {
  const { sites } = config[branch]

  execSync(`cd ${webCtx}`)

  for (const site in sites)
    blUserCM (branch, site)
}

function blUserCM (branch, site) {

  execSync(`cd ${webCtx}`)

  try{
    const { CM_PASS } = process.env

    execSync(`ddev drush @${site} user:create bioland-cm --mail="bioland-cm@chm-cbd.net" --password="${CM_PASS}" --quiet`)
    execSync(`ddev drush @${site} user:role:add "content_manager" bioland-cm@chm-cbd.net`)

    console.log('')
    consola.info(`${site}: content_manager bioland-cm@chm-cbd.net created`)
    console.log('')

  }catch(e){
    consola.error(`${site}: blUserCM error`, e)
  }
}

function blUsersCMPass (branch) {
  const { sites } = config[branch]

  execSync(`cd ${webCtx}`)

  for (const site in sites)
    blUserCMPass (branch, site)

}

function blUserCMPass (branch, site) {
  const { sites } = config[branch]

  execSync(`cd ${webCtx}`)

  try{
    const { CM_PASS } = process.env

    execSync(`ddev drush @${site} user:password bioland-cm@chm-cbd.net "${CM_PASS}" `)

    console.log('')
    consola.info(`${site}: content_manager bioland-cm@chm-cbd.net created`)
    console.log('')

  }catch(e){
    consola.error(`${site}: blUserCMPass error`, e)
  }

}


function blUsersSM (branch) {
  const { sites } = config[branch]

  execSync(`cd ${webCtx}`)

  for (const site in sites) d
    blUserSM (branch, site)
}


function blUserSM (branch, site) {

  execSync(`cd ${webCtx}`)

  try{
    const { SM_PASS } = process.env

    execSync(`ddev drush @${site} user:create bioland-sm --mail="bioland-sm@chm-cbd.net" --password="${SM_PASS}" --quiet`)
    execSync(`ddev drush @${site} user:role:add "site_manager" bioland-sm@chm-cbd.net`)

    console.log('')
    consola.info(`${site}: content_manager bioland-sm@chm-cbd.net created`)
    console.log('')

  }catch(e){
    consola.error(`${site}: blUserSM error`, e)
  }
}

function blUsersSMPass (branch) {
  const { sites } = config[branch]

  execSync(`cd ${webCtx}`)

  for (const site in sites)
    blUserSMPass (branch, site)
}

function blUserSMPass (branch, site) {
  execSync(`cd ${webCtx}`)

  try{
    const { SM_PASS } = process.env

    execSync(`ddev drush @${site} user:password bioland-sm@chm-cbd.net "${SM_PASS}" `)

    console.log('')
    consola.info(`${site}: content_manager bioland-sm@chm-cbd.net created`)
    console.log('')

  }catch(e){
    consola.error(`${site}: blUsers error`, e)
  }

}

function blUsersSupport (branch) {
  const { sites } = config[branch]
  
  execSync(`cd ${webCtx}`)

  for (const site in sites)
    blUserSupport (branch, site)
}

function blUserSupport (branch, site) {
  execSync(`cd ${webCtx}`)

  try{
    const { SUPPORT_PASS } = process.env

    execSync(`ddev drush @${site} user:create support --mail="support@chm-cbd.net" --password="${SUPPORT_PASS}" --quiet`)
    execSync(`ddev drush @${site} user:role:add "administrator" support@chm-cbd.net`)

    console.log('')
    consola.info(`${site}: administrator support@chm-cbd.net created`)
    console.log('')

  }catch(e){
    consola.error(`${site}: blUsers error`, e)
  }
}

function blUsersSupportPass (branch) {
  const { sites } = config[branch]
  
  execSync(`cd ${webCtx}`)

  for (const site in sites)
    blUserSupportPass (branch, site)
}

function blUserSupportPass (branch, site) {
  execSync(`cd ${webCtx}`)

  try{
    const { SUPPORT_PASS } = process.env

    execSync(`ddev drush @${site} user:password support@chm-cbd.net "${SUPPORT_PASS}" `)

    console.log('')
    consola.info(`${site}: administrator support@chm-cbd.net created`)
    console.log('')

  }catch(e){
    consola.error(`${site}: blUsers error`, e)
  }

}