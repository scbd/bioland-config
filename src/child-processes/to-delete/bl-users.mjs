import createBlUsers from '../tasks/bl-users.mjs'
import { getBranch, getArgs } from '../util/index.mjs'

createBlUsers(getBranch(), getArgs())