import changeCase from 'change-case'
import consola from 'consola'

const   generalCommands   = [ 'backUp', 'cache',  'initBranch', 'updateDb', 'maintenanceModeOn', 'maintenanceModeOff', 'custom' ] //'createBranch',
const   biolandCommands   = [ 'initSite', 'gbif', 'blUsers', 'blUsersPasswords', 'loadDemoData', 'loadLatestData' ]
const   commands          = [ ...generalCommands, ...biolandCommands ]
const   branches          = [ 'prod', 'test', 'demo' ]
const { INIT_CWD        } = process.env

export const getAllUserArgs = () => {
  const command          = getCommand()
  const commandParamCase = getCommand({ paramCase: true })
  const branch           = getBranch()
  const commandArgs      = getArgs()

  return { command, commandParamCase, branch, commandArgs } 
}
export function getCommand({ paramCase } = { paramCase:false }){
  const hasTraceWarningsArg = process.argv.includes('--trace-warnings')
  const startIndex          = hasTraceWarningsArg? 3 : 2
  const theCommandOne       = process.argv[startIndex]  ? changeCase.camelCase(process.argv[ startIndex ])   : ''
  const theCommandTwo       = process.argv[startIndex+1]? changeCase.camelCase(process.argv[ startIndex+1 ]) : ''

  if(isValidCommand(theCommandOne)) return paramCase? changeCase.paramCase(theCommandOne) : theCommandOne
  if(isValidCommand(theCommandTwo)) return paramCase? changeCase.paramCase(theCommandTwo) : theCommandTwo
  
  throw new Error(`bioland-config: ${theCommandOne} or ${theCommandTwo} command passed not valid`)
}

export const getBranch = (alt=false)=>{

  const cwdBranch   = getBranchFromPath()
  const propsBranch = getBranchFromProps(alt)


  if(cwdBranch ) return cwdBranch

  if(propsBranch) return propsBranch


  throw new Error(`No branch passed or in path`)
}

export const getArgs = () => {


  for (const [index, value]  of process.argv.entries())
    if(isValidCommand(value))
      return process.argv.slice(index+1)
  

  return []
}

function isValidCommand(theCommand){
  if (commands.includes(theCommand)) return true

  return false
}


function getBranchFromPath(){
  for (const aBranchName of branches)
    if( INIT_CWD.endsWith(`/${aBranchName}`) || INIT_CWD.includes(`/${aBranchName}/`))
      return aBranchName

  return ''
}

function getBranchFromProps(alt = false){
  // consola.error('process.argv',process.argv)
  // consola.error('index',alt? 2 : 3)
  // const index     = alt? 2 : 3
  // const theBranch = process.argv[index]

  const branchPath = getBranchFromPath()

  for (const arg of process.argv) {
    if(isValidBranch(arg) && branchPath !=='demo')
      return arg
  }
  // if(isValidBranch(theBranch)) return theBranch

  return ''
}

function isValidBranch(theBranch){
  if (branches.includes(theBranch)) return true

  return false
}
