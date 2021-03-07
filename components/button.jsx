/* eslint-disable react/prop-types */
import React from "react"
const Button = ({
  mainColor,
  hoverColor,
  text,
  function_callback,
  textSize,
  type,
  paddingX,
  paddingY,
}) => {
  return (
    <button
      type={type && type}
      onClick={function_callback && function_callback}
      className={`${mainColor} hover:${hoverColor} rounded-2xl ${
        paddingX ? paddingX : "px-5"
      } ${paddingY ? paddingY : "py-3"} border-4 cursor-pointer my-3 w-full`}
    >
      <p
        style={{ fontFamily: "Schoolbell" }}
        className={`${
          textSize ? textSize : "text-4xl"
        } tracking-wider text-white text-center`}
      >
        {text}
      </p>
    </button>
  )
}

export default Button
