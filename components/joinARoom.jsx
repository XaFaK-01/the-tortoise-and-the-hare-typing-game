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
import { setOpponentPlayerName } from "../actions/opponentPlayerActions"

import Router from "next/router"

const JoinARoom = () => {
  const dispatch = useDispatch()
  const [nameOfRoom, setNameOfRoom] = useState("")
  const [joinRoomRequest, setJoinRoomRequest] = useState(false)

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerCharacter, currentPlayerName } = currentPlayerInfo

  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo)
  const { opponentPlayerCharacter, opponentPlayerName } = opponentPlayerInfo

  const joinARoomHandler = (e) => {
    e.preventDefault()
    setJoinRoomRequest(true)
    dispatch(setRoomName(nameOfRoom))
    initiateSocket({ nameOfRoom, currentPlayerName })
  }

  useEffect(() => {
    socketIdsSuccessful((err, data) => {
      if (err) return
      dispatch(setMySocketId(data.opponentSocketId))
      dispatch(setOpponentSocketId(data.currentUserSocketId))
      dispatch(setOpponentPlayerName(data.opponentName))
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
          <p className="mt-6">
            {opponentPlayerName !== "Opponent"
              ? `Joined room ${nameOfRoom}, created by ${opponentPlayerName}`
              : "Joining room, please wait..."}
          </p>
          {currentPlayerCharacter && (
            <div>
              <p>Characters chosen!</p>
              <p>Your player character: {currentPlayerCharacter}</p>
              <p>Opponent player character: {opponentPlayerCharacter}</p>
              <p>Game will start any second now...!</p>
            </div>
          )}
          {currentPlayerCharacter ? (
            <img
              className="w-12 sm:w-32 mx-auto mt-4"
              src="images/three_dots_loader.svg"
              alt="three_dots_loader.svg"
            />
          ) : (
            <img
              className="w-28 sm:w-32 mx-auto mt-4"
              src="images/rings_loader.svg"
              alt="rings_loader.svg"
            />
          )}
        </div>
      ) : (
        <form onSubmit={joinARoomHandler}>
          <input
            className="px-1 py-2 w-full rounded-md font-extrabold text-center focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-black bg-opacity-30 text-white"
            name="roomName"
            type="text"
            value={nameOfRoom}
            required={true}
            placeholder="Please type a room name to join"
            onChange={(e) => setNameOfRoom(e.target.value)}
          />
          <Button
            mainColor="bg-blue-600"
            hoverColor="bg-blue-400"
            text="Join room"
            textSize="text-3xl"
            paddingX="px-3"
            paddingY="py-1"
          />
        </form>
      )}
    </div>
  )
}

export default JoinARoom
