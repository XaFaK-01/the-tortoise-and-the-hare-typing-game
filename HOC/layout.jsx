import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import PageTitle from "../components/pageTitle"

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [currentPageTitle, setCurrentPageTitle] = useState("")
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo)
  const gameState = useSelector((state) => state.gameState)

  const { currentPlayerCharacter, currentPlayerName } = currentPlayerInfo
  const { opponentPlayerName, opponentPlayerCharacter } = opponentPlayerInfo
  const { gameType, roomName } = gameState

  useEffect(() => {
    if (!gameType) setCurrentPageTitle("Welcome! Please choose game type")

    // page title conditions for singlePlauer Mode
    if (gameType === "singlePlayer") {
      if (!currentPlayerName)
        setCurrentPageTitle("Hello there! What is your name?")
      else if (!currentPlayerCharacter)
        setCurrentPageTitle("Choose a game character")
      else if (currentPlayerCharacter)
        setCurrentPageTitle("Ready to play when you are...")
    }

    // page title conditions for multiPlayer Mode
    if (gameType === "multiplayer") {
      if (!currentPlayerName)
        setCurrentPageTitle("Hello there! What is your name?")
      else if (!roomName) setCurrentPageTitle("Create or join a room")
      else if (
        roomName &&
        opponentPlayerName === "Opponent" &&
        opponentPlayerCharacter !== ""
      )
        setCurrentPageTitle("Game will start any minute now...")
      else if (roomName && opponentPlayerName === "Opponent")
        setCurrentPageTitle("Please wait while your friend join...")
      else if (opponentPlayerName !== "Opponent" && !currentPlayerCharacter)
        setCurrentPageTitle("Game joined! Choose characters")
      else if (currentPlayerCharacter)
        setCurrentPageTitle("Ready to play when you are...")
    }
  })

  return (
    <div className="px-4 pt-7 pb-1 sm:px-7 sm:py-6  bg-forest-background-2 bg-no-repeat bg-cover text-white ">
      <PageTitle title={currentPageTitle} />

      {children}
    </div>
  )
}

export default Layout
