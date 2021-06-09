import * as Util from '../util/index.mjs'

runTaskAsChildProcess()

async function runTaskAsChildProcess(){
  const { branch,   commandArgs } = Util.getAllUserArgs()
  const [ scriptPath ]            = commandArgs

  const   taskFunction = (await import(scriptPath)).default


  taskFunction(branch, commandArgs.slice(1), { Util })
}