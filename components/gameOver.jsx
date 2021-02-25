import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Button from "../components/button"
import TypingSummary from "./typingSummary"
import { resetFullGame } from "../actions/gameStateActions"
// eslint-disable-next-line react/prop-types
const GameOver = ({ race_end_point }) => {
  const dispatch = useDispatch()

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo)

  const { currentPlayerPosition, currentPlayerCharacter } = currentPlayerInfo
  const { opponentPlayerCharacter, opponentPlayerPosition } = opponentPlayerInfo

  const resetFullGameHandler = () => {
    dispatch(resetFullGame())
  }

  return (
    <div className="mt-1">
      <p
        className={`text-5xl capitalize text-center ${
          currentPlayerPosition >= race_end_point
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {opponentPlayerPosition >= race_end_point
          ? opponentPlayerCharacter + " Won!"
          : currentPlayerCharacter + " Won!"}
      </p>

      <p
        className={`text-3xl capitalize text-center mt-5 ${
          currentPlayerPosition >= race_end_point
            ? "text-blue-700"
            : "text-pink-700"
        }`}
      >
        {opponentPlayerPosition <= race_end_point
          ? "You won...!"
          : "You lost...!"}
      </p>

      <p className="text-4xl text-yellow-500 capitalize text-center mt-5">
        game over...
      </p>

      <div className="mt-3 w-2/12 mx-auto">
        <Button
          mainColor="bg-purple-700"
          hoverColor="bg-purple-500"
          text="Play Again"
          textSize="text-2xl"
          function_callback={() => resetFullGameHandler()}
        />
      </div>

      <TypingSummary />
    </div>
  )
}

export default GameOver
