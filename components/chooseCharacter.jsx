import React from "react"
import { selectCurrentPlayerCharacter } from "../actions/currentPlayerActions"
import { selectOpponentPlayerCharacter } from "../actions/opponentPlayerActions"
import { setOpponentDifficultyLevel } from "../actions/gameStateActions"

import { useDispatch, useSelector } from "react-redux"

import {
  charactersChosen,
  sendSocketIdsToOpponent,
} from "../functions/socketio"

const ChooseCharacter = () => {
  const gameState = useSelector((state) => state.gameState)
  const { roomName, mySocketId, opponentSocketId } = gameState

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerCharacter } = currentPlayerInfo

  const opponentPlayerInfo = useSelector((state) => state.opponentPlayerInfo)
  const { opponentPlayerCharacter } = opponentPlayerInfo

  const dispatch = useDispatch()

  const characterSelectHandler = (character) => {
    dispatch(selectCurrentPlayerCharacter(character))
    dispatch(selectOpponentPlayerCharacter())

    let opponentCharacter
    if (character === "hare") opponentCharacter = "tortoise"
    if (character === "tortoise") opponentCharacter = "hare"

    charactersChosen(roomName, character, opponentCharacter)
    // code for sending socketids
    sendSocketIdsToOpponent(roomName, mySocketId, opponentSocketId)
  }

  const levelDifficultyHandler = (value) => {
    dispatch(setOpponentDifficultyLevel(value))
  }
  const levels = [3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <>
      <p className="text-3xl text-center mb-6">Please select a character:</p>
      <div className="mt-14 w-3/4 mx-auto flex justify-around">
        <div
          onClick={() => characterSelectHandler("hare")}
          className="cursor-pointer"
        >
          <img
            className="w-40 hover:w-52 transition-all duration-700 ease-in-out "
            src="images/hare.png"
            alt="hare"
          />
          <p className="text-lg text-center text-white">Hare</p>
        </div>
        <div
          onClick={() => characterSelectHandler("tortoise")}
          className="cursor-pointer"
        >
          <img
            className="w-40 hover:w-52 transition-all duration-700 ease-in-out  "
            src="images/tortoise.png"
            alt="tortoise"
          />
          <p className="text-lg text-center text-white">Tortoise</p>
        </div>
      </div>

      <div className="flex justify-center items-center my-4">
        <label className="text-lg px-2" htmlFor="difficulty">
          Select difficulty
        </label>
        <select
          style={{ fontFamily: "Prosto One" }}
          className="bg-transparent text-xl font-extrabold mt-1"
          onChange={(e) => levelDifficultyHandler(e.target.value)}
          id="difficulty"
          name="difficulty"
          form="carform"
        >
          {levels.map((level) => (
            <option
              key={level}
              className="bg-black bg-opacity-40"
              value={level}
            >
              {level}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default ChooseCharacter
