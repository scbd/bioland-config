import { createUserTask } from '../../tasks/drush-calls/index.mjs'

const [ name, email, pass ] = process.argv.slice(4)

createUserTask('prod', {name, email, pass})