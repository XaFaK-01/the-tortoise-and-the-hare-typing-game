import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Button from "./button"
import { setCurrentPlayerName } from "../actions/currentPlayerActions"

const UserName = () => {
  const [userName, setUserName] = useState("")

  const dispatch = useDispatch()

  const nameSetHandler = (e) => {
    e.preventDefault()
    dispatch(setCurrentPlayerName(userName))
  }
  return (
    <div>
      <p className="text-3xl text-center font-extrabold mt-1 mb-4 ">
        Hello there!
      </p>
      <p className="text-2xl bg- text-center font-extrabold my-1">
        What is your name?
      </p>

      <div className="flex items-center justify-center my-3">
        <form onSubmit={nameSetHandler}>
          <input
            className="px-3 py-2 rounded-md font-extrabold text-center focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-black bg-opacity-30 text-white"
            name="nameOfUser"
            type="text"
            placeholder="Type your name here"
            required={true}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="block w-full">
            <Button
              mainColor="bg-green-600"
              hoverColor="bg-green-400"
              text="Set name"
              type="submit"
              textSize="text-3xl"
              paddingX="px-3"
              paddingY="py-2"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserName
