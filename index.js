const readline  = require('readline-sync')
const robots    = {text:require('./robots/text.js')}

async function start() {
const content = {
  maximumSentences:7
}
content.searchTerm = askAndReturnSearchTerm()
content.prefix = askAndReturnPrefix()

await robots.text(content)

function askAndReturnSearchTerm() {
 return readline.question('Type a Wikipedia search term:')

}

function askAndReturnPrefix() {
 const prefixes = ['who is', 'what is','the hisrory of']
 const selectedPrefixIndex = readline.keyInSelect(prefixes,'choose ono option:')
 const selectedPrefixText  = prefixes[selectedPrefixIndex]

 return selectedPrefixText
 //console.log(selectedPrefixText)

}

console.log(JSON.stringify(content, null, 4))
//console.log(content)

}

start()