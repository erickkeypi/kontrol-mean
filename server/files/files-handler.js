import fs from 'fs'
import {
  obtenerKontroles,
  obtenerKordenes
} from './funciones'

export var kdirecciones = {}
export var kontroles = []

function agregarKdireccionesArchivo(){
  let kdir = "";
  for (let key in kdirecciones){
    kdir = kdir.concat(`${key}:${kdirecciones[key]}\n`);
  }
  fs.writeFile(`${__dirname}/data/kaddresses.kaddr`,"",()=>{});
  var logStream = fs.createWriteStream(`${__dirname}/data/kaddresses.kaddr`,{'flags':'a'});
  logStream.end(kdir);
}

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
    kontroles = obtenerKontroles(data)
    leerKdirecciones()
    if(res){
      res.status(200).json(kontroles)
    }
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

export const agregarKontrolArchivo = (texto, addr) => {
  let kontroles = obtenerKontroles(texto);
  kdirecciones[kontroles[0].kmac] = addr;
  let kon = "";
  for( let i in kontroles){
    kon = kon.concat("\n{\n");
    for (let key in kontroles[i]){
      kon = kon.concat(`${key}: ${kontroles[i][key]};\n`);
    }

    kon = kon.concat("}");
  }

  var logStream = fs.createWriteStream(`${__dirname}/data/data.ktrl`,{'flags':'a'});
  logStream.end(kon);
  agregarKdireccionesArchivo();
}

export const agregarKorderArchivo = (texto,id) => {
  let kordenes = obtenerKordenes(texto);
  let kor ="";
  for (let i in kordenes){
    kor = kor.concat("\n{\n");
    for(let key in kordenes[i]){
      kor = kor.concat(`${key}: ${kordenes[i][key]};\n`);
    }
    kor = kor.concat("}");
  }
  fs.writeFile(`${__dirname}/data/korders/${id}.kord`,"",()=>{});
  var logStream = fs.createWriteStream(`${__dirname}/data/korders/${id}.kord`,{'flags':'a'});
  logStream.end(kor);
}
