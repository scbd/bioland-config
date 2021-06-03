
import   Handlebars                from 'handlebars'
import   config                    from '../../util/config.mjs'
import { readTemplate, writeFile } from '../../util/files.mjs'
import { ddev         }            from '../../util/context.mjs'

const HB = Handlebars.create()
export const writeDdevConfig = (branch) => {
  const template = HB.compile(readTemplate('config.yaml').toString())

  writeFile(ddev, 'config.yaml', template(config[branch]))
}

export const writeDdevMultiConfig = (branch) => {
  const template = HB.compile(readTemplate('config.multisite.yaml').toString())

  writeFile(ddev, 'config.multisite.yaml', template(config[branch]))
}

export const initDdevConfig = (branch)=>{
  writeDdevConfig(branch)
  writeDdevMultiConfig(branch)
}