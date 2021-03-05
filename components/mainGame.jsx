import React from "react"

import { useSelector } from "react-redux"
import RandomWord from "../components/randomWord"
import Player from "../components/player"

const MainGame = () => {
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo)

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

  return (
    <>
      <RandomWord />
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
        className="sm:hidden fixed w-20 z-0 "
        style={{ left: "75%", top: "76%" }}
        src="/images/finish_line.png"
        alt="finish_line"
      />
      <img
        className="hidden sm:block fixed w-64 z-0 "
        style={{ left: "82%", top: "53%" }}
        src="/images/finish_line.png"
        alt="finish_line"
      />
    </>
  )
}

export default MainGame
