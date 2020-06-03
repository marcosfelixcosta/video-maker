const readline = require('readline-sync')

function start() {
const content = {}
content.searchTerm = askAndReturnSearchTerm()
content.prefix = askAndReturnPrefix()

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