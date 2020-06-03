const algorithmia     = require('algorithmia')
const algorithmApiKey = require('../credentials/algorithmia.json').apikey
const sentenceBoundaryDetection = require('sbd')

async function robot (content) {
 await fetchContentFromwikipedia(content)
  sanitizeContente(content)
 breakContentIntoSentences(content)
//console.log('Logando funcao "fetchContentFromwikipedia" retona')
//console.log(fetchContentFromwikipedia())

async function fetchContentFromwikipedia(content) {
const algorithmiaAuthenticated = algorithmia(algorithmApiKey)
const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
const wikipediaResponde  = await wikipediaAlgorithm.pipe(content.searchTerm)
const wikipediaContent   = wikipediaResponde.get()

content.sourceContentOriginal  =  wikipediaContent.content

 }
function sanitizeContente(content){
  const withouBlankLinesAndMarkdown  = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
  const withouDatesInparentheses     = removeDatesInParentheses(withouBlankLinesAndMarkdown)
  
  //content.sourceContentSanitalized   = withouDatesInparentheses
  content.sourceContentSanitized = withouDatesInparentheses
 
 // console.log(withouDatesInparentheses)


  function removeBlankLinesAndMarkdown(text) {
  const allLines  = text.split('\n')
  
  const withouBlankLinesAndMarkdown  = allLines.filter((line) => {
    if (line.trim().length === 0 || line.trim().startsWith('=')) {
    
      return false
    }
    return true
  })
  
    return withouBlankLinesAndMarkdown.join(' ')
     
 }
}

 function removeDatesInParentheses(text){

  return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
 }

 function breakContentIntoSentences(content) {
  content.sentences = []

  const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
  //console.log(sentences)
  sentences.forEach((sentence) => {
    content.sentences.push({
      text: sentence,
      keywords: [],
      images: []
    })
  })
}

}
 //console.log (`Recebi com sucesso: ${content.searchTerm}`)
module.exports = robot