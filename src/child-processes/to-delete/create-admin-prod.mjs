import { createAdminTask } from '../../tasks/drush-calls/index.mjs'

const [ name, email, pass ] = process.argv.slice(4)

createAdminTask('prod', {name, email, pass})