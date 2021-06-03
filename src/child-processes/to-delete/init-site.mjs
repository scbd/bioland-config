import   initSite                  from '../tasks/init-site.mjs'
import   createBlUsers             from '../tasks/bl-users.mjs'
import   gbifTask                  from '../tasks/gbif.mjs'
import { getBranch, getArgs } from '../util/index.mjs'

// createBlUsers(getBranch(), getArgs())

// gbifTask(getBranch(), getArgs())

initSite(getBranch(), getArgs())