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
    console.log("Websocket event received for user joining!")
    return cb(null, msg)
  })
}

export const charactersChosen = (
  room,
  currentPlayerCharacter,
  opponentPlayerCharacter
) => {
  socket = io()

  if (socket && currentPlayerCharacter && opponentPlayerCharacter) {
    socket.emit("characters chosen", {
      room,
      currentPlayerCharacter,
      opponentPlayerCharacter,
    })
  }
}

export const startTheGameForBothPlayers = (room) => {
  socket = io()
  if (socket && room) {
    console.log(`start the game for both players called!`)
    socket.emit("start the game for both players", room)
  }
}

export const gameStartSuccessful = (cb) => {
  if (!socket) return true
  socket.on("game start successful", () => {
    return cb(null, "start the game")
  })
}

export const subscribeToRoomCharacters = (cb) => {
  if (!socket) return true
  socket.on(
    "characters chosen successful",
    (roomName, currentPlayerCharacter, opponentPlayerCharacter) => {
      console.log("Websocket event received!")
      return cb(null, {
        roomName,
        currentPlayerCharacter,
        opponentPlayerCharacter,
      })
    }
  )
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
