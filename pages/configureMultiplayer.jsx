import React, { useEffect, useState } from "react"
import Router from "next/router"
import { useDispatch, useSelector } from "react-redux"

import Layout from "../HOC/layout"
import Button from "../components/button"
import CreateARoom from "../components/createARoom"
import JoinARoom from "../components/joinARoom"

import CharacterChosen from "../components/characterChosen"
import ChooseCharacter from "../components/chooseCharacter"

import { userJoinedRoom } from "../functions/socketio"

import { setMySocketId, setOpponentSocketId } from "../actions/gameStateActions"
import { setOpponentPlayerName } from "../actions/opponentPlayerActions"

import UserName from "../components/userName"
import PageHeading from "../components/pageHeading"

const Home = () => {
  const dispatch = useDispatch()

  const [createRoom, setCreateRoom] = useState(false)
  const [joinRoom, setJoinRoom] = useState(false)
  const [userJoinedRoomSuccess, setUserJoinedRoomSuccess] = useState(false)

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerCharacter, currentPlayerName } = currentPlayerInfo

  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo)
  const { opponentPlayerName } = opponentPlayerInfo

  const gameState = useSelector((state) => state.gameState)
  const { gameType } = gameState

  useEffect(() => {
    if (!gameType) {
      Router.push("/")
    }
    userJoinedRoom((err, data) => {
      console.log("data: ", data)
      if (err) return
      setUserJoinedRoomSuccess(true)
      dispatch(setMySocketId(data.requiredSocketIds[0]))
      dispatch(setOpponentSocketId(data.requiredSocketIds[1]))
      dispatch(setOpponentPlayerName(data.opponentName))
    })
  })

  return (
    <Layout>
      <PageHeading />
      <div className="w-8/12  h-screen mx-auto ">
        <div className="mt-10 p-8 bg-gray-700 bg-opacity-50 rounded-xl">
          {currentPlayerName ? (
            <>
              <p className="text-2xl bg- text-center font-extrabold my-1">
                {`Hello ${currentPlayerName} !`}
              </p>
              {userJoinedRoomSuccess ? (
                <>
                  <p className="text-center text-xl my-3">
                    {userJoinedRoomSuccess &&
                      opponentPlayerName + " has joined game"}
                  </p>
                  {currentPlayerCharacter ? (
                    <CharacterChosen />
                  ) : (
                    <ChooseCharacter />
                  )}
                </>
              ) : joinRoom ? (
                <JoinARoom />
              ) : createRoom ? (
                <CreateARoom />
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
            </>
          ) : (
            <UserName />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Home
