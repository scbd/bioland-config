import { notifyDone , runTask     } from '../util/cli-feedback.mjs'
import { blUserPass , blUsersPass } from './not-user-commands/bl-users.mjs'

export default async(branch, args) => {
  if(args.length)
    await (runTask(branch))(blUserPass, `${branch.toUpperCase()}: changing bioland users passwords site:${args}`, args)
  else
    await (runTask(branch))(blUsersPass, `${branch.toUpperCase()}: changing bioland users passwords for all sites`)

  notifyDone()()
}