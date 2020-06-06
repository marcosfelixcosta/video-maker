const readline  = require('readline-sync')
const state     = require('./state.js')

function robot(){
  const content = {
    maximumSentences:7
  }
  content.searchTerm = askAndReturnSearchTerm()
  content.prefix = askAndReturnPrefix()
  state.save(content)
  
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
}

module.exports  = robot

