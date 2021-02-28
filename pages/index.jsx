import React from "react"
import Layout from "../HOC/layout"
import { useSelector } from "react-redux"
import CharacterChosen from "../components/characterChosen"
import ChooseCharacter from "../components/chooseCharacter"
import ChooseGameType from "../components/chooseGameType"
const Home = () => {
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerCharacter } = currentPlayerInfo

  const gameState = useSelector((state) => state.gameState)
  const { gameType } = gameState

  return (
    <Layout>
      <div className="w-full h-screen mx-auto ">
        <p
          className="text-5xl my-4 text-center capitalize tracking-wider text-white font-extrabold"
          style={{
            fontFamily: "Gloria Hallelujah",
            WebkitTextStroke: "3px black",
            WebkitTextFillColor: "White",
          }}
        >
          Welcome to The Tortoise and the Hare game!
        </p>
        <p
          className="text-4xl my-4 text-center capitalize tracking-wider text-white font-extrabold"
          style={{
            fontFamily: "Gloria Hallelujah",
            WebkitTextStroke: "2px black",
            WebkitTextFillColor: "white",
          }}
        >
          Typing Edition
        </p>
        <div className="mt-10 p-8 bg-gray-700 bg-opacity-50 rounded-xl">
          {gameType ? (
            currentPlayerCharacter ? (
              <CharacterChosen />
            ) : (
              <ChooseCharacter />
            )
          ) : (
            <ChooseGameType />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Home
