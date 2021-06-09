import   SA                    from 'superagent'
import { spawnSync, execSync } from 'child_process'
import   config                from './config.mjs'
import consola from 'consola'
const $http  = SA.agent()
const global = { enabled: false }

export async function login (branch, site){
  try{
    if(!global.enabled || global.enabled !== site) enableJsonApi(site)

    if(global.$http) return global.$http

    const host = getHost(branch, site)

    const { SUPPORT_PASS:pass } = process.env
    const   name                = 'support@chm-cbd.net'
    const   uri                 = `${host}/user/login?_format=json`

    const { body } = await $http.post(uri)
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify({ name, pass }))

    const { csrf_token } = body

    $http.set('X-CSRF-Token', csrf_token)

    global.$http = $http

    return $http
  }
  catch(e){
    consola.error('DrupalAuth.login: ', e)
    consola.error(e)
    return false
  }
}

export async function patchMenuUri(branch, site, id, uri){
  const request = await login(branch, site)
  const host    = getHost(branch, site)
  const data    = { data: { type: "menu_link_content--menu_link_content", id, attributes: { link: { uri  } } } }
  
  return request.patch(`${host}/jsonapi/menu_link_content/menu_link_content/${id}`)
                  .set('Content-Type', 'application/vnd.api+json')
                  .send(JSON.stringify(data))
}

export async function deleteMenu(branch, site, id){
  const request = await login(branch, site)
  const host    = getHost(branch, site)

  
  return request.delete(`${host}/jsonapi/menu_link_content/menu_link_content/${id}`)
                  .set('Content-Type', 'application/vnd.api+json')

}

export function enableJsonApi(site){
  global.$http = undefined

  spawnSync('ddev', [ 'drush', '-y', `@${site}`, 'en', 'jsonapi' ])

  spawnSync('ddev', [ 'drush', '-y', `@${site}`, 'cset', 'jsonapi.settings', 'read_only', `--format=boolean`, `--value=0` ])
  consola.error('jsonapi.settings')
  execSync(`ddev drush @${site} cr`)

  global.enabled = site
}

export function disableJsonApi(site){

  spawnSync('ddev', [ 'drush', '-y', `@${site}`, 'cset', 'jsonapi.settings', 'read_only', `--format=boolean`, `--value=1` ])
  spawnSync('ddev', [ 'drush', '-y', `@${site}`, 'pm:uninstall', 'jsonapi' ])

  execSync(`ddev drush @${site} cr`)

  global.enabled = false
  global.$http = undefined
}

function getHost(branch, site){
  const { sites } = config[branch]
  const { host  } = sites [site]

  return host
}