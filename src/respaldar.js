import fs from 'fs'

function respaldar(rutaConArchivosACopiar, rutaDeLasCopias) {
    let files

    try{
        files = fs.readdirSync(rutaConArchivosACopiar)
    }catch(err){
        throw new Error('ruta no valida')
    }

    files = files.filter(a=> !a.startsWith('.') && a.includes('.')) // que no empice con punto y que tenga punto

    if (files.length > 0){

        try{
            fs.mkdirSync(rutaCopias)
        }catch(err){
            if(err.code !== 'EEXIST'){
                throw new Error('error creando el dir')
            }
        }
        for (let file of files){
            let dirOrigen = `${rutaConArchivosACopiar}/${file}`
            let dirDestino = `${rutaCopias}/${file}`
            let dirErrores = `${rutaCopias}/Err`
            try{
                fs.copyFileSync(dirOrigen,dirDestino)
            }catch (err){
                escribirTextoEnArchivo(dirErrores,err)
            }
        }
    }
}

function escribirTextoEnArchivo(ruta, texto, shouldCreateIfNotExists) {
    const existe = fs.existsSync(ruta)
    if (!shouldCreateIfNotExists && !existe) {
        throw new Error('el archivo no existe')
    }
    fs.writeFileSync(ruta, texto)
}

export {
    respaldar
}
