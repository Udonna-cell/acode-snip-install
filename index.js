import fs from 'fs';
import path from 'path';
import chalk from "chalk";
import log from "./src/log.js"
import install from "./src/install.js"
import uninstall from "./src/uninstall.js"
import { picker } from "./src/picker.js"
import setup from "./src/setup.js"


async function endPoint(argument) {
  // body...
  // check if a config file is present
  let config = "/data/data/com.termux/files/home/acode.config.json"
  let isConfig = fs.existsSync(path.resolve(config))
  log(chalk.gray.underline("  checking for config"))

  if (isConfig) {
    log(chalk.green(" found it"))
    log(chalk.white(" what snippet do you want to install?"))
    let configData = fs.readFileSync(config, "utf-8")
    configData = JSON.parse(configData)
    let chose = await picker(configData)
    install(chose, configData)
  } else {
    log(chalk.red(" config file not found :("))
    setup(endPoint)
  }
  // log(process.argv.slice(2))
}

async function removeEndPoint(argument) {
  // body...
  let config = "/data/data/com.termux/files/home/acode.config.json"
  let isConfig = fs.existsSync(path.resolve(config))
  log(chalk.gray.underline("  checking for config"))

  if (isConfig) {
    log(chalk.green(" found it"))
    log(chalk.white(" what snippet do you want to uninstall?"))
    let configData = fs.readFileSync(config, "utf-8")
    configData = JSON.parse(configData)
    let chose = await picker(configData)
    // log(chose)
    uninstall(chose, configData.snippets)
  } else {
    log(chalk.red(" config file not found :("))
    setup(removeEndPoint)
  }
}

// function fixe() {
//   setup()
// }
export { endPoint, removeEndPoint }