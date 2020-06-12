const fs  = require('fs')
const contentFilepath = './content.json'
const scriptFilePath = './content/after-effects-script.js'

function save(content){
  const contentString = JSON.stringify(content)
  return fs.writeFileSync(contentFilepath, contentString)
 
}
function saveScript(content){
  const contentString = JSON.stringify(content)
  const scriptString = `var content = ${contentString}`
  return fs.writeFileSync(scriptFilePath, scriptString)
}

  function load(){
const fileBuffer  = fs.readFileSync(contentFilepath,'utf-8')
const contentJson = JSON.parse(fileBuffer)
return contentJson
  }

  module.exports  = {
    save,
    saveScript,
    load
  }