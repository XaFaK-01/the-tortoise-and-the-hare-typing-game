import React, { useState, useEffect } from "react"
import Button from "./button"
import {
  initiateSocket,
  subscribeToRoomCharacters,
  gameStartSuccessful,
  socketIdsSuccessful,
} from "../functions/socketio"
import { useDispatch, useSelector } from "react-redux"
import {
  setRoomName,
  setMySocketId,
  setOpponentSocketId,
} from "../actions/gameStateActions"

import { selectCurrentPlayerCharacter } from "../actions/currentPlayerActions"
import { selectOpponentPlayerCharacter } from "../actions/opponentPlayerActions"
import { userJoinedRoom } from "../functions/socketio"

import Router from "next/router"

const JoinRoomForm = () => {
  const dispatch = useDispatch()
  const [nameOfRoom, setNameOfRoom] = useState("")
  const [joinRoomRequest, setJoinRoomRequest] = useState(false)

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerCharacter } = currentPlayerInfo

  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo)
  const { opponentPlayerCharacter } = opponentPlayerInfo

  const joinARoomHandler = () => {
    dispatch(setRoomName(nameOfRoom))
    // setRoomCreateSuccess(true)
    initiateSocket(nameOfRoom)
    setJoinRoomRequest(true)
  }

  useEffect(() => {
    userJoinedRoom((err, socketid) => {
      if (err) return

      dispatch(setMySocketId(socketid))
    })

    socketIdsSuccessful((err, data) => {
      if (err) return

      console.log("socketIdsSuccessful called")
      console.log("data: ", data)
      dispatch(setMySocketId(data.opponentSocketId))
      dispatch(setOpponentSocketId(data.currentUserSocketId))
    })

    subscribeToRoomCharacters((err, data) => {
      if (err) return
      dispatch(selectCurrentPlayerCharacter(data.opponentPlayerCharacter))
      dispatch(selectOpponentPlayerCharacter())
    })

    gameStartSuccessful((err, data) => {
      if (err) return
      if (data === "start the game") {
        Router.push("/game")
      }
    })
  })

  return (
    <div>
      {joinRoomRequest ? (
        <div>
          <p>Joining room, please wait...</p>
          {currentPlayerCharacter && (
            <div>
              <p>Characters chosen!</p>
              <p>Your player character: {currentPlayerCharacter}</p>
              <p>Opponent player character: {opponentPlayerCharacter}</p>
              <p>Game will start any minute now...!</p>
            </div>
          )}
        </div>
      ) : (
        <form>
          <input
            className="w-full font-bold px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-transparent"
            name="roomName"
            type="text"
            value={nameOfRoom}
            placeholder="Please type a room name to join"
            onChange={(e) => setNameOfRoom(e.target.value)}
          />
          <Button
            mainColor="bg-blue-600"
            hoverColor="bg-blue-400"
            text="Join room"
            function_callback={joinARoomHandler}
          />
        </form>
      )}
    </div>
  )
}

export default JoinRoomForm
