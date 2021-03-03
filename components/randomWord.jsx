import React, { useEffect, useState } from "react"
import useKeypress from "../hooks/useKeypress"
import { useDispatch, useSelector } from "react-redux"
import {
  addAPointToCurrentPlayer,
  generateNewWordOnSuccess,
} from "../actions/currentPlayerActions"

import { addAPointToOpponentPlayerMultiplayer } from "../actions/opponentPlayerActions"

import {
  incrementTotalWordsTyped,
  incrementFluentWordsTyped,
  addWeakKeyStroke,
  startTypingCountdown,
  incrementCharactersTyped,
} from "../actions/gameStateActions"

import {
  incrementOpponentPlayerPoints,
  incrementOpponentPlayerPointsSuccessful,
} from "../functions/socketio"

const RandomWord = () => {
  const dispatch = useDispatch()
  const [correctKeyPressed, setCorrectKeyPressed] = useState(() => true)

  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { randomlyGeneratedWord: theRandomWord } = currentPlayerInfo

  const gameState = useSelector((state) => state.gameState)
  const { mySocketId, opponentSocketId } = gameState

  const [randomlyGeneratedWord, setRandomlyGeneratedWord] = useState(
    () => theRandomWord,
    [theRandomWord]
  )
  const [fluentWord, setFluentWord] = useState(true)
  const [commenceCountDown, setCommenceCountDown] = useState(() => false)

  useEffect(() => {
    incrementOpponentPlayerPointsSuccessful((err, data) => {
      console.log("incrementOpponentPlayerPointsSuccessful called")
      if (err) return
      dispatch(addAPointToOpponentPlayerMultiplayer(data))
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
      dispatch(addAPointToCurrentPlayer(10))
      dispatch(generateNewWordOnSuccess())
      dispatch(incrementTotalWordsTyped())

      //increase a point on socketio
      incrementOpponentPlayerPoints(opponentSocketId)

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
  return (
    <div className="flex justify-center">
      <div className="inline-block p-3 bg-green-500 bg-opacity-20 rounded-lg">
        {correctKeyPressed ? (
          <p className="inline-block text-center text-green-800 font-semibold text-3xl">
            {randomlyGeneratedWord}
          </p>
        ) : (
          <div>
            <p className="inline-block text-center text-red-600 font-semibold text-3xl">
              {randomlyGeneratedWord.charAt(0)}
            </p>
            <p className="inline-block text-center font-semibold text-3xl">
              {randomlyGeneratedWord.substr(1)}
            </p>
          </div>
        )}
        <p className="text-center text-green-900 font-semibold text-xl">
          {randomlyGeneratedWord.length}
        </p>
      </div>
    </div>
  )
}

export default RandomWord
