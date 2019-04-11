import express from 'express'
import {
  leerArchivoKontroles,
  leerArchivoKordenes
} from '../files'

const app = express.Router()

//api/kontrols

app.get('/',(req, res) => {
  leerArchivoKontroles(res)
  // console.log(`request: ${req.body}`)
})

app.get('/:id', (req, res) => {
  leerArchivoKordenes(req.params.id,res)
  // console.log(`request: ${req.body}`)
  // res.status(200).json({kname: 'mom'})
})

app.post('/',(req,res) =>{
  // console.log(`request: ${req.body}`)
})


export default app
