import React, { useState } from "react"
import Button from "./button"
import { initiateSocket } from "../functions/socketio"
import { useDispatch } from "react-redux"
import { setRoomName } from "../actions/gameStateActions"
const JoinRoomForm = () => {
  const dispatch = useDispatch()
  const [nameOfRoom, setNameOfRoom] = useState("")
  const [joinRoomRequest, setJoinRoomRequest] = useState(false)

  const joinARoomHandler = () => {
    // dispatch(setRoomName(nameOfRoom))
    // setRoomCreateSuccess(true)
    initiateSocket(nameOfRoom)
    setJoinRoomRequest(true)
  }
  return (
    <div>
      {joinRoomRequest ? (
        <p>Joining room, please wait...</p>
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
