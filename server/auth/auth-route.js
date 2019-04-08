import express from 'express'
import jwt from 'jsonwebtoken'
import { secret } from '../config'

const app = express()

const users = [
  {
    usuario: 'kirec',
    password: '123456',
    _id: '100'
  },
  {
    usuario: 'cocolo',
    password: '123456',
    _id: '101'
  }
]

app.post('/',(req,res) =>{
  const { usuario, password } = req.body
  const user = buscarUsuario(users, usuario,password)
  if (!user) {
    return handleLoginFailed(res,'usuario o contrasena no coincide')
  }
  const token = createToken(user)
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
