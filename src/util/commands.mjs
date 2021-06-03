import changeCase from 'change-case'

const   generalCommands   = [ 'backUp', 'cache',  'initBranch', 'updateDb', 'maintenanceModeOn' ] //'createBranch',
const   biolandCommands   = [ 'initSite', 'gbif', 'blUsers', 'blUsersPasswords' ]
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

  if(cwdBranch && !propsBranch) return cwdBranch
  if(!cwdBranch && propsBranch) return propsBranch

  if(cwdBranch && propsBranch && (cwdBranch !== propsBranch)) throw new Error(`Path branch and argument branch do not match: ${cwdBranch} != ${propsBranch}`)

  if(cwdBranch && propsBranch) return propsBranch

  throw new Error(`No branch passed or in path`)
}

export const getArgs = () => {
  const index = getBranchFromProps()? 5 : 4

  return process.argv.slice(index)
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
  const index     = alt? 2 : 3
  const theBranch = process.argv[index]

  if(isValidBranch(theBranch)) return theBranch

  return ''
}

function isValidBranch(theBranch){
  if (branches.includes(theBranch)) return true

  return false
}
