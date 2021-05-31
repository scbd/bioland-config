import   bk                   from '../tasks/back-up.mjs'
import { getBranch, getArgs } from './util.mjs'

bk(getBranch(), getArgs())