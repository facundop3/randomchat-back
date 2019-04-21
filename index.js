const app = require('express')()
const http = require('http').createServer(app),
      PORT = 3030,
      io = require('socket.io')(http)

const socketID_username = {}

const getOnlineUsers = id_username => Object.keys(id_username).map(id=> ({username: id_username[id], id}))

io.on('connection', socket =>{
  console.log(`New socket: Id#: ${socket.id}`)
  socket.on('new-message', msg =>{
    console.log(`New socket: Id#: ${socket.id}`)
    if(socketID_username[socket.id]){
      io.emit('new-message', {message:msg, username :socketID_username[socket.id]})
    }
  })
  socket.on('new-username', username =>{
    console.log(`Id: ${socket.id} New user: ${username}`)
    if(!socketID_username[socket.id]){
      socketID_username[socket.id] = username
    }
    io.emit('all-users', getOnlineUsers(socketID_username))
  })

  socket.on('new-private-message', ({id, message})=>{
    console.log(`New socket: Id#: ${socket.id}`)
    console.log(`Private message to ${id}: ${message}`)
    io.to(id).emit('new-private-message', {id:socket.id ,message, username:socketID_username[socket.id] })
  })

  socket.on('disconnect', ()=>{
    delete socketID_username[socket.id]
    io.emit('all-users', getOnlineUsers(socketID_username))
  })
})



http.listen(PORT, () =>{
  console.log(`Listening on port: ${PORT}`)
})