import React from "react"

import { useDispatch } from "react-redux"
import { setGameType } from "../actions/gameStateActions"
import Link from "next/link"
import Button from "./button"
const ChooseGameType = () => {
  const dispatch = useDispatch()

  return (
    <>
      <p
        style={{
          WebkitTextStroke: "1px Green",
          WebkitTextFillColor: "White",
          fontFamily: "Hachi Maru Pop",
        }}
        className="text-4xl text-center mb-3 "
      >
        Please select a game type
      </p>
      <div className="flex items-center flex-col justify-center">
        <Button
          mainColor="bg-green-500"
          hoverColor="bg-green-700"
          text="Single Player"
          function_callback={() => dispatch(setGameType("singlePlayer"))}
        />

        <Link className="outline-none" href="/configureMultiplayer">
          <a>
            <Button
              mainColor="bg-yellow-500"
              hoverColor="bg-yellow-700"
              text="Multiplayer"
              function_callback={() => dispatch(setGameType("multiplayer"))}
            />
          </a>
        </Link>
      </div>
    </>
  )
}

export default ChooseGameType
