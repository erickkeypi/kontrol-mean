import { kdirecciones } from '../files'

export const enviarSerial = (obj) => {
  const direccion= kdirecciones[obj.kmac]
  if (obj.korder.ktype === 'v'){
    const orden = `${direccion}{${obj.korder.kode}}`
    console.log(orden)
  } else{
    const orden = `${direccion}{${obj.korder.kode}:${obj.valor}}`
    console.log(orden)
  }
}
