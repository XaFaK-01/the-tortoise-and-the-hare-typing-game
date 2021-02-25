import React from "react"

import { useSelector } from "react-redux"
import RandomWord from "../components/randomWord"
import Player from "../components/player"

const MainGame = () => {
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo)

  const { currentPlayerPosition, currentPlayerCharacter } = currentPlayerInfo
  const { opponentPlayerCharacter, opponentPlayerPosition } = opponentPlayerInfo

  return (
    <>
      <RandomWord />
      <Player
        position={opponentPlayerPosition}
        charImgSrc={`images/${opponentPlayerCharacter}.png`}
        charImgAlt={opponentPlayerCharacter}
      />
      <Player
        position={currentPlayerPosition}
        charImgSrc={`images/${currentPlayerCharacter}.png`}
        charImgAlt={currentPlayerCharacter}
      />
      <img
        className="fixed w-64 z-0 "
        style={{ left: "82%", top: "53%" }}
        src="/images/finish_line.png"
        alt="finish_line"
      />
    </>
  )
}

export default MainGame
