import { ArgumentsCamelCase, CommandModule } from 'yargs'
const command: CommandModule = {
  command: 'ses',
  describe: 'メールテンプレートを同期する',
  builder: (yargs) => yargs.default('value', 'true'),
  handler: handler,
}
function handler(argv: ArgumentsCamelCase) {
  console.log(`setting ${argv.key} to ${argv.value}`)
}
export default command
