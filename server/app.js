import express from 'express'
import { kontrolRoute } from './kontrol'
import bodyParser from 'body-parser'
import { authRoute } from './auth'
import { korderRoute } from './korder'
import path from 'path'
import { abrirPuerto } from './serial'

abrirPuerto()
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

export default app
