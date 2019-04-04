import express from 'express'

const app = express.Router()

const kontrol={
  kname: 'arduino',
  kmac: '1234'
}

const kontrols = new Array(10).fill(kontrol)


//api/kontrols

app.get('/', (req, res) => res.status(200).json(kontrols))

app.get('/:id', (req, res) => res.status(200).json(kontrol))

export default app
