/* eslint-disable react/prop-types */
import React from "react"
import { useSelector } from "react-redux"

// eslint-disable-next-line react/prop-types
const Player = ({
  position,
  charImgSrc,
  charImgAlt,
  playerName,
  isCurrentPlayer,
}) => {
  const gameState = useSelector((state) => state.gameState)
  const { showKeyboard } = gameState

  return (
    <>
      <div
        className="absolute z-20"
        style={{
          left: position + "%",
          top: `${showKeyboard ? "26vh" : "48vh"}`,
        }}
      >
        <div
          className={`w-min mx-auto mt-28 px-3 py-2 rounded-lg text-xs sm:text-base ${
            isCurrentPlayer ? "bg-green-600 text-white " : "bg-white"
          }`}
        >
          <p className="">{playerName}</p>
        </div>
        <img
          className="mt-14 w-16 sm:w-32 "
          src={charImgSrc}
          alt={charImgAlt}
        />
      </div>
    </>
  )
}

export default Player
