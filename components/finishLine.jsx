import React from "react"
import { useSelector } from "react-redux"

const FinishLine = () => {
  const gameState = useSelector((state) => state.gameState)
  const { showKeyboard } = gameState

  return (
    <div
      className="fixed -right-20 z-10 sm:right-0 inline-block px-11 py-2 bg-red-600 transform rotate-90"
      style={{ bottom: `${showKeyboard ? "35%" : "20%"}` }}
    >
      <p className="text-white font-bold ">FINISH LINE</p>
    </div>
  )
}

export default FinishLine
