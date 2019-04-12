import { kdirecciones } from '../files'
import serialport from 'serialport'

function sendSerial(puerto,mensaje){
  if(puerto){
    if(puerto.isOpen){
      console.log(`enviando: ${mensaje}`);
      puerto.write(`${mensaje}\n`);

    }
  }
}


var arduino

export const abrirPuerto = (nombre, errorHandler)=>{
  arduino = new serialport(nombre)
  arduino.on('open',() => {console.log('arduino conectado')})
  arduino.on('error',(error) => {
    errorHandler(error)
  })
}

export const enviarSerial = (obj) => {
  const direccion = kdirecciones[obj.kmac]
  if(direccion !== undefined){
    if (obj.korder.ktype === 'v'){
      const orden = `${direccion}{${obj.korder.kode}}`
      sendSerial(arduino,orden)
    } else if (obj.korder.ktype === 'b'){
      let valor = 0
      if (obj.valor) {
        valor = 1
      }
      const orden = `${direccion}{${obj.korder.kode}:${valor}}`
      sendSerial(arduino,orden)
    } else {
      const orden = `${direccion}{${obj.korder.kode}:${obj.valor}}`
      sendSerial(arduino,orden)
    }
  }
}
