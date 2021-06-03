import   Handlebars                from 'handlebars'
import   config                    from '../../util/config.mjs'
import { readTemplate, writeFile } from '../../util/files.mjs'
import { ddev                    } from '../../util/context.mjs'

const HB = Handlebars.create()

export const initDockerOverride = (branch)=>{
  const template = HB.compile(readTemplate('docker-compose.override.yml').toString())

  writeFile(ddev, 'docker-compose.override.yml', template(config[branch]))
}