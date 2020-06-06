const fs  = require('fs')
const contentFilepath = './content.json'

function save(content){
  const contentString = JSON.stringify(content)
  return fs.writeFileSync(contentFilepath, contentString)
  }

  function load(){
const fileBuffer  = fs.readFileSync(contentFilepath,'utf-8')
const contentJson = JSON.parse(fileBuffer)
return contentJson
  }

  module.exports  = {
    save,
    load
  }