import React from "react"
import { useSelector } from "react-redux"
import Link from "next/link"
import Button from "./button"

const CharacterChosen = () => {
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerCharacter } = currentPlayerInfo

  const gameState = useSelector((state) => state.gameState)
  const { gameType } = gameState

  const gameStartHandler = () => {
    if (gameType === "multiplayer") {
      // socketio function for starting game for both players
    }
  }

  return (
    <div className="cursor-pointer">
      <img
        className="w-72 mx-auto transition-colors "
        src={`images/${currentPlayerCharacter}.png`}
        alt="hare"
      />
      <p className="text-lg text-center capitalize text-white">
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
