const app = require('express')()
const http = require('http').createServer(app),
      PORT = 3030,
      io = require('socket.io')(http)

const socketID_username = {}

io.on('connection', socket =>{
  console.log(`New socket: Id#: ${socket.id}`)
  socket.on('new-message', msg =>{
    io.emit('new-message', {message:msg, username :socketID_username[socket.id]})
  })
  socket.on('new-username', username =>{
    console.log(`Id: ${socket.id} New user: ${username}`)
    if(!socketID_username[socket.id]){
      socketID_username[socket.id] = username
    } 
  })
})



http.listen(PORT, () =>{
  console.log(`Listening on port: ${PORT}`)
})