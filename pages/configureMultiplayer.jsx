import React, { useEffect, useState } from "react"
import Layout from "../HOC/layout"
import { useSelector } from "react-redux"
import Button from "../components/button"
import RoomNameForm from "../components/roomNameForm"
import JoinRoomForm from "../components/joinRoomForm"

import { userJoinedRoom, disconnectSocket } from "../functions/socketio"

import io from "socket.io-client"
let socket = io()
const Home = () => {
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerCharacter } = currentPlayerInfo

  const gameState = useSelector((state) => state.gameState)
  const { gameType, roomName } = gameState

  const [createRoom, setCreateRoom] = useState(false)
  const [joinRoom, setJoinRoom] = useState(false)

  const [userJoinedRoomSuccess, setUserJoinedRoomSuccess] = useState("")

  useEffect(() => {
    userJoinedRoom((err, data) => {
      if (err) return
      setUserJoinedRoomSuccess(data)
    })
  })

  return (
    <Layout>
      <div className="w-full h-screen mx-auto ">
        <p
          className="text-5xl my-4 text-center capitalize tracking-wider text-white font-extrabold"
          style={{
            fontFamily: "Gloria Hallelujah",
            WebkitTextStroke: "3px black",
            WebkitTextFillColor: "White",
          }}
        >
          Welcome to The Tortoise and the Hare game!
        </p>
        <p
          className="text-4xl my-4 text-center capitalize tracking-wider text-white font-extrabold"
          style={{
            fontFamily: "Gloria Hallelujah",
            WebkitTextStroke: "2px black",
            WebkitTextFillColor: "white",
          }}
        >
          Typing Edition
        </p>
        <div className="mt-10 p-8 bg-gray-700 bg-opacity-50 rounded-xl">
          {userJoinedRoomSuccess !== "" ? (
            <>
              <p>{userJoinedRoomSuccess}</p>
              <div className="w-64 mx-auto">
                <Button
                  mainColor="bg-green-600"
                  hoverColor="bg-green-400"
                  text="Start game!"
                  // function_callback={() => setCreateRoom(true)}
                />
              </div>
            </>
          ) : joinRoom ? (
            <JoinRoomForm />
          ) : createRoom ? (
            <RoomNameForm />
          ) : (
            <>
              <Button
                mainColor="bg-blue-600"
                hoverColor="bg-blue-400"
                text="Create a room"
                function_callback={() => setCreateRoom(true)}
              />

              <Button
                mainColor="bg-blue-600"
                hoverColor="bg-blue-400"
                text="Join a room"
                function_callback={() => setJoinRoom(true)}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Home
