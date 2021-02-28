import io from "socket.io-client"
let socket

export const initiateSocket = (room) => {
  socket = io()
  console.log(`Connecting socket...`)
  if (socket && room) socket.emit("join", room)
}

export const userJoinedRoom = (cb) => {
  if (!socket) return true
  socket.on("user joined", (msg) => {
    console.log("Websocket event received!")
    return cb(null, msg)
  })
}

export const disconnectSocket = () => {
  console.log("Disconnecting socket...")
  if (socket) socket.disconnect()
}

export const subscribeToChat = (cb) => {
  if (!socket) return true
  socket.on("chat", (msg, room) => {
    console.log("Websocket event received!")
    return cb(null, { message: msg, room: room })
  })
}

export const sendMessage = (room, message) => {
  console.log("sendmessage reached")
  if (socket) socket.emit("chat", { message, room })
}
