import consola from "consola"

const branches     = [ 'prod', 'test', 'demo' ]
const { INIT_CWD } = process.env

export const getBranch = (alt=false)=>{

  const cwdBranch = getBranchFromPath()
  const propsBranch = getBranchFromProps(alt)

  if(cwdBranch && !propsBranch) return cwdBranch
  if(!cwdBranch && propsBranch) return propsBranch

  if(cwdBranch && propsBranch && (cwdBranch !== propsBranch)) throw new Error(`Path branch and argument branch do not match: ${cwdBranch} != ${propsBranch}`)

  if(cwdBranch && propsBranch) return propsBranch

  throw new Error(`No branch passed or in path`)
}

export const getArgs = () => {
  const index = getBranchFromProps()? 3 : 2
  
  return process.argv.slice(index)
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

  //consola.error(`${theBranch}: is not a valid branch.  One of ${JSON.stringify(branches)}.`)
  return false
}
