const express = require("express")
const next = require("next")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const server = express()
  const http = require("http").Server(server)
  const io = require("socket.io")(http)

  server.get("/a", (req, res) => {
    return app.render(req, res, "/a", req.query)
  })

  // here we're listening on the connection event for incoming sockets and then
  // logging into the console

  var socketids = []
  io.on("connection", (socket) => {
    socket.on("join", (room) => {
      console.log(`Socket ${socket.id} joining ${room}`)
      socket.join(room)

      socketids.push(socket.id)

      // getting the last two
      let requiredSocketIds = [
        socketids[socketids.length - 2],
        socketids[socketids.length - 1],
      ]

      // / sending to all clients in 'game' room except sender
      // socket.to(room).emit("user joined", "A player has joined the game!")
      socket.broadcast.to(room).emit("user joined", requiredSocketIds)
    })

    socket.on("disconnect", () => {
      console.log(`socket: ${socket.id} disconnected!`)

      var i = socketids.indexOf(socket)
      socketids.splice(i, 1)
    })

    socket.on("characters chosen", (data) => {
      const { room, currentPlayerCharacter, opponentPlayerCharacter } = data
      console.log(`characters chosen for room: ${room}`)
      io.to(room).emit(
        "characters chosen successful",
        room,
        currentPlayerCharacter,
        opponentPlayerCharacter
      )
    })

    socket.on("set socketids", (data) => {
      const { room, currentUserSocketId, opponentSocketId } = data
      console.log("room: ", room)
      console.log("currentUserSocketId: ", currentUserSocketId)
      console.log("opponentSocketId: ", opponentSocketId)

      console.log(`characters chosen for room: ${room}`)
      io.to(room).emit("set socketids successful", {
        room,
        currentUserSocketId,
        opponentSocketId,
      })
    })

    socket.on("start the game for both players", (room) => {
      console.log(`starting game for room: ${room}`)
      socket.to(room).emit("game start successful")

      console.log(io.of("/").in(room).clients)
    })

    socket.on("increment opponent player points", (data) => {
      const { roomId, socketId } = data
      // console.log(`increment opponent player points for socketid: ${socketId}`)
      // console.log(`increment opponent player points for roomId: ${roomId}`)

      console.log(
        `socket ${socket.id} wants to increment points for ${socketId}`
      )
      console.log(`socketids: `, socketids)
      // socket
      //   .to(socketId)
      //   .emit("increment opponent player points successful", 10)

      // socket.broadcast
      // .to(roomId)
      // .emit("increment opponent player points successful", 10)

      socket.broadcast.emit("increment opponent player points successful", {
        points: 10,
        socketId,
      })

      // socket.to(roomId).emit("increment opponent player points successful", 10)
    })

    socket.on("chat", (data) => {
      const { message, room } = data
      console.log(`msg: ${message}, room: ${room}`)
      io.to(room).emit("chat", message, room)
    })

    // socket.on("chat message", (msg) => {
    //   io.emit("chat message", msg)
    // })
  })

  server.all("*", (req, res) => {
    return handle(req, res)
  })

  // Earlier we used express to run the server but now we're using http below to run it.
  // This is required so that Socket.io can attach to the server once it's setup.

  http.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
