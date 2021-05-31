#!/usr/bin/env node
import { fork } from 'child_process'
import changeCase from 'change-case'
import { startFeedback, endFeedback, startTaskInfo, endTaskInfo, taskError } from '../src/util/cli-feedback.mjs'
import { getBranch } from '../src/child-processes/util.mjs' 
import { context } from  '../src/util/context.mjs'
import { resolve } from 'path'
import consola from 'consola'
const commands = [ 'init','bk', 'bkSite', 'initTest', 'getDomains', 'getDomainsTest', 'getBaseDomains', 'settingsCarouselTest', 'createAdmin', 'createAdminTest', 'createUser', 'createUserTest', 'password', 'passwordTest', 'cache', 'cacheTest', 'update', 'updateTest', 'gbif', 'gbifTest', 'role', 'roleTest', 'blUsers', 'blUsersTest', 'blConfigDefault','blConfigDefaultTest']
const src      = resolve(context, 'node_modules/bioland-config/src/')



runCommand()

function runCommand(){

  const theCommand = getCommand()

  startFeedback(`BIOLAND-CONFIG: ${getBranch(true).toUpperCase()} => ${theCommand}`)

  runChildProcess(theCommand)
}

function runChildProcess(theCommand){
  let scriptPathToFork = ''

  if(theCommand === 'createBranch')         scriptPathToFork = `${src}/child-processes/create-branch.mjs`
  if(theCommand === 'initBranch')           scriptPathToFork = `${src}/child-processes/init-branch.mjs`
  if(theCommand === 'iniSite')              scriptPathToFork = `${src}/child-processes/init-site.mjs`
  if(theCommand === 'bk')                   scriptPathToFork = `${src}/child-processes/bk.mjs`
  if(theCommand === 'bkSite')               scriptPathToFork = `${src}/child-processes/bk-site.mjs`

  if(theCommand === 'init')                 scriptPathToFork = `${src}/child-processes/init.mjs`
  if(theCommand === 'initTest')             scriptPathToFork = `${src}/child-processes/initTest.mjs`

  if(theCommand === 'getDomains')           scriptPathToFork = `${src}/child-processes/getDomains.mjs`
  if(theCommand === 'getDomainsTest')       scriptPathToFork = `${src}/child-processes/getDomainsTest.mjs`

  if(theCommand === 'getBaseDomains')       scriptPathToFork = `${src}/child-processes/getBaseDomains.mjs`
  if(theCommand === 'getBaseDomainsTest')   scriptPathToFork = `${src}/child-processes/getBaseDomainsTest.mjs`

  if(theCommand === 'createAdminTest')      scriptPathToFork = `${src}/child-processes/drush/create-admin-test.mjs`
  if(theCommand === 'createAdmin')          scriptPathToFork = `${src}/child-processes/drush/create-admin-prod.mjs`

  if(theCommand === 'createUserTest')       scriptPathToFork = `${src}/child-processes/drush/create-user-test.mjs`
  if(theCommand === 'createUser')           scriptPathToFork = `${src}/child-processes/drush/create-user-prod.mjs`

  if(theCommand === 'passwordTest')         scriptPathToFork = `${src}/child-processes/drush/change-password-test.mjs`
  if(theCommand === 'password')             scriptPathToFork = `${src}/child-processes/drush/change-password-prod.mjs`

  if(theCommand === 'cacheTest')            scriptPathToFork = `${src}/child-processes/drush/cache-test.mjs`
  if(theCommand === 'cache')                scriptPathToFork = `${src}/child-processes/drush/cache-prod.mjs`

  if(theCommand === 'update')               scriptPathToFork = `${src}/child-processes/drush/update-task-prod.mjs`
  if(theCommand === 'updateTest')           scriptPathToFork = `${src}/child-processes/drush/update-task-test.mjs`

  if(theCommand === 'gbif')                 scriptPathToFork = `${src}/child-processes/drush/gbif-prod.mjs` 
  if(theCommand === 'gbifTest')             scriptPathToFork = `${src}/child-processes/drush/gbif-test.mjs`

  if(theCommand === 'role')                 scriptPathToFork =   `${src}/child-processes/drush/role-prod.mjs`
  if(theCommand === 'roleTest')             scriptPathToFork = `${src}/child-processes/drush/role-test.mjs`

  if(theCommand === 'blUsers')              scriptPathToFork =   `${src}/child-processes/drush/bl-users-prod.mjs`
  if(theCommand === 'blUsersTest')          scriptPathToFork = `${src}/child-processes/drush/bl-users-test.mjs`

  if(theCommand === 'blConfigDefault')      scriptPathToFork =   `${src}/child-processes/drush/bl-config-default-prod.mjs`
  if(theCommand === 'blConfigDefaultTest')  scriptPathToFork = `${src}/child-processes/drush/bl-config-default-test.mjs`

  if(scriptPathToFork) return forkScript(scriptPathToFork)
}

function forkScript(scriptPathToFork){
  const { DEBUG } = process.env
  const   env     = { ...process.env, BL_CONFIG_CONTEXT: context }
  const   argv    =  process.argv.slice(2)
  const   options = { cwd: context, env }

  if(DEBUG) options.stdio = 'inherit'

  const forked = fork(scriptPathToFork, ['--trace-warnings', ...argv ], options)

  initChildProcessApi(forked)
}

function initChildProcessApi(forked){
  let toggle = true
  let done   = false

  forked.on('message', (text) => {
    if(done) return //do nothing else if done

    if(text === 'done'){ //child tells parent they are done
      done = true
      return endFeedback()
    }

    //child can only tell parent it is starting or ending a task
    if(toggle){ //starting task named text
      startTaskInfo(text)
      toggle = !toggle
      return
    }
    //ending task named text
    endTaskInfo(text)
    toggle = !toggle
  })

  forked.on('error', (error) => {
    taskError(error)
    done = true
    throw error
  })
}

function getCommand(){
  const theCommandOne = process.argv[2]? changeCase.camelCase(process.argv[2]) : ''
  const theCommandTwo = process.argv[3]? changeCase.camelCase(process.argv[3]) : ''

  if(isValidCommand(theCommandOne)) return theCommandOne

  if(isValidCommand(theCommandTwo)) return theCommandTwo
  
  throw new Error(`bioland-config: ${theCommand} or ${theCommandTwo} command passed not valid`)
}


function isValidCommand(theCommand){
  if (commands.includes(theCommand)) return true

  return false
}