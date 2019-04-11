import express from 'express'
import { enviarSerial } from '../serial'

const app = express.Router()

//api/korder
app.post('/',(req,res) =>{
  // console.log(`request: ${req.body}`)
  try{
    enviarSerial(req.body)
    res.status(201)
  } catch(error){
    res.status(500).json({
      message: 'An error ocurred',
      error
    })
  }
})


export default app
