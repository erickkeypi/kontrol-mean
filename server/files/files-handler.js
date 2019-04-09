import fs from 'fs'
import {
  obtenerKontroles,
  obtenerKordenes
} from './funciones'

export var kdirecciones = {}

function leerKdirecciones(){
  fs.readFile(`${__dirname}/data/kaddresses.kaddr`,'utf-8',(err,data)=>{
    var ko= data.match(RegExp('.+:.*','g'));
    for (let k in ko){
      let pos =ko[k].indexOf(':');
      kdirecciones [ko[k].substring(0,pos)] = ko[k].substring(pos+1).trim();
    }
  });
}

export const leerArchivoKontroles = (res) => {
  fs.readFile(`${__dirname}/data/data.ktrl`,'utf-8',(err,data)=>{
    let kontroles = obtenerKontroles(data)
    leerKdirecciones()
    res.status(200).json(kontroles)
  });
}
export const leerArchivoKordenes = (id, res) => {
  fs.readFile(`${__dirname}/data/korders/${id}.kord`,
    'utf-8',
    (err,data)=>{
      let ordenes = obtenerKordenes(data)
      // console.log(ordenes)
      // res.status(200).json({kname: 'mom'})
      res.status(200).json(ordenes)
    // console.log(data)
  });
}
