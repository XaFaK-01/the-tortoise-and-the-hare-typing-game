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
  var allClients = []
  var allClientsUserName = []
  var rooms = []

  io.on("connection", (socket) => {
    socket.on("userConnected", (userName) => {
      allClients.push(socket)
      allClientsUserName.push(userName)
      io.emit("userConnectedSuccessful", userName)
    })

    socket.on("disconnect", () => {
      var i = allClients.indexOf(socket)
      io.emit("userDisconnected", allClientsUserName[i])

      allClients.splice(i, 1)
      allClientsUserName.splice(i, 1)
    })

    socket.on("join", (room) => {
      console.log(`Socket ${socket.id} joining ${room}`)
      socket.join(room)
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
