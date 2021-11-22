import fs from 'fs'

function respaldar(rutaConArchivosACopiar, rutaCopias, callback) {

    fs.readdir(rutaConArchivosACopiar, (err, archParaCopiar) => {
        if (err) {
            return callback(new Error('error al leer el directorio'))
        }

        archParaCopiar = archParaCopiar.filter(a => !a.startsWith('.') && a.includes('.'))

        if (archParaCopiar.length === 0) {
            return callback(null, 'no habia cosas para procesar') // terminé, nada por procesar!
        }

        fs.mkdir(rutaCopias, err => {
            if (err && err.code !== 'EEXIST') {
                return callback(new Error('error al crear la carpeta'))
            }

            let procesados = 0
            let errores = 0

            for (const archivo of archParaCopiar) {
                const rutaOrig = `${rutaConArchivosACopiar}/${archivo}`
                const rutaDestino = `${rutaCopias}/${archivo}`
                fs.copyFile(rutaOrig, rutaDestino, (err) => {
                    // console.log(`${rutaOrig} ${rutaDestino}`)
                    procesados++
                    if (err) {
                        errores++
                    }
                    if (procesados === archParaCopiar.length) {
                        // terminé, todo procesado!
                        let msg = 'fin, todo copiado!'
                        if (errores) {
                            msg = `fallaron ${errores} copias`
                        }
                        callback(null, msg)
                    }
                })
            }
        })
    })
}

export {
    respaldar
}