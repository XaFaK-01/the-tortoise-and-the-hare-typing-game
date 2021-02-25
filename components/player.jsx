import React from "react"

// eslint-disable-next-line react/prop-types
const Player = ({ position, charImgSrc, charImgAlt }) => {
  return (
    <>
      <img
        className="mt-44 w-32 absolute z-20 transition-all duration-500 ease-in-out "
        src={charImgSrc}
        alt={charImgAlt}
        style={{ left: position + "%", top: "48vh" }}
      />
    </>
  )
}

export default Player
