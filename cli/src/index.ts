#!/usr/bin/env node

import process from 'node:process'
import { formatDate } from '@monorepo/utils'
import chalk from 'chalk'
import { Command } from 'commander'

const program = new Command()

program
  .name('monorepo-cli')
  .description('CLI tool for monorepo project')
  .version('1.0.0')

program
  .command('hello')
  .description('Say hello')
  .option('-n, --name <name>', 'Your name', 'World')
  .action((options) => {
    console.log(chalk.green(`Hello, ${options.name}!`))
    console.log(chalk.blue(`Current time: ${formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')}`))
  })

program
  .command('info')
  .description('Show project info')
  .action(() => {
    console.log(chalk.cyan('Monorepo Project Info'))
    console.log(chalk.gray('─'.repeat(40)))
    console.log(chalk.yellow('Name:'), 'monorepo')
    console.log(chalk.yellow('Version:'), '1.0.0')
    console.log(chalk.yellow('Build Time:'), formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'))
  })

program
  .command('build')
  .description('Build all packages')
  .option('-p, --package <package>', 'Build specific package')
  .action((options) => {
    if (options.package) {
      console.log(chalk.green(`Building package: ${options.package}`))
    }
    else {
      console.log(chalk.green('Building all packages...'))
    }
  })

program.parse(process.argv)
