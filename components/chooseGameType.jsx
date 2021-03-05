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
        className="md:my-4 text-4xl md:text-4xl text-center mb-3 capitalize tracking-wider text-white font-extrabold"
        style={{
          fontFamily: "Gloria Hallelujah",
          WebkitTextStroke: "1px black",
          WebkitTextFillColor: "White",
        }}
      >
        Please select game type
      </p>
      <div className="flex items-center flex-col justify-center">
        <Button
          mainColor="bg-green-500"
          hoverColor="bg-green-700"
          text="Single Player"
          textSize="text-4xl"
          paddingX="px-2"
          paddingY="py-2"
          function_callback={() => dispatch(setGameType("singlePlayer"))}
        />
      
        <Link className="outline-none" href="/configureMultiplayer">
          <a className="w-full">
            <Button
              mainColor="bg-yellow-500"
              hoverColor="bg-yellow-700"
              text="Multiplayer"
              textSize="text-4xl"
              paddingX="px-2"
              paddingY="py-2"
              function_callback={() => dispatch(setGameType("multiplayer"))}
            />
          </a>
        </Link>

      </div>
    </>
  )
}

export default ChooseGameType
