import { execSync      , spawnSync } from 'child_process'
import { getCountries   }            from '../../../util/countries.mjs'
import   config                      from '../../../util/config.mjs'
import   patchMenuLinks              from './footer-menu-content.mjs'
import   mysql                       from 'mysql2/promise'
import consola from 'consola'

export const setBioTheme = async (branch, site) => {
  const countryMap = await getCountries()

  consola.info('site', site)
  execSync(`ddev drush @${site} sset system.maintenance_mode 0`)

  execSync(`ddev drush -y @${site} cset slick.optionset.slideshow options.settings.autoplay 1`)

  spawnSync('ddev', ['drush', '-y', `@${site}`, 'cset', 'system.site', 'name', `--value="${parse(countryMap[site].name['en'])} Biodiversity"`])
  spawnSync('ddev', ['drush', '-y', `@${site}`, 'cset', 'system.site', 'slogan', `"National Clearing House Mechanism"`])

  logo(branch, site)
  await biolandFooterLabel(branch, site)
  await countryDefaults(branch, site)
  await patchMenuLinks(branch, site)

  console.log('')
  consola.info(`${site}: Set Site: [ name/title, slogan, logo, slideshow.options, footer.label, country defaults ]`)
}


function logo(branch, site){
  const { sites }  = config[branch]
  const logoString = sites[site].logo? sites[site].logo : `https://www.chm-cbd.net/sites/default/files/images/flags/flag-${site}.png`
  const logo       = logoString.startsWith('http')? logoString : `public://${logoString}`

  execSync(`ddev drush -y @${site} cset biotheme.settings logo.path "${logo}"`)
}

async function biolandFooterLabel(branch, site){
  const { sites }  = config[branch]
  const countryMap = await getCountries()
  const isCountry  = countryMap[site]

  if(!isCountry) return

  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', 'block.block.biolandfooterbiolandlinks', 'settings.label', `"${parse(countryMap[site].name['en'])}"`])

  for (const lang of sites[site].locales)
    if(lang !== 'en')
      spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `language.${lang}:block.block.biolandfooterbiolandlinks`, 'settings.label', `"${parse(countryMap[site].name[lang])}"`])

}

async function countryDefaults(branch, site){
  const uuid = await getDrupalCountryId(branch, site)

  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.news.field_countries`, 'dependencies.content.0', `taxonomy_term:countries:${uuid}`])
  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.news.field_countries`, 'default_value.0', {"target_uuid":`"${uuid}"`}])

  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.event.field_countries`, 'dependencies.content.0', `taxonomy_term:countries:${uuid}`])
  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.event.field_countries`, 'default_value.0', {"target_uuid":`"${uuid}"`}])

  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.project.field_countries`, 'dependencies.content.0', `taxonomy_term:countries:${uuid}`])
  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.project.field_countries`, 'default_value.0', {"target_uuid":`"${uuid}"`}])

  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.organization.field_countries`, 'dependencies.content.0', `taxonomy_term:countries:${uuid}`])
  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.organization.field_countries`, 'default_value.0', {"target_uuid":`"${uuid}"`}])

  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.document.field_countries`, 'dependencies.content.0', `taxonomy_term:countries:${uuid}`])
  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.document.field_countries`, 'default_value.0', {"target_uuid":`"${uuid}"`}])

  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.link.field_countries`, 'dependencies.content.0', `taxonomy_term:countries:${uuid}`])
  spawnSync('ddev',['drush', '-y', `@${site}`, 'cset', `field.field.node.link.field_countries`, 'default_value.0', {"target_uuid":`"${uuid}"`}])
}

async function getDrupalCountryId(branch, database){
  const { DB_USER:user, DB_PASS:password, DB_HOST:host } = process.env
  const   countryMap         = await getCountries()
  const   countryName        =       countryMap  [database].name['en']
  const { hostDbPort :port } =       config      [branch]

  // create the connection
  const connection = await mysql.createConnection({ host, user, password, database,  port});
  const query      = ' SELECT `uuid` FROM `taxonomy_term_field_data` JOIN `taxonomy_term_data` ON taxonomy_term_field_data.tid = taxonomy_term_data.tid WHERE `name` = ? ;'

  // query database
  const [ rows ] = await connection.execute(query, [countryName]);
  const { uuid } = rows[0]
  
  connection.destroy()
  return uuid
}

function parse(s){ return s.replaceAll("'",'\\`') }