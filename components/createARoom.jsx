import React, { useState } from "react"
import Button from "./button"
import { initiateSocket } from "../functions/socketio"
import { useDispatch, useSelector } from "react-redux"
import { setRoomName } from "../actions/gameStateActions"

const CreateARoom = () => {
  const dispatch = useDispatch()
  const [nameOfRoom, setNameOfRoom] = useState("")
  const [roomCreateSuccess, setRoomCreateSuccess] = useState(false)

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerName } = currentPlayerInfo

  const createARoomHandler = (e) => {
    e.preventDefault()
    setRoomCreateSuccess(true)
    dispatch(setRoomName(nameOfRoom))
    initiateSocket({ nameOfRoom, currentPlayerName })
  }

  return (
    <div>
      {roomCreateSuccess ? (
        <p>Please ask your friend to join room: {nameOfRoom}</p>
      ) : (
        <p>
          <form onSubmit={createARoomHandler}>
            <input
              className="w-full font-bold px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-transparent"
              name="roomName"
              type="text"
              value={nameOfRoom}
              placeholder="Please type a room name to create"
              onChange={(e) => setNameOfRoom(e.target.value)}
            />
            <Button
              mainColor="bg-blue-600"
              hoverColor="bg-blue-400"
              text="Create room"
              type="submit"
            />
          </form>
        </p>
      )}
    </div>
  )
}

export default CreateARoom
