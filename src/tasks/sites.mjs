import   Handlebars                from 'handlebars'
import   config                    from '../util/config.mjs'
import   fs                        from 'fs-extra'
import { readTemplate, writeFile } from '../util/files.mjs'
import { sitesCtx     }            from '../util/context.mjs'

import consola from 'consola'

const HB = Handlebars.create()

export const initSites = (branch) =>{

  const { name, sites } = config[branch]

  createSettingsCommon(branch)
  writeFile(sitesCtx, `sites.php`, getSitesPhpTemplate(name, sites))
  createSitesDirectories(branch)
}

function createSettingsCommon(branch){
  const template = HB.compile(readTemplate('settings.common.local.php').toString())

  fs.ensureFileSync(`${sitesCtx}/_common/settings.common.local.php`)

  writeFile(`${sitesCtx}/_common/`, `settings.common.local.php`, template(config[branch]))
}

function createSitesDirectories(branch){
  const { sites } = config[branch]
  const template = HB.compile(readTemplate('settings.php').toString())

  for (const code in sites) {
    fs.ensureDirSync(`${sitesCtx}/${code}`)
    fs.ensureFileSync(`${sitesCtx}/${code}/settings.php`)
    cpLogo(code, sites[code])
    writeFile(`${sitesCtx}/${code}`, `settings.php`, template({...sites[code], code}))
  }
}

function getSitesPhpTemplate(name, sites){
  let templateString = ''

  for (const code in sites) {
    for (const baseUrl of sites[code].urls) 
      templateString += `$sites["${baseUrl}"] = "${code}";\n`

    templateString += `\n`
  }

  return `<?php
${templateString}
`
}

function cpLogo(name, site){
  const logo   = site.logo? `/home/ubuntu/efs/bioland-templates/other/${site.logo}` : ''
  const flag   = `/home/ubuntu/efs/bioland-templates/other/flags/${name}.png`
  const flagTo = `${sitesCtx}/${name}/files/${name}.png`

  if(logo && fs.existsSync(logo)){
    fs.ensureDirSync(`${sitesCtx}/${name}/files`)

    return fs.copySync(logo, `${sitesCtx}/${name}/files/${site.logo}`)
  }

  else if(fs.existsSync(flag) && !fs.existsSync(flagTo))
    return fs.copySync(flag, flagTo)
}