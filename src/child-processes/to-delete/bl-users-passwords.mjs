import { blUserPassTask  } from '../tasks/bl-users.mjs'
import { getBranch, getArgs } from '../util/index.mjs'

blUserPassTask (getBranch(), getArgs())