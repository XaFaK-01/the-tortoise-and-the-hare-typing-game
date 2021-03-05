import React from "react"

const PageHeading = () => {
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl ">
      <p
        className="md:my-4 text-center capitalize tracking-wider text-white font-extrabold"
        style={{
          fontFamily: "Gloria Hallelujah",
          WebkitTextStroke: "1px black",
          WebkitTextFillColor: "White",
        }}
      >
        Welcome to The Tortoise and the Hare game!
      </p>
      <p
        className="mt-4 md:my-4 text-center capitalize italic tracking-wider text-white font-extrabold"
        style={{
          fontFamily: "Gloria Hallelujah",
          WebkitTextStroke: "1px black",
          WebkitTextFillColor: "white",
        }}
      >
        {`<Typing Edition/>`}
      </p>
    </div>
  )
}

export default PageHeading
