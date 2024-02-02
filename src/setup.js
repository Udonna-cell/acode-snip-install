import prompts from "prompts"
import chalk from "chalk"
import fs from "fs"

async function setup(callback) {
  let basePath = "/data/data/com.termux/files/home"
  // body...
  let opsion = [
    {
      type: 'toggle',
      name: 'value',
      message: 'Do you want us to setup the config file?',
      initial: true,
      active: 'yes',
      inactive: 'no'
    },
    {
      type: ans => ans == true ? "text" : null,
      name: "Snippet",
      message: "Provide path to store snippets?"
    },
    {
      type: ans => ans != "" ? "text" : null,
      name: "Extension",
      message: `Provide path to stored ${chalk.green("Extention")}?`
    }
  ]
  let response = await prompts(opsion)
  let config = {
    extensions: response.Extension,
    snippets: response.Snippet
  }
  config = JSON.stringify(config)
  fs.writeFileSync(`${basePath}/acode.config.json`, config)
  callback()
  // console.log(config)
}

export default setup