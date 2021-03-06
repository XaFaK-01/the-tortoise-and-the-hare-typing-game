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
  var playerNames = []
  io.on("connection", (socket) => {
    // ----joining room----
    socket.on("join", (data) => {
      const { nameOfRoom, currentPlayerName } = data

      // console.log(`Socket ${socket.id} joining ${nameOfRoom}`)
      socket.join(nameOfRoom)

      // console.log("joining room")

      socketids.push(socket.id)
      playerNames.push(currentPlayerName)

      // getting the last two
      let requiredSocketIds = [
        socketids[socketids.length - 2],
        socketids[socketids.length - 1],
      ]

      // / sending to all clients in  room except sender
      socket.broadcast.to(nameOfRoom).emit("user joined", {
        requiredSocketIds,
        opponentName: playerNames[playerNames.length - 1],
      })

      // console.log("playerNames: ", playerNames)
    })

    // ----sharing opponent names----
    socket.on("share opponent name", (data) => {
      const { nameOfRoom, currentPlayerName } = data
      // console.log(
      //   `Socket ${socket.id} sharing opponent name ${currentPlayerName}`
      // )

      socket.broadcast
        .to(nameOfRoom)
        .emit("sharing opponent name successful", currentPlayerName)
    })

    // ----user disconnection----
    socket.on("disconnect", () => {
      // console.log(`socket: ${socket.id} disconnected!`)

      var i = socketids.indexOf(socket)
      socketids.splice(i, 1)

      playerNames.splice(i, 1)
    })

    // ----characters selection----
    socket.on("characters chosen", (data) => {
      const { room, currentPlayerCharacter, opponentPlayerCharacter } = data
      // console.log(`characters chosen for room: ${room}`)
      io.to(room).emit(
        "characters chosen successful",
        room,
        currentPlayerCharacter,
        opponentPlayerCharacter
      )
    })

    // ----setting socketids----
    socket.on("set socketids", (data) => {
      const { room, currentUserSocketId, opponentSocketId } = data(
        "room: ",
        room
      )
      // console.log("currentUserSocketId: ", currentUserSocketId)
      // console.log("opponentSocketId: ", opponentSocketId)

      // console.log(`characters chosen for room: ${room}`)
      io.to(room).emit("set socketids successful", {
        room,
        currentUserSocketId,
        opponentSocketId,
        opponentName: playerNames[playerNames.length - 2],
      })
    })
    // ----starting game for both players----
    socket.on("start the game for both players", (room) => {
      // console.log(`starting game for room: ${room}`)
      socket.to(room).emit("game start successful")

      // console.log(io.of("/").in(room).clients)
    })

    // ----incrementing opponent player points----
    socket.on("increment opponent player points", (data) => {
      const { roomId, socketId } = data

      // console.log(
      //   `socket ${socket.id} wants to increment points for ${socketId}`
      // )
      // console.log(`socketids: `, socketids)

      socket.broadcast.emit("increment opponent player points successful", {
        points: 8,
        socketId,
      })
    })
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
