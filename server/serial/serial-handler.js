import {
  kdirecciones,
  kontroles,
  agregarKontrolArchivo,
  agregarKorderArchivo,
  leerArchivoKontroles,
  obtenerKontroles
} from '../files'
import serialport from 'serialport'
import events from 'events'

var  eventEmitter = new events.EventEmitter();

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

function dataHandler(datos){
  arduinoData.data +=datos.toString()
  if(arduinoData.data.includes("{KOK}")){
    switch (arduinoData.waiter) {
      case 'pedirKontrol':
        eventEmitter.emit('pedirKontrol2')
        break;

      case 'pedirKontrol2':
        leerArchivoKontroles()
        eventEmitter.emit('pedirKontrol3')
        break;

      default:

    }
    arduinoData.data =''
    arduinoData.recibido=false
  }
}


/////////////////
eventEmitter.on('reconocer',() =>{
  if(arduino){
    if(arduino.isOpen){
      if(kontroles.length <10){
        arduinoData.addr = ''
        eventEmitter.emit('pedirKontrol')
      }else{
        console.log('mas de un kontrol')
      }
    }
  }
})

eventEmitter.on('pedirKontrol',() => {
  arduinoData.data =''
  arduinoData.recibido=false
  arduinoData.waiter="pedirKontrol"
  sendSerial(arduino,`${arduinoData.addr}{KONTROL}`)
})

eventEmitter.on('pedirKontrol2',() => {
  let ktrl = obtenerKontroles(arduinoData.data);
  let dispositivoRepetido = false;
  for (let k in kontroles){

  }

  if(!dispositivoRepetido){
    console.log("agregando el dispositivo y pidiendo las ordenes");
    agregarKontrolArchivo(arduinoData.data,arduinoData.addr);
    arduinoData.waiter = "pedirKontrol2";
    arduinoData.data ="";
    sendSerial(arduino,`${arduinoData.addr}{KORDERS}`)
  }
})

eventEmitter.on('pedirKontrol3', () => {
  var nombreArchivo = kontroles[kontroles.length-1].kid;
  agregarKorderArchivo(arduinoData.data,nombreArchivo);
})

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
      console.log('reconociendo')
      eventEmitter.emit('reconocer')
    }
  }
}
