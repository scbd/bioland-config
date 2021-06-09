import { getAllUserArgs } from '../util/index.mjs'

runTaskAsChildProcess()

async function runTaskAsChildProcess(){
  const { commandParamCase, branch, commandArgs } = getAllUserArgs()

  console.error('---------------',{ commandParamCase, branch, commandArgs })
  const   taskFunction                            = (await import(`../tasks/${commandParamCase}.mjs`)).default

  taskFunction(branch, commandArgs)
}