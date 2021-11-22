import { promises as fs } from 'fs'

async function respaldar(rutaConArchivosACopiar, rutaCopias) {

    let archivos

    try {
        archivos = await fs.readdir(rutaConArchivosACopiar)
    } catch (error) {
        throw new Error('ruta invalida')
    }

    archivos = archivos.filter(a => !a.startsWith('.') && a.includes('.'))

    if (archivos.length > 0) {

        try {
            await fs.mkdir(rutaCopias)
        } catch (error) {
            if (error.code !== 'EEXIST') {
                throw new Error('error al crear el directorio de copias')
            }
        }

        for (const archivo of archivos) {
            const rutaOrigen = `${rutaConArchivosACopiar}/${archivo}`
            const rutaDestino = `${rutaCopias}/${archivo}`
            try {
                await fs.copyFile(rutaOrigen, rutaDestino)
                // console.log(rutaDestino)
            } catch (error) {
                // aca puedo logguear el error
            }
        }
    }
}

export {
    respaldar
}
