import React from "react"

import { useSelector } from "react-redux"
import RandomWord from "../components/randomWord"
import Player from "../components/player"
import FinishLine from "./finishLine"

import { useSpring, animated } from "react-spring"

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

  const gameState = useSelector((state) => state.gameState)
  const { showKeyboard } = gameState

  const marginProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { delay: 500, duration: 500 },
  })

  return (
    <>
      <animated.div style={marginProps}>
        <RandomWord />
      </animated.div>
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
        <img
          className="fixed right-0 z-10 w-full"
          style={{ bottom: `${showKeyboard ? "30%" : "0%"}` }}
          src="images/grass-background.png"
          alt="grass-background"
        />
      </div>
    </>
  )
}

export default MainGame
