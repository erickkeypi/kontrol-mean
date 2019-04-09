import express from 'express'

const app = express.Router()

//api/korder
app.post('/',(req,res) =>{
  console.log(req.body)
})


export default app
