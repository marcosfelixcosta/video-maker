const imageDownloader = require('image-downloader')
const google  = require('googleapis').google
const customSearch  = google.customsearch('v1')
const state = require('./state.js')


//Chave-reserva - Busca no google:
//  "AIzaSyASu6Pvs_8a7XE8OfkamGZe2-wM4U_htVM"
//  "AIzaSyC1Y_ML7MWtuIlJvX8ZAkJl0ujxQKPZJ08"
//  "AIzaSyBSfYngZq1KAffFb3XvUIKGDlciiFtV3oI"


const googleSearchCredentials = require('../credentials/google-seach.json')

async function robot() {
  const content = state.load()



  await fetchImagesOfAllSentences(content)
  await downloadAllImages(content)
  state.save(content)

async function fetchImagesOfAllSentences(content) {
  
 for (const sentence of content.sentences) {

  const query = `[${content.searchTerm}] [${sentence.keywords[0]}]` //[${sentenceIndex}][${imageIndex}]
  sentence.images = await fetchGoogleAndReturnImagesLinks(query)
    
  sentence.googleSearchQuery = query

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
 async function downloadAllImages(content){
   content.downloadAllImages  = []
 
//content.sentences[1].images[0]  = ''

 for(let sentenceIndex  = 0; sentenceIndex < content.sentences.length; sentenceIndex++ ) {
 const images = content.sentences[sentenceIndex].images

 for(let imageIndex = 0; imageIndex < images.length; imageIndex++) {
   const imageUrl = images[imageIndex]

   try {
     if (content.downloadAllImages.includes(imageUrl)){
       throw new Error ('Já baixei esta imagens!')
     }
     await downloadAndSave(imageUrl, `${sentenceIndex}-original.png`)
     content.downloadAllImages.push(imageUrl)
     console.log(`>[${sentenceIndex}][${imageIndex}] Baixou imagem com sucesso: ${imageUrl}`)
     break
   } catch (error) {
    console.log(`> [${sentenceIndex}][${imageIndex}] Erro ao baixar a imagem: (${imageUrl}): ${error}`)
     
    }
    }
    }
    }

    async function downloadAndSave(url, fileName) {
      return imageDownloader.image({
        url, url, dest: `./content/${fileName}`
      })
    }
 }

module.exports  = robot
