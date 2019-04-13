import { kdirecciones, kontroles } from '../files'
import serialport from 'serialport'

var arduino
var arduinoData = {
  recibido: false,
  data: '',
  waiter: '',
  addr: ''
}


function sendSerial(puerto,mensaje){
  if(puerto){
    if(puerto.isOpen){
      console.log(`enviando: ${mensaje}`);
      puerto.write(`${mensaje}\n`);
    }
  }
}
function reconocer(){
  console.log(kontroles)
}

function pedirKontrol(addr){
  arduinoData.data =''
  arduinoData.recibido=false
  if(!addr){
    arduinoData.waiter="pedirKontrol"
    sendSerial(arduino,'{KONTROL}')
  } else {
    arduinoData.waiter="pedirKontrol"
    sendSerial(arduino,`${addr}{KONTROL}`)
  }
}

function pedirKontrolP2(){

}

function dataHandler(datos){
  arduinoData.data +=datos.toString()
  if(arduinoData.data.includes("{KOK}")){
    arduinoData.recibido = true
  }

  if(arduinoData.recibido){
    switch (arduinoData.waiter) {
      case 'pedirKontrol':
        console.log(arduinoData.data)
        break;
      default:

    }
    arduinoData.data =''
    arduinoData.recibido=false
  }
}

//////////////////////////////////
export const abrirPuerto = (nombre, errorHandler)=>{
  arduino = new serialport(nombre)
  arduino.on('open',() => {console.log('arduino conectado')})
  arduino.on('error',(error) => {
    console.log('error')
    errorHandler(error)
  })
  arduino.on('data',dataHandler)
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

export const buscarDispositivos = () => {
  if(arduino){
    if(arduino.isOpen){
      reconocer()
    }
  }
}
