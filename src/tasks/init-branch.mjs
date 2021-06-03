import { notifyDone        , runTask } from '../util/cli-feedback.mjs'
import { initDdevConfig              } from './not-user-commands/ddev-config.mjs'
import { initDrushConfig             } from './not-user-commands/drush-config.mjs'
import { initSites                   } from './not-user-commands/sites.mjs'
import { initDockerOverride          } from './not-user-commands/docker-override.mjs'
import { initDns                     } from './not-user-commands/dns-update.mjs'

export default async (branch) => {

  await (runTask(branch))(initDdevConfig,     'writeDdevConfig')
  await (runTask(branch))(initDrushConfig,    'initDrushConfig')
  await (runTask(branch))(initSites,          'initSites')
  await (runTask(branch))(initDockerOverride, 'initDockerOverride')
  await (runTask(branch))(initDns,            'initDns')
  
  notifyDone()()
}