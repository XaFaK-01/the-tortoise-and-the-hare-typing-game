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
        <>
          <p className="mt-6">
            Please ask your friend to join room: {nameOfRoom}
          </p>
          <img
            className="w-12 sm:w-32 mx-auto mt-4"
            src="images/three_dots_loader.svg"
            alt="three_dots_loader.svg"
          />
        </>
      ) : (
        <div className="mt-3">
          <form onSubmit={createARoomHandler}>
            <input
              className="px-1 py-2 w-full lowercase rounded-md font-extrabold text-center focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-black bg-opacity-30 text-white"
              name="roomName"
              type="text"
              required={true}
              value={nameOfRoom}
              placeholder="Please type a room name to create"
              onChange={(e) => setNameOfRoom(e.target.value.toLowerCase())}
            />
            <Button
              mainColor="bg-blue-600"
              hoverColor="bg-blue-400"
              type="submit"
              text="Create room"
              textSize="text-3xl"
              paddingX="px-3"
              paddingY="py-2"
            />
          </form>
        </div>
      )}
    </div>
  )
}

export default CreateARoom
