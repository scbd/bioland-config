import { notifyDone, runTask } from '../util/cli-feedback.mjs'
import { blUser    , blUsers } from './not-user-commands/bl-users.mjs'

export default async(branch, args) => {
  if(args.length)
    await (runTask(branch))(blUser, `${branch.toUpperCase()}: creating bioland users site:${args}`, args)
  else
    await (runTask(branch))(blUsers, `${branch.toUpperCase()}: creating bioland users for All sites`)
    
  notifyDone()()
}