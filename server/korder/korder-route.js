import express from 'express'
import { enviarSerial } from '../serial'
import { io } from '../index.js'
const app = express.Router()

//api/korder
app.post('/',(req,res) =>{
  // console.log(`request: ${req.body}`)
  try{
    io.sockets.connected[req.body.socketId].emit('message',`enviando orden`)
    //enviarSerial(req.body)
    res.status(200).json({
      message: 'orden enviada'
    })
  } catch(error){
    res.status(500).json({
      message: 'An error ocurred',
      error
    })
  }
})


export default app
