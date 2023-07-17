#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
const login = require('./login').default;
const order = require('./order').default;
const api = require('./api').default;
const metrics = require('./metrics').default;
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
  .command('order [MODULE_NAME]')
  .description('Order LLM module on MagnetAI')
  .action((msg) => withHelper(msg, () => program.help(), () => order(msg)))

program
  .command('api [NONCE]')
  .description('Check module API by transaction nonce')
  .action((nonce) => withHelper(nonce, () => program.help(), () => api(nonce)))

program
  .command('metrics [NONCE]')
  .description('Check node metrics by transaction nonce')
  .action((nonce) => withHelper(nonce, () => program.help(), () => metrics(nonce)))

program.addHelpText('before', chalk.yellow(figlet.textSync('magnetai', {horizontalLayout: 'full'})));

program.parse(process.argv)
