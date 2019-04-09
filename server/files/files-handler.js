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
      // res.status(200).json(kontroles)
    }
  });
}
function obtenerKordenes(dat){
  dat = insertString(dat,"\n","}");
  var ko= dat.match(RegExp('{([\r\n]*.+;)+[\r\n]*}','g'));
  return convertirKordenes(ko);
}

function convertirKordenes(kontroles){
  var kon = [];
  for ( let i in kontroles){
    kon.push(agregarKorden(kontroles[i]));
  }
  return(kon);
}
function agregarKorden(kontrol){
  var nameIndex = kontrol.indexOf("kname:")+6;
  var kodeIndex = kontrol.indexOf("kode:")+5;
  var typeIndex = kontrol.indexOf("ktype:")+6;
  var endName = kontrol.indexOf(";",nameIndex);
  var endKode = kontrol.indexOf(";",kodeIndex);
  var endType = kontrol.indexOf(";",typeIndex);

  var name = kontrol.substring(nameIndex,endName).trim();
  var kode = kontrol.substring(kodeIndex,endKode).trim();
  var type = kontrol.substring(typeIndex,endType).trim();

  var kon = {
    kname: name,
    kode:kode,
    ktype:type
  }

  return (kon);
}

///////////////////////////////////////////////////
export var kdirecciones = {}
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
