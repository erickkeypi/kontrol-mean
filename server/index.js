import Debug from 'debug'
import app from './app'
import { config } from '../config.js'
/////////
import {Server} from 'http'
var server = Server(app)
export var io = require('socket.io')(server)
//////////////
const PORT = config.PORT
const debug = new Debug('kontrol-MEAN:root')


server.listen(PORT, () => {
  debug(PORT)
})
// app.listen(PORT, () => {
//   debug(PORT)
// })
io.on('connection', function(socket) {
	console.log('Un cliente se ha conectado', socket.id );
  io.sockets.connected[socket.id].emit('message','conectado')
});
