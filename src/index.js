#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
const login = require('./login').default;
const prompt = require('./prompt').default;
const status = require('./status').default;
const { withHelper } = require('./util');

program
  .version('0.0.1')
  .description(
    'The Magnet command-line interface (Magnet CLI) is a set of commands used to access Magnet Network resources'
  )

program
  .command('login [SEEDS]')
  .description('Login with MagnetAI account mnemonic')
  .action((seeds) => withHelper(seeds, () => program.help(), () => login(seeds)))

program
  .command('ask [PROMPT]')
  .description('Request MagnetAI LLM inference service')
  .action((msg) => withHelper(msg, () => program.help(), () => prompt(msg)))

program
  .command('status [NONCE]')
  .description('Check status of your message by transaction nonce')
  .action((nonce) => withHelper(nonce, () => program.help(), () => status(nonce)))

program.addHelpText('before', chalk.yellow(figlet.textSync('magnetai', {horizontalLayout: 'full'})));

program.parse(process.argv)
