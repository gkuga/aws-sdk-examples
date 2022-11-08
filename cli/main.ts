import Yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import ses from '~/cmds/ses'

Yargs(hideBin(process.argv))
  .command(ses)
	.demandCommand()
	.help()
	.parse()
