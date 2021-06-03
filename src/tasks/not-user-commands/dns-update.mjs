import   AWS                               from 'aws-sdk'
import   config                            from '../../util/config.mjs'
import { getDomainsByZoneId , getZoneIds } from './domains.mjs'
import   consola                           from 'consola'           ;

const route53 = new AWS.Route53();

export const initDns = async (branch) => {
  const { isLocal, getFqdn } = config[branch]
  const   changes            = []

  if(isLocal) return

  for (const hostedZoneId of getZoneIds(branch)) {
    //if(hostedZoneId === 'Z17YZYXL9GEG03') continue //temporary

    const urls = getDomainsByZoneId (branch, hostedZoneId)

    consola.warn('urls', urls)
    console.log('\n')

    changes.push(await route53.changeResourceRecordSets(getBatchTemplate(hostedZoneId, urls, getFqdn)).promise())
  }
  
  console.log('\n')
  while(!await isDnsUpdateDone(changes)){
    try{

      consola.info(`DNS upsert status: PENDING\n`)

      await new Promise(resolve => setTimeout(resolve, 5000))
    }catch(e){
      consola.error(e)
    }
  }
  
  consola.info(`DNS upsert status: Done\n`)
}

async function isDnsUpdateDone(changes){
  const checkPromises = []

  for (const { ChangeInfo } of changes)
    checkPromises.push(route53.getChange({ Id: ChangeInfo.Id }).promise())

  const changesStatus = await Promise.all(checkPromises)

  for (const { ChangeInfo } of changesStatus)
    if(ChangeInfo.Status === 'PENDING') return false

  return true
}

function getBatchTemplate(HostedZoneId, urls, getFqdn){

  const Changes = []

  for (const aUrl of urls) {
    if(!aUrl.includes('chm-cbd.net')) continue

    Changes.push(
      { 
        Action: 'UPSERT',
        ResourceRecordSet: {
          Name: `${aUrl}.`,
          Type: 'CNAME',
          TTL: 60,
          ResourceRecords: [{ Value: getFqdn(aUrl) }]
        }
      }
    )
  }

  return {
    HostedZoneId,
    ChangeBatch: { Changes }
  }
}
