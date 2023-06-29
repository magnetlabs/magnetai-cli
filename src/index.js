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
  .description('Login with Magnet Account secret seeds(12 words)')
  .action((seeds) => withHelper(seeds, () => program.help(), () => login(seeds)))

program
  .command('prompt [MESSAGE]')
  .description('Prompt message to Magnet network for answer')
  .action((msg) => withHelper(msg, () => program.help(), () => prompt(msg)))

program
  .command('status [NONCE]')
  .description('Check status of your message by transaction nonce')
  .action((nonce) => withHelper(nonce, () => program.help(), () => status(nonce)))

program.addHelpText('before', chalk.yellow(figlet.textSync('magnet-cli', {horizontalLayout: 'full'})));

program.parse(process.argv)
