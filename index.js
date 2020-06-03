const readline  = require('readline-sync')
const robots    = {text:require('./robots/text.js')}

async function start() {
const content = {}
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
console.log(content)

}

start()