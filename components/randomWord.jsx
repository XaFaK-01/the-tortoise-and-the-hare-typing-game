import React, { useEffect, useState } from "react"
import useKeypress from "../hooks/useKeypress"
import { useDispatch, useSelector } from "react-redux"
import {
  addAPointToCurrentPlayer,
  generateNewWordOnSuccess,
} from "../actions/currentPlayerActions"

import { addAPointToOpponentPlayerMultiplayer } from "../actions/opponentPlayerActions"

import Button from "./button"

import {
  incrementTotalWordsTyped,
  incrementFluentWordsTyped,
  addWeakKeyStroke,
  startTypingCountdown,
  incrementCharactersTyped,
  toggleVirtualKeyboard,
} from "../actions/gameStateActions"

import {
  incrementOpponentPlayerPoints,
  incrementOpponentPlayerPointsSuccessful,
} from "../functions/socketio"

import Keyboard from "./keyboard"

const RandomWord = () => {
  const dispatch = useDispatch()
  const [correctKeyPressed, setCorrectKeyPressed] = useState(() => true)

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { randomlyGeneratedWord: theRandomWord } = currentPlayerInfo

  const gameState = useSelector((state) => state.gameState)
  const { mySocketId, opponentSocketId, roomName, showKeyboard } = gameState

  const [randomlyGeneratedWord, setRandomlyGeneratedWord] = useState(
    () => theRandomWord,
    [theRandomWord]
  )
  const [fluentWord, setFluentWord] = useState(true)
  const [commenceCountDown, setCommenceCountDown] = useState(() => false)

  useEffect(() => {
    incrementOpponentPlayerPointsSuccessful((err, data) => {
      if (err) return
      if (data.socketId === mySocketId)
        dispatch(addAPointToOpponentPlayerMultiplayer(data.points))
    })
  }, [])

  useEffect(() => {
    if (commenceCountDown) {
      dispatch(startTypingCountdown())
    }
  }, [commenceCountDown])

  useEffect(() => {
    setRandomlyGeneratedWord(theRandomWord)
  }, [theRandomWord])

  useEffect(() => {
    if (randomlyGeneratedWord.length === 0) {
      dispatch(addAPointToCurrentPlayer(5))
      dispatch(generateNewWordOnSuccess())
      dispatch(incrementTotalWordsTyped())

      //increase a point on socketio
      incrementOpponentPlayerPoints(roomName, opponentSocketId)

      if (fluentWord) {
        dispatch(incrementFluentWordsTyped())
      }

      if (!fluentWord) {
        setFluentWord(true)
      }
    }
  }, [randomlyGeneratedWord, dispatch])

  const correctKeyPressedHandler = () => {
    let trimmedWord = randomlyGeneratedWord.replace(
      randomlyGeneratedWord.charAt(0),
      ""
    )
    dispatch(incrementCharactersTyped())
    setRandomlyGeneratedWord(trimmedWord)
    setCorrectKeyPressed(true)
    setCommenceCountDown(true)
  }

  const incorrectKeyPressedHandler = () => {
    setCorrectKeyPressed(false)
    setFluentWord(false)
    dispatch(incrementCharactersTyped())
    dispatch(addWeakKeyStroke(randomlyGeneratedWord.charAt(0)))
  }

  useKeypress(
    randomlyGeneratedWord.charAt(0),
    () => correctKeyPressedHandler(),
    () => incorrectKeyPressedHandler()
  )

  const virtualKeyboardKeyReleaseHandler = (button) => {
    if (randomlyGeneratedWord.charAt(0) === button) correctKeyPressedHandler()
    else if (randomlyGeneratedWord.charAt(0) !== button)
      incorrectKeyPressedHandler()
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="inline-block p-3 bg-green-400 bg-opacity-20 rounded-lg">
          {correctKeyPressed ? (
            <p className="inline-block text-center text-green-800 font-semibold text-3xl">
              {randomlyGeneratedWord}
            </p>
          ) : (
            <div>
              <p className="inline-block text-center text-red-600 font-semibold text-3xl">
                {randomlyGeneratedWord.charAt(0)}
              </p>
              <p className="inline-block text-center text-green-900 font-semibold text-3xl">
                {randomlyGeneratedWord.substr(1)}
              </p>
            </div>
          )}
          <p className="text-center text-green-900 font-semibold text-xl">
            {randomlyGeneratedWord.length}
          </p>
        </div>
      </div>

      <div className="2xl:hidden w-max mx-auto">
        <Button
          mainColor="bg-green-600"
          hoverColor="bg-green-400"
          text={showKeyboard ? "Hide Keyboard" : "Show Keyboard"}
          type="submit"
          textSize="text-lg"
          paddingX="px-3"
          paddingY="py-2"
          function_callback={() => dispatch(toggleVirtualKeyboard())}
        />
      </div>
      {showKeyboard && (
        <div className="fixed z-50 bottom-0 right-0 w-full px-2 pb-14 bg-gray-100">
          <Keyboard
            onKeyRelease={(button) => virtualKeyboardKeyReleaseHandler(button)}
          />
        </div>
      )}
    </>
  )
}

export default RandomWord
