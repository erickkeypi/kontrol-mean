import express from 'express'
import {kontroles, kdirecciones} from '../files'

const app = express.Router()

//api/kontrols

app.get('/',(req, res) => {
  res.status(200).json(kontroles)
})

app.get('/:id', (req, res) => {
  res.status(200).json(kontrol)
  console.log('lol')
})

app.post('/',(req,res) =>{
  console.log(req.body)
})


export default app
