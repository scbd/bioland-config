import { notifyDone        , runTask } from '../util/cli-feedback.mjs'
import { initDdevConfig              } from './ddev-config.mjs'
import { initDrushConfig             } from './not-user-commands/drush-config.mjs'
import { initSites                   } from './not-user-commands/sites.mjs'
import { initDockerOverride          } from './docker-override.mjs'
import { initDns                     } from './dns-update.mjs'

export default async (branch) => {

  await (runTask(branch))(initDdevConfig,     'writeDdevConfig')
  await (runTask(branch))(initDrushConfig,    'initDrushConfig')
  await (runTask(branch))(initSites,          'initSites')
  await (runTask(branch))(initDockerOverride, 'initDockerOverride')
  await (runTask(branch))(initDns,            'initDns')
  
  notifyDone(isForkedProcess)()
}