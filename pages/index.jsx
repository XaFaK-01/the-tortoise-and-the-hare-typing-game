import React from "react"
import Layout from "../HOC/layout"
import { useSelector } from "react-redux"
import CharacterChosen from "../components/characterChosen"
import ChooseCharacter from "../components/chooseCharacter"
import ChooseGameType from "../components/chooseGameType"
import UserName from "../components/userName"
import PageHeading from "../components/pageHeading"
const Home = () => {
  const currentPlayerInfo = useSelector((state) => state.currentPlayerInfo)
  const { currentPlayerCharacter, currentPlayerName } = currentPlayerInfo

  const gameState = useSelector((state) => state.gameState)
  const { gameType } = gameState

  return (
    <Layout>
      <PageHeading />
      <div className="w-8/12 h-screen mx-auto ">
        <div className="mt-10 p-8 bg-gray-700 bg-opacity-50 rounded-xl">
          {gameType ? (
            gameType !== "multiplayer" && (
              <>
                {currentPlayerName ? (
                  <>
                    <p className="text-2xl bg- text-center font-extrabold my-1">
                      {`Hello ${currentPlayerName} !`}
                    </p>
                    {currentPlayerCharacter ? (
                      <CharacterChosen />
                    ) : (
                      <ChooseCharacter />
                    )}
                  </>
                ) : (
                  <UserName />
                )}
              </>
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
