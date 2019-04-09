import express from 'express'
import {
  leerArchivoKontroles,
  leerArchivoKordenes
} from '../files'

const app = express.Router()

//api/kontrols

app.get('/',(req, res) => {
  leerArchivoKontroles(res)
})

app.get('/:id', (req, res) => {
  leerArchivoKordenes(req.params.id,res)
  // res.status(200).json({kname: 'mom'})
})

app.post('/',(req,res) =>{
  console.log(req.body)
})


export default app
