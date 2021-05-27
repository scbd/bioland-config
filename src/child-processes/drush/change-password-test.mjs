import { changePasswordTask } from '../../tasks/drush-calls/index.mjs'

const [ name, pass ] = process.argv.slice(4)

changePasswordTask('test', { name, pass })