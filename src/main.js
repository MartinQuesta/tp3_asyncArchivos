// import { respaldar } from './respaldar.js'
// function main(){
//     try{  
//     respaldar('./test/static/rutaConArchivosVisibles', './copiarVisibles')
//        }catch (error) {
//           console.log(error.message)
//         }
//     try {
//         respaldar('./test/static/rutaConArchivosFallados', './copiarFalladas')
//     }catch (error) {
//           console.log(error.message)
//         } 
// }

// main()
// CALLBACKS /////////////////////////////////////////////////////////////

import { respaldar } from './respaldarCallbacks.js'

function main() {
  respaldar('./test/static/rutaConArchivosVisibles', './copiasVisibles', (err, msgFinal) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log(msgFinal)
    }
  })
  respaldar('./test/static/rutaConArchivosFallados', './copiasFalladas', (err, msgFinal) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log(msgFinal)
    }
  })
}

main()

// PROMESAS /////////////////////////////////////////////////////////////

// import { respaldar } from './respaldarPromises.js'

// function main() {
//   respaldar('./test/static/rutaConArchivosVisibles', './copiasVisibles')
//   respaldar('./test/static/rutaConArchivosFallados', './copiasFalladas')
// }

// main()