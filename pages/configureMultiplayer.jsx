import React, { useEffect, useState } from "react"
import Layout from "../HOC/layout"
import { useSelector } from "react-redux"
import Button from "../components/button"
import RoomNameForm from "../components/roomNameForm"
import JoinRoomForm from "../components/joinRoomForm"

import CharacterChosen from "../components/characterChosen"
import ChooseCharacter from "../components/chooseCharacter"
import Router, { useRouter } from "next/router"

import { userJoinedRoom, disconnectSocket } from "../functions/socketio"

import { useDispatch } from "react-redux"
import { setMySocketId, setOpponentSocketId } from "../actions/gameStateActions"

import io from "socket.io-client"
let socket = io()
const Home = () => {
  const dispatch = useDispatch()
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerCharacter } = currentPlayerInfo

  const gameState = useSelector((state) => state.gameState)
  const { gameType, roomName } = gameState

  const [createRoom, setCreateRoom] = useState(false)
  const [joinRoom, setJoinRoom] = useState(false)

  const [userJoinedRoomSuccess, setUserJoinedRoomSuccess] = useState("")

  useEffect(() => {
    userJoinedRoom((err, socketids) => {
      if (err) return
      setUserJoinedRoomSuccess("A user have joined the room")
      dispatch(setMySocketId(socketids[0]))
      dispatch(setOpponentSocketId(socketids[1]))
    })
  })

  useEffect(() => {
    if (!gameType) {
      Router.push("/")
    }

    // if (
    //   opponentPlayerPosition >= race_end_point ||
    //   currentPlayerPosition >= race_end_point
    // ) {
    //   dispatch(endOpponentRun())
    //   dispatch(endTypingCountdown())
    // }
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
          <p>{userJoinedRoomSuccess}</p>
          {userJoinedRoomSuccess !== "" ? (
            <>
              {currentPlayerCharacter ? (
                <CharacterChosen />
              ) : (
                <ChooseCharacter />
              )}
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
