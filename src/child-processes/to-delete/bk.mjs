import   bk                   from '../tasks/back-up.mjs'
import { getBranch, getArgs } from '../util/index.mjs'

bk(getBranch(), getArgs())