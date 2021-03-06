import React from "react"

import { useSelector } from "react-redux"
import RandomWord from "../components/randomWord"
import Player from "../components/player"

const MainGame = () => {
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo)
  const gameState = useSelector((state) => state.gameState)

  const {
    currentPlayerPosition,
    currentPlayerCharacter,
    currentPlayerName,
  } = currentPlayerInfo
  const {
    opponentPlayerCharacter,
    opponentPlayerPosition,
    opponentPlayerName,
  } = opponentPlayerInfo

  const { showKeyboard } = gameState

  return (
    <>
      <RandomWord />
      <div className="w-full h-full bg-grass-background bg-cover bg-no-repeat">
        <Player
          playerName={opponentPlayerName}
          position={opponentPlayerPosition}
          charImgSrc={`images/${opponentPlayerCharacter}.png`}
          charImgAlt={opponentPlayerCharacter}
        />
        <Player
          isCurrentPlayer={true}
          playerName={currentPlayerName}
          position={currentPlayerPosition}
          charImgSrc={`images/${currentPlayerCharacter}.png`}
          charImgAlt={currentPlayerCharacter}
        />

        <img
          className={`${showKeyboard && "hidden"} fixed w-64 z-0 `}
          style={{ left: "82%", top: "56%" }}
          src="/images/finish_line.png"
          alt="finish_line"
        />

        <img
          className={`${!showKeyboard && "hidden"} fixed z-0`}
          style={{ width: "20%", left: "75%", top: "56%" }}
          src="/images/finish_line.png"
          alt="finish_line"
        />
      </div>
    </>
  )
}

export default MainGame
