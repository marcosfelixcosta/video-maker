const google  = require('googleapis').google
const customSearch  = google.customsearch('v1')
const state = require('./state.js')

// Chave-reserva - Busca no google "AIzaSyASu6Pvs_8a7XE8OfkamGZe2-wM4U_htVM"
//                                 "AIzaSyC1Y_ML7MWtuIlJvX8ZAkJl0ujxQKPZJ08"
//                                 "AIzaSyBSfYngZq1KAffFb3XvUIKGDlciiFtV3oI"


const googleSearchCredentials = require('../credentials/google-seach.json')

async function robot() {
  const content = state.load()

  await fetchImagesOfAllSentences(content)

  state.save(content)

async function fetchImagesOfAllSentences(content) {
  
 for (const sentence of content.sentences) {

  const query = `${content.searchTerm}`// ${sentence.keywords[0]}`

   sentence.images = await fetchGoogleAndReturnImagesLinks(query)
    
    sentence.googleSearchQuery = query

   // console.log(sentence.keywords[0])
  }
  
}

async function fetchGoogleAndReturnImagesLinks(query) {
  const response  = await customSearch.cse.list({
    auth: googleSearchCredentials.apiKey,
    cx: googleSearchCredentials.searchEngineId,
    q: query,
    searchType: 'image',
    num: 2
  })
  
  const imagesUrl = response.data.items.map((item) => { 
   return  item.link
  })

  return  imagesUrl
}
}
module.exports  = robot
