import React, { useEffect, useState } from "react"
import Button from "../components/button"
import { initiateSocket, roomJoinedSuccessful } from "../functions/socketio"
import { useDispatch } from "react-redux"
import { setRoomName, setMySocketId } from "../actions/gameStateActions"
const RoomNameForm = () => {
  const dispatch = useDispatch()
  const [nameOfRoom, setNameOfRoom] = useState("")
  const [roomCreateSuccess, setRoomCreateSuccess] = useState(false)

  const createARoomHandler = () => {
    dispatch(setRoomName(nameOfRoom))
    setRoomCreateSuccess(true)
    initiateSocket(nameOfRoom)
  }
  return (
    <div>
      {roomCreateSuccess ? (
        <p>Please ask your friend to join room: {nameOfRoom}</p>
      ) : (
        <p>
          <form>
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
              function_callback={createARoomHandler}
            />
          </form>
        </p>
      )}
    </div>
  )
}

export default RoomNameForm
