import Handlebars from 'handlebars'
import config     from '../util/config.mjs'
import { readTemplate, writeFile } from '../util/files.mjs'
import { drushSites                        } from '../util/context.mjs'

const HB = Handlebars.create()

export const initDrushConfig = (branch)=>{
  const template = HB.compile(readTemplate('drush.site.yml').toString())

  const { sites } = config[branch]

  for (const code in sites)
    writeFile(drushSites, `${code}.site.yml`, template(sites[code]))

}