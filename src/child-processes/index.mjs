import { getAllUserArgs } from '../util/index.mjs'
import consola from 'consola'
runTaskAsChildProcess()

async function runTaskAsChildProcess(){
  const { commandParamCase, branch, commandArgs } = getAllUserArgs()

  consola.error('---------------',{ commandParamCase, branch, commandArgs })
  const   taskFunction                            = (await import(`../tasks/${commandParamCase}.mjs`)).default

  taskFunction(branch, commandArgs)
}