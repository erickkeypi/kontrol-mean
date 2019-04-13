import express from 'express'
import { kontrolRoute } from './kontrol'
import bodyParser from 'body-parser'
import { authRoute } from './auth'
import { korderRoute } from './korder'
import { configurationRoute } from './configuration'
import path from 'path'
import { abrirPuerto } from './serial'
import { config } from './config.js'
import { leerArchivoKontroles } from './files'

const comName = config.comName


function conectarArduino(){
  console.log('Iniciando la comunicacion con el Arduino')
  abrirPuerto(comName, async (err) => {
    console.log('No se pudo realizar la conexion con el arduino. Reintento en 10 segundos')
    setTimeout(conectarArduino, 10000)
  })
}



const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

if(process.env.NODE_ENV === 'development'){
  app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, x-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
}
if(process.env.NODE_ENV ==='production'){
  app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, x-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
  app.use('/', express.static(path.join(process.cwd(),'dist/kontrol-MEAN')))
}

app.use('/api/kontrols',kontrolRoute)
app.use('/api/signin', authRoute)
app.use('/api/korder', korderRoute)
app.use('/api/configuration',configurationRoute)

conectarArduino()
leerArchivoKontroles()

export default app
