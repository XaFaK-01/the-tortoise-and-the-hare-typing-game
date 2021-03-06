import React from "react"
import styles from "./modal.module.css"

import Button from "../button"

// eslint-disable-next-line react/prop-types
const Modal = ({ showRules, setShowRules }) => {
  return (
    <>
      {showRules && (
        <div
          className="w-full h-full fixed z-40 left-0 top-0 "
          onClick={() => setShowRules(false)}
        ></div>
      )}
      <div
        className={`${styles.modal} bg-gray-700 bg-opacity-50`}
        style={{
          transform: showRules ? "translateY(0)" : "translateY(-100vh)",
          opacity: showRules ? "1" : "0",
        }}
      >
        <div className="mt-14 md:mt-0 px-4 py-5 ">
          <p className="text-3xl text-blue-900 md:text-3xl text-center">
            How to play?
          </p>
          <div className="my-8">
            <ul className="list-inside text-white">
              <li className="my-4">
                Type the newly generated word appearing on top as fast as you
                can.
              </li>
              <li className="my-4">
                On completely typing each word, your character will proceed a
                few steps.
              </li>
              <li className="mt-4">
                Reach the finish line before the opponent does to win.
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex items-center justify-center"
          onClick={() => setShowRules(false)}
        >
          <Button
            mainColor="bg-indigo-600"
            hoverColor="bg-indigo-400"
            text="Got it, start playing..."
            textSize="text-3xl"
            paddingX="px-3"
            paddingY="py-2"
          />
        </div>
      </div>
    </>
  )
}

export default Modal
