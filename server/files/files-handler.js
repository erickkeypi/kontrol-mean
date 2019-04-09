import fs from 'fs'

function obtenerKontroles(dat){
  dat = insertString(dat,"\n","}");
  let kontroles = dat.match(RegExp('{([\r\n]*.+;)+[\r\n]*}+?','g'));
  return convertirKontroles(kontroles);
}
function convertirKontroles(kontroles){
  var kon = [];
  for ( let i in kontroles){
    kon.push(agregarKontrol(kontroles[i]));
  }
  return(kon);
}
function insertString(a, b, at)
{
  let inicio = 0;
    var position = a.indexOf(at,inicio);
    while(position !== -1){
      a = a.substr(0, position+1) + b + a.substr(position+1);
      inicio = position+1;
      position = a.indexOf(at,inicio);
    }
    return a;
}
function agregarKontrol(kontrol){
  let nameIndex = kontrol.indexOf("kname:");
  let versionIndex = kontrol.indexOf("kversion:");
  let macIndex = kontrol.indexOf("kmac:");
  let idIndex = kontrol.indexOf("kid:");
  let portIndex = kontrol.indexOf("kports:");

  let endName = kontrol.indexOf(";",nameIndex+6);
  let endVersion = kontrol.indexOf(";",versionIndex+9);
  let endMac = kontrol.indexOf(";",macIndex+5);
  let endId = kontrol.indexOf(";",idIndex+4);
  let endPort = kontrol.indexOf(";",portIndex+7);


  var name = undefined;
  var version = undefined;
  var mac = undefined;
  var id = undefined;
  var port =undefined;

  if(nameIndex !== -1 & endName !== -1){
    name = kontrol.substring(nameIndex+6,endName).trim();
  }
  if(versionIndex !== -1 & endVersion !== -1){
    version = kontrol.substring(versionIndex+9,endVersion).trim();
  }
  if(macIndex !== -1 & endMac !== -1){
    mac = kontrol.substring(macIndex+5,endMac).trim();
  }
  if(idIndex !== -1 & endId !== -1){
    id = kontrol.substring(idIndex+4,endId).trim();
  }
  if(portIndex !== -1 & endPort !== -1){
    port = kontrol.substring(portIndex+7,endPort).trim();
  }

  var kon = {
    kname: name,
    kid: id,
    kports: port,
    kmac: mac,
    kversion: version,
  }

  return (kon);
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


export var kontroles = []
export var kdirecciones = {}

export const leerArchivoKontroles = () => {
  fs.readFile(`${__dirname}/data/data.ktrl`,'utf-8',(err,data)=>{
    kontroles = obtenerKontroles(data)
    leerKdirecciones()
  });
}
