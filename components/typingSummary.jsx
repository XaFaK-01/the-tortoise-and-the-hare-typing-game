/* eslint-disable quotes */
// eslint-disable-next-line quotes
import React from "react"
import { useSelector } from "react-redux"

const TypingSummary = () => {
  const gameState = useSelector((state) => state.gameState)

  const {
    totalWordsTyped,
    fluentWordsTyped,
    weakKeyStrokes,
    typingCountdown,
    charactersTyped,
  } = gameState

  const distribution = weakKeyStrokes.reduce(
    (acum, cur) => Object.assign(acum, { [cur]: (acum[cur] || 0) + 1 }),
    {}
  )

  let weakKeyStrokesCountedObject = JSON.parse(
    JSON.stringify(distribution, null, 2)
  )

  let WPM = Math.round(charactersTyped / 5 / (typingCountdown / 100))

  return (
    <div className=" py-1 pb-3 px-2 sm:px-10 relative max-h-72 overflow-y-auto overflow-x-hidden rounded-xl sm:w-max mx-auto bg-gray-700 bg-opacity-40">
      <h1 className="text-4xl text-center my-3">Typing Report</h1>
      <p className=" text-center">
        Total words typed: <strong>{totalWordsTyped}</strong>
      </p>
      <p className=" text-center">
        Fluent words typed: <strong>{fluentWordsTyped}</strong>
      </p>

      <p className="text-center">
        Time taken to type <strong>{totalWordsTyped}</strong> words:{" "}
        <strong>{typingCountdown} seconds</strong>
      </p>

      <p className=" text-center ">Your net WPM is: {WPM}</p>

      {Object.keys(weakKeyStrokesCountedObject).length === 0 &&
      weakKeyStrokesCountedObject.constructor === Object ? (
        <>
          <p className="text-center mt-3">No weak keystrokes,</p>
          <p className="text-center ">Good job!!!</p>
        </>
      ) : (
        <>
          <p className="text-xl text-center mt-2">Weak key strokes</p>
          <div className="grid grid-cols-2 mx-auto mt-2 ">
            <p className="text-center ">Key Stroke</p>
            <p className="text-center ">Missed Times</p>
          </div>
          {Object.entries(weakKeyStrokesCountedObject).map(([key, value]) => (
            <div className="grid grid-cols-2 mx-auto items-center" key={key}>
              <div className="bg-gradient-to-b from-white to-gray-300 shadow-inner w-min px-2 py-1 border-b-2 border-white rounded-lg mx-auto my-1 inline-block">
                <p className="capitalize">{key}</p>
              </div>
              <p className="text-center inline-block">x{value}</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default TypingSummary
