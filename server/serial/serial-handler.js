import { kdirecciones } from '../files'

export const enviarSerial = (obj) => {
  const direccion = kdirecciones[obj.kmac]
  if(direccion !== undefined){
    if (obj.korder.ktype === 'v'){
      const orden = `${direccion}{${obj.korder.kode}}`
      console.log(orden)
    } else if (obj.korder.ktype === 'b'){
      let valor = 0
      if (obj.valor) {
        valor = 1
      }
      const orden = `${direccion}{${obj.korder.kode}:${valor}}`
      console.log(orden)
    } else {
      const orden = `${direccion}{${obj.korder.kode}:${obj.valor}}`
      console.log(orden)
    }
  }
}
