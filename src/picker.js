import prompt from "prompts"
import fs from "fs"

// const directoryPath = '/data/data/com.termux/files/home/extension';

function directory_content(extensionsPath) {
  let files = fs.readdirSync(extensionsPath)
  let extensions = []
  files.forEach(i => {
    let maps =  `${extensionsPath}/${i}/package.json`
    let pkg = fs.readFileSync(maps)
    // console.log(pkg.toString())
    pkg = JSON.parse(pkg)
    let info = {
      title: pkg.name,
      description: pkg.description,
      value: {
        snipPath: `${extensionsPath}/${i}/snippets`,
        snippets: pkg.contributes.snippets,
        name: pkg.name
      }
    }
    extensions.push(info)
  })
  return(extensions)
}


export async function picker(config) {
  // body...
  // console.log(config)
  // let directoryPath = fs.readFileSync(config)
  // directoryPath = JSON.parse(directoryPath)
  // console.log(directoryPath.extensions)
  let question = {
    type: 'select',
    name: 'value',
    message: 'Pick a snippet',
    choices: directory_content(config.extensions),
    // initial: 1
  }
  let response = await prompt(question)
  return(response)
}