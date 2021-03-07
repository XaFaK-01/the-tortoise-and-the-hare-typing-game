import React from "react"
import { useSelector } from "react-redux"

const FinishLine = () => {
  const gameState = useSelector((state) => state.gameState)
  const { showKeyboard } = gameState

  return (
    <div
      className="fixed -right-8 z-20 sm:right-0 inline-block px-3 w-40 sm:w-auto sm:px-11 py-2 bg-red-600 transform rotate-90"
      style={{ bottom: `${showKeyboard ? "35%" : "20%"}` }}
    >
      <p className="text-white font-bold text-xs sm:text-base text-center">
        FINISH LINE
      </p>
    </div>
  )
}

export default FinishLine
