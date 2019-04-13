import express from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config.js'
import fs from 'fs'
import { io } from '../index.js'

const app = express()

var users
const secret = config.secret

fs.readFile(`${__dirname}/users.txt`,'utf8',(err,data)=>{
  users = JSON.parse(data)
});


app.post('/',(req,res) =>{
  // console.log(`request: ${req.body}`)
  const { usuario, password } = req.body
  const user = buscarUsuario(users, usuario,password)
  if (!user) {
    io.sockets.emit('message','Usuario y/o Contraseña Incorrecta')
    return handleLoginFailed(res,'usuario o contrasena no coincide')
  }
  const token = createToken(user)
  io.sockets.emit('message',`${usuario} ha iniciado sesion`)
  res.status(200).json({
    message: 'login succeded',
    token,
    userId: user._id,
    usuario: user.usuario
  })

})

const createToken = (user) => jwt.sign ({ user }, secret, { expiresIn: 86400 })


function handleLoginFailed(res, message) {
  return res.status(401).json({
    message: 'Login failed',
    error: message || 'Email and password do not match'
  })
}

function buscarUsuario(users, usuario, password){
  for (let u in users) {
    if (usuario === users[u].usuario && password === users[u].password) {
      return users[u]
    }
  }
  return null
}

export default app
