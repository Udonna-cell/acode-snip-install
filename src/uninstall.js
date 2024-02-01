import fs from "fs"


function replaceBetween({ value }, snippets) {
  // console.log(value)
  const header = `\n\n#>>>> ${value.name}\n\n`;
  const footer = `\n\n#<<<< ${value.name}\n\n`;
  const regex = new RegExp(`${header}[^]*?${footer}`, 'g');

  value.snippets.forEach(({ language }) => {
    // console.log(language)
    const location = `${snippets}/${language}.snippets`;
    let inputString = fs.readFileSync(location, "utf-8")
    fs.writeFileSync(location, inputString.replace(regex, ''));
  })

}
// const originalString = `This is a ${header} \n\tsample\n\tghhh\n hhhjje ${footer} string.`;
// const modifiedString = replaceBetween(originalString, header, footer);

export default replaceBetween