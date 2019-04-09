import express from 'express'
import { enviarSerial } from '../serial'

const app = express.Router()

//api/korder
app.post('/',(req,res) =>{
  enviarSerial(req.body)
})


export default app
