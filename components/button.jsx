import React from "react"
// eslint-disable-next-line react/prop-types
const Button = ({
  mainColor,
  hoverColor,
  text,
  function_callback,
  textSize,
}) => {
  return (
    <div
      onClick={function_callback && function_callback}
      className={`${mainColor} hover:${hoverColor} rounded-2xl px-5 py-3 border-4 cursor-pointer my-3 transition-all duration-500 ease-in-out`}
    >
      <p
        style={{ fontFamily: "Schoolbell" }}
        className={`${
          textSize ? textSize : "text-4xl"
        } tracking-wider text-white text-center`}
      >
        {text}
      </p>
    </div>
  )
}

export default Button
