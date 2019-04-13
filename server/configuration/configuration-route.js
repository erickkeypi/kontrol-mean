import express from 'express'
import { io } from '../index.js'
const app = express.Router()
import { buscarDispositivos } from '../serial'

//api/configuration
app.post('/',(req,res) =>{
  // console.log(`request: ${req.body.socketId}`)
  try{
    io.sockets.emit('message','Iniciando la busqueda de nuevos dispositivos')
    buscarDispositivos()
    res.status(200).json({
      message: 'recibido'
    })
  } catch(error){
    res.status(500).json({
      message: 'An error ocurred',
      error
    })
  }
})

export default app
