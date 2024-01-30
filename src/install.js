import fs from "fs";
import log from "./log.js"
import removeCommentsFromJSON from "./removeComment.js"



function install({ value }, configData) {

  value.snippets.forEach(({ language, path }) => {

    path = value.snipPath + path.slice(10)
    let snippet = fs.readFileSync(path)
    snippet = removeCommentsFromJSON(snippet.toString())

    // log(snippet)
    try {
      snippet = JSON.parse(snippet)
    } catch (e) {
      log("stanle")
      // log(path)
      // log(snippet)
    }
    // log(snippet)

    let snippets = fs.readdirSync(configData.snippets)
    // log(snippet)

    if (snippets.includes(`${language}.snippets`)) {
      log(language)
      for (let prop in snippet) {
        let prefix = snippet[prop].prefix
        let description = snippet[prop].description
        let body = snippet[prop].body
        let bodyData = ``
        if (Array.isArray(body)) {
          body.forEach(i => bodyData += `${i}\n\t`)
        } else {
          bodyData += `${body}`
        }

        let snip = `\nsnippet ${prefix} "${description}"\n\t${bodyData}`
        // fs.appendFileSync(`${configData.snippets}/${language}.snippets`, snip)
        // log(snip)
      }

    }
  })
}

export default install;