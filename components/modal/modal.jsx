import React from "react"
import styles from "./modal.module.css"
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
        <div className="mt-44 md:mt-0 px-4 py-5 ">
          <div className="flex justify-between items-center ">
            <p
              className="text-9xl md:text-3xl text-center md:text-left"
              style={{ color: "hsl(229, 25%, 31%)" }}
            >
              How to play?
            </p>
            <button
              className="flex justify-center md:justify-end md:items-center"
              onClick={() => setShowRules(false)}
            >
              <img
                className="w-6"
                src="/images/icon-close.svg"
                alt="icon-close"
              />
            </button>
          </div>
          <div className="my-8">
            <ul className="list-inside text-white">
              <li>
                Type the newly generated word appearing on top as fast as you
                can.
              </li>
              <li>
                On completely typing each word your character will proceed a few
                steps.
              </li>
              <li>Reach the finish line before the opponent does.</li>
            </ul>
          </div>
        </div>

        {/* <img
          className="mx-auto p-6 order-2 md:order-3"
          src="/images/image-rules.svg"
          alt="image-rules"
        /> */}
      </div>
    </>
  )
}

export default Modal
