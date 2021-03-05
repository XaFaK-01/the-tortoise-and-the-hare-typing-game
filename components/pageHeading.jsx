import React from "react"

const PageHeading = () => {
  return (
    <>
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
    </>
  )
}

export default PageHeading
