import fs from 'fs';
import path from 'path';
import chalk from "chalk";
import log from "./src/log.js"
import install from "./src/install.js"
import { picker } from "./src/picker.js"


async function endPoint(argument) {
  // body...
  // check if a config file is present
  let config = "/data/data/com.termux/files/home/acode.config.json"
  let isConfig = fs.existsSync(path.resolve(config))
  log(chalk.gray.underline("checking for config"))

  if (isConfig) {
    log(chalk.green(" found it"))
    log(chalk.white(" what snippet do you want to install?"))
    let configData = fs.readFileSync(config, "utf-8")
    configData = JSON.parse(configData)
    let chose = await picker(configData)
    install(chose, configData)
  } else {
    log(chalk.red(" config file not found :("))

  }
  // log(process.argv.slice(2))
}

export default endPoint