import   cache                 from '../tasks/cache.mjs'
import { getBranch, getArgs } from '../util/index.mjs'

cache(getBranch(), getArgs())