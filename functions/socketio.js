import io from "socket.io-client"
let socket

export const initiateSocket = (room) => {
  socket = io()
  console.log(`Connecting socket...`)
  if (socket && room) socket.emit("join", room)
}

export const userJoinedRoom = (cb) => {
  if (!socket) return true
  socket.on("user joined", (socketid) => {
    console.log("Websocket event received for user joining!")
    return cb(null, socketid)
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

export const sendSocketIdsToOpponent = (
  room,
  currentUserSocketId,
  opponentSocketId
) => {
  socket = io()

  if (socket && room && currentUserSocketId && opponentSocketId) {
    socket.emit("set socketids", {
      room,
      currentUserSocketId,
      opponentSocketId,
    })
  }
}

export const socketIdsSuccessful = (cb) => {
  if (!socket) return true
  socket.on("set socketids successful", (data) => {
    return cb(null, data)
  })
}

export const startTheGameForBothPlayers = (room) => {
  socket = io()
  if (socket && room) {
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
      return cb(null, {
        roomName,
        currentPlayerCharacter,
        opponentPlayerCharacter,
      })
    }
  )
}

export const incrementOpponentPlayerPoints = (roomId, socketId) => {
  socket = io()
  if (socket && socketId) {
    console.log(`increment opponent player points called!`)
    socket.emit("increment opponent player points", { roomId, socketId })
  }
}

export const incrementOpponentPlayerPointsSuccessful = (cb) => {
  if (!socket) return true
  socket.on("increment opponent player points successful", (data) => {
    return cb(null, data)
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
