import { roleTask } from '../../tasks/drush-calls/index.mjs'

const [ email, roles ] = process.argv.slice(4)

roleTask('prod', {email, roles})