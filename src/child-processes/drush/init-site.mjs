import { initSite } from '../../tasks/drush-calls/index.mjs'

const [ name, email, pass ] = process.argv.slice(4)

initSite('test', {name, email, pass})