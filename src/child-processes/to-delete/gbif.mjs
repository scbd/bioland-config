import   gbifTask              from '../tasks/gbif.mjs'
import { getBranch, getArgs } from '../util/index.mjs'

gbifTask(getBranch(), getArgs())