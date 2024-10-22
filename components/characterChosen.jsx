import React from "react"
import { useSelector } from "react-redux"
import Link from "next/link"
import Button from "./button"

import { startTheGameForBothPlayers } from "../functions/socketio"

const CharacterChosen = () => {
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerCharacter } = currentPlayerInfo

  const gameState = useSelector((state) => state.gameState)
  const { gameType, roomName } = gameState

  const gameStartHandler = () => {
    if (gameType === "multiplayer") {
      startTheGameForBothPlayers(roomName)
    }
  }

  return (
    <div className="cursor-pointer mt-9">
      <img
        className="w-40 sm:w-72 mx-auto transition-colors "
        src={`images/${currentPlayerCharacter}.png`}
        alt="hare"
      />
      <p className="text-lg mt-4 sm:text-2xl text-center capitalize text-white">
        {currentPlayerCharacter} <strong> Selected!</strong>
      </p>
      {gameType && (
        <div className="w-56 mx-auto my-4">
          <Link className="outline-none" href="/game">
            <a>
              <Button
                mainColor="bg-blue-600"
                hoverColor="bg-blue-400"
                text="Start Playing!"
                textSize="text-3xl"
                paddingX="px-4"
                paddingY="py-3"
                function_callback={gameStartHandler}
              />
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CharacterChosen
