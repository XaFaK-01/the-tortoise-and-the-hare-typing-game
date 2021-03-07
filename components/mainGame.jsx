import React from "react"

import { useSelector } from "react-redux"
import RandomWord from "../components/randomWord"
import Player from "../components/player"
import FinishLine from "./finishLine"

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
      <div className="">
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
        <FinishLine />
      </div>
    </>
  )
}

export default MainGame
