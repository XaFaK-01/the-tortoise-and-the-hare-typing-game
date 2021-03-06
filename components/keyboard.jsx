import React from "react"
import Keyboard from "react-simple-keyboard"
import "react-simple-keyboard/build/css/index.css"

// eslint-disable-next-line react/prop-types
export default function App({ onKeyRelease }) {
  return (
    <Keyboard
      onKeyReleased={onKeyRelease}
      theme="hg-theme-default hg-theme-ios"
      layoutName="default"
      mergeDisplay={true}
      layout={{
        default: [
          "q w e r t y u i o p",
          "a s d f g h j k l",
          "{shift} z x c v b n m {shift}",
          // "",
        ],
        shift: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "{shift} Z X C V B N M {backspace}",
          "{numbers} {space} {ent}",
        ],
        numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"],
      }}
      display={{
        "{numbers}": "123",
        "{ent}": "return",
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "⌫",
        "{capslock}": "caps lock ⇪",
        "{shift}": "⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{abc}": "ABC",
      }}
    />
  )
}

// const rootElement = document.getElementById("root")
// ReactDOM.render(<App />, rootElement)
